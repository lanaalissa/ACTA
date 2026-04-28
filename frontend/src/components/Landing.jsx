import { FileText, MessageCircle, ReceiptText } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <section className="min-h-screen bg-paper">
      <div className="mx-auto grid min-h-screen max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-coral">Hackathon MVP</p>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-ink md:text-7xl">
            A.C.A.T
          </h1>
          <p className="mt-3 text-2xl font-semibold text-navy">Automatic Contract AI Tool</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            A guided chat assistant that helps freelancers and small businesses collect project details, draft an agreement, create a milestone plan, issue an invoice, and generate a receipt after payment is marked as paid.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-ink px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-navy focus:outline-none focus:ring-4 focus:ring-mint/30"
          >
            <MessageCircle size={20} />
            Start Demo
          </button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <FileText className="mb-4 text-mint" size={32} />
            <h2 className="text-xl font-bold text-ink">Contract draft</h2>
            <p className="mt-2 text-slate-600">A clear agreement summary with scope, deliverables, timeline, and terms.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <ReceiptText className="mb-4 text-coral" size={32} />
            <h2 className="text-xl font-bold text-ink">Invoice and receipt</h2>
            <p className="mt-2 text-slate-600">A payment request first, then proof of payment only after the project is marked paid.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
