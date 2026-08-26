import { createClient } from "@/lib/supabase/server";
import {
  STARTER_PACK_MAX_DOWNLOADS,
} from "@/lib/starter-pack";

export async function POST() {
  const requestId = Math.random().toString(36).slice(2, 9);

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json(
        { error: "You must be signed in to download the Starter Pack." },
        { status: 401 },
      );
    }

    const { data: record, error: fetchError } = await supabase
      .from("starter_pack_downloads")
      .select("id, download_count")
      .eq("user_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(`[${requestId}] DB fetch error:`, fetchError);
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    if (record && record.download_count >= STARTER_PACK_MAX_DOWNLOADS) {
      return Response.json(
        { error: "You've already claimed your free starter pack." },
        { status: 403 },
      );
    }

    const now = new Date().toISOString();

    if (!record) {
      const { error: insertError } = await supabase
        .from("starter_pack_downloads")
        .insert({
          user_id: user.id,
          download_count: 1,
          last_download_at: now,
        });

      if (insertError) {
        console.error(`[${requestId}] Insert error:`, insertError);
        return Response.json(
          { error: "Something went wrong. Please try again." },
          { status: 500 },
        );
      }
    } else {
      const { error: updateError } = await supabase
        .from("starter_pack_downloads")
        .update({
          download_count: record.download_count + 1,
          last_download_at: now,
        })
        .eq("id", record.id);

      if (updateError) {
        console.error(`[${requestId}] Update error:`, updateError);
        return Response.json(
          { error: "Something went wrong. Please try again." },
          { status: 500 },
        );
      }
    }

    return Response.json({
      success: true,
      downloadsRemaining: record
        ? STARTER_PACK_MAX_DOWNLOADS - record.download_count - 1
        : STARTER_PACK_MAX_DOWNLOADS - 1,
    });
  } catch (err: unknown) {
    console.error(`[${requestId}] Exception:`, err);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
