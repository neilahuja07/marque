import { createClient } from "@/lib/supabase/server";

export async function POST() {
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

    const { data: remaining, error: claimError } = await supabase.rpc(
      "claim_starter_pack_download",
      { p_user_id: user.id },
    );

    if (claimError) {
      console.error("Starter pack claim error:", claimError);
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    if (remaining <= 0) {
      return Response.json(
        { error: "You've already claimed your free starter pack." },
        { status: 403 },
      );
    }

    return Response.json({
      success: true,
      downloadsRemaining: remaining,
    });
  } catch (err: unknown) {
    console.error("Starter pack download exception:", err);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
