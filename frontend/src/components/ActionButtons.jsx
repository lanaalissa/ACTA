import { CheckCircle2, Download, FileText, Loader2, ReceiptText } from 'lucide-react';

export default function ActionButtons({
  isPaid,
  isLoading,
  onGenerateContract,
  onGenerateInvoice,
  onMarkPaid,
  onGenerateReceipt
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <button
        onClick={onGenerateContract}
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 font-bold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
        Download Contract
      </button>
      <button
        onClick={onGenerateInvoice}
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-navy px-4 py-3 font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
        Download Invoice
      </button>
      <button
        onClick={onMarkPaid}
        disabled={isPaid}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-mint px-4 py-3 font-bold text-navy transition hover:bg-mint hover:text-white disabled:cursor-not-allowed disabled:bg-mint disabled:text-white"
      >
        <CheckCircle2 size={18} />
        {isPaid ? 'Paid' : 'Mark as Paid'}
      </button>
      <button
        onClick={onGenerateReceipt}
        disabled={!isPaid || isLoading}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-coral px-4 py-3 font-bold text-white transition hover:bg-[#dc5d48] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <ReceiptText size={18} />}
        Download Receipt
      </button>
    </div>
  );
}
