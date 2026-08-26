"use client";

import { Modal } from "@/components/ui/modal";
import type { Order } from "@/lib/dummy-data";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  sellerName?: string;
}

export function InvoiceModal({ isOpen, onClose, order, sellerName = "Scholar Stack Education Ltd" }: InvoiceModalProps) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice" maxWidth="max-w-[520px]">
      <div className="rounded-[8px] border border-ink/10 bg-parchment/30 p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-[18px] font-semibold text-ink">Scholar Stack</p>
            <p className="mt-1 text-[12px] text-slate">{sellerName}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[13px] font-medium text-ink">{order.id}</p>
            <p className="mt-0.5 text-[12px] text-slate">
              {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-ink/10" />

        {/* Items */}
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[13px]">
              <span className="text-ink line-clamp-1 flex-1">{item.title}</span>
              <span className="ml-4 shrink-0 font-medium text-ink">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-ink/10" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-slate">Total</span>
          <span className="font-display text-[18px] font-semibold text-ink">${order.total.toFixed(2)}</span>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center justify-between text-[12px]">
          <span className="text-slate">Payment status</span>
          <span className={`font-medium capitalize ${
            order.status === "completed" ? "text-teal-dark" : order.status === "refunded" ? "text-red-600" : "text-brass"
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="btn-outline rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
