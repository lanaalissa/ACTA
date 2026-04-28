import { useEffect, useState } from 'react';
import ActionButtons from './ActionButtons.jsx';
import { api, downloadHtmlFile } from '../utils/api.js';

export default function DocumentPreview({ projectData, onReset }) {
  const [bundle, setBundle] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function generatePreview() {
      setIsLoading(true);
      setError('');
      try {
        const data = await api.generate({ projectData, isPaid });
        setBundle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    generatePreview();
  }, [projectData, isPaid]);

  async function handleDownload(type) {
    setIsLoading(true);
    setError('');
    try {
      const response = await api[type]({ projectData, isPaid });
      downloadHtmlFile(response.fileName, response.html);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const milestones = bundle?.milestonePlan || [];

  return (
    <section className="mx-auto min-h-screen max-w-6xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Document Workspace</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{projectData.projectTitle}</h1>
        </div>
        <button onClick={onReset} className="rounded-md border border-slate-300 px-4 py-2 font-bold text-slate-700 hover:border-coral hover:text-coral">
          New Demo
        </button>
      </div>

      <ActionButtons
        isPaid={isPaid}
        isLoading={isLoading}
        onGenerateContract={() => handleDownload('contract')}
        onGenerateInvoice={() => handleDownload('invoice')}
        onMarkPaid={() => setIsPaid(true)}
        onGenerateReceipt={() => handleDownload('receipt')}
      />

      {error && <p className="mt-4 rounded-md bg-red-50 p-3 font-semibold text-red-700">{error}</p>}

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Agreement Summary</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div><dt className="font-bold text-slate-500">Freelancer</dt><dd className="text-slate-900">{projectData.freelancerName}</dd></div>
              <div><dt className="font-bold text-slate-500">Client</dt><dd className="text-slate-900">{projectData.clientName} ({projectData.clientEmail})</dd></div>
              <div><dt className="font-bold text-slate-500">Project</dt><dd className="text-slate-900">{projectData.projectTitle}</dd></div>
              <div><dt className="font-bold text-slate-500">Total price</dt><dd className="text-slate-900">{projectData.currency} {projectData.price}</dd></div>
              <div><dt className="font-bold text-slate-500">Deadline</dt><dd className="text-slate-900">{projectData.deadline}</dd></div>
              <div><dt className="font-bold text-slate-500">Payment status</dt><dd className={isPaid ? 'font-bold text-mint' : 'font-bold text-coral'}>{isPaid ? 'Paid' : 'Unpaid'}</dd></div>
            </dl>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Milestone Plan</h2>
            <ol className="mt-4 space-y-3">
              {milestones.map((milestone, index) => (
                <li key={`${milestone.title}-${index}`} className="rounded-md bg-slate-50 p-3">
                  <p className="font-bold text-ink">{milestone.title}</p>
                  <p className="text-sm text-slate-600">{milestone.date || 'Date to be confirmed'}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="space-y-5">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Contract Draft</h2>
            <div className="document-body mt-4 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: bundle?.contractPreview || '<p>Generating contract preview...</p>' }} />
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Invoice</h2>
            <div className="document-body mt-4 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: bundle?.invoicePreview || '<p>Generating invoice preview...</p>' }} />
          </article>
        </div>
      </div>
    </section>
  );
}
