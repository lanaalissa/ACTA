import { useEffect, useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import ActionButtons from './ActionButtons.jsx';
import { api, downloadHtmlFile } from '../utils/api.js';

const editableFields = [
  { key: 'freelancerName', label: 'Freelancer' },
  { key: 'clientName', label: 'Client' },
  { key: 'clientEmail', label: 'Client email', type: 'email' },
  { key: 'projectTitle', label: 'Project title' },
  { key: 'scope', label: 'Scope', multiline: true },
  { key: 'deliverables', label: 'Deliverables', multiline: true },
  { key: 'price', label: 'Price', type: 'number' },
  { key: 'currency', label: 'Currency' },
  { key: 'deadline', label: 'Deadline', type: 'date' },
  { key: 'paymentTerms', label: 'Payment terms', multiline: true },
  { key: 'milestones', label: 'Milestones', multiline: true },
  { key: 'notes', label: 'Notes', multiline: true }
];

export default function DocumentPreview({ projectData, onUpdate, onReset }) {
  const [bundle, setBundle] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [draftData, setDraftData] = useState(projectData);

  useEffect(() => {
    setDraftData(projectData);
  }, [projectData]);

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
    setNotice('');
    try {
      const response = await api[type]({ projectData, isPaid });
      downloadHtmlFile(response.fileName, response.html);
      setNotice(`${capitalize(type)} downloaded. Open it in a browser to print or save as PDF.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function updateDraft(key, value) {
    setDraftData((current) => ({ ...current, [key]: value }));
  }

  function saveEdits(event) {
    event.preventDefault();
    onUpdate(draftData);
    setIsEditing(false);
    setNotice('Project details updated and documents regenerated.');
    setError('');
  }

  function cancelEdits() {
    setDraftData(projectData);
    setIsEditing(false);
    setError('');
  }

  function markPaid() {
    setIsPaid(true);
    setNotice('Payment marked as paid. Receipt download is now available.');
  }

  const milestones = bundle?.milestonePlan || [];

  return (
    <section className="mx-auto min-h-screen max-w-6xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Document Workspace</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{projectData.projectTitle}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 font-bold text-slate-700 hover:border-navy hover:text-navy">
            <Edit3 size={16} />
            Edit Details
          </button>
          <button onClick={onReset} className="rounded-md border border-slate-300 px-4 py-2 font-bold text-slate-700 hover:border-coral hover:text-coral">
            New Demo
          </button>
        </div>
      </div>

      <ActionButtons
        isPaid={isPaid}
        isLoading={isLoading}
        onGenerateContract={() => handleDownload('contract')}
        onGenerateInvoice={() => handleDownload('invoice')}
        onMarkPaid={markPaid}
        onGenerateReceipt={() => handleDownload('receipt')}
      />

      {error && <p className="mt-4 rounded-md bg-red-50 p-3 font-semibold text-red-700">{error}</p>}
      {notice && !error && <p className="mt-4 rounded-md bg-emerald-50 p-3 font-semibold text-emerald-800">{notice}</p>}

      {isEditing && (
        <form onSubmit={saveEdits} className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-ink">Edit Project Details</h2>
            <button type="button" onClick={cancelEdits} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:border-coral hover:text-coral">
              <X size={16} />
              Cancel
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {editableFields.map((field) => (
              <label key={field.key} className={field.multiline ? 'md:col-span-2' : ''}>
                <span className="mb-1 block text-sm font-bold text-slate-600">{field.label}</span>
                {field.multiline ? (
                  <textarea
                    value={draftData[field.key] || ''}
                    onChange={(event) => updateDraft(field.key, event.target.value)}
                    className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-mint focus:ring-4 focus:ring-mint/20"
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={draftData[field.key] || ''}
                    onChange={(event) => updateDraft(field.key, event.target.value)}
                    className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-mint focus:ring-4 focus:ring-mint/20"
                  />
                )}
              </label>
            ))}
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 font-bold text-white transition hover:bg-navy">
            <Save size={18} />
            Save and Regenerate
          </button>
        </form>
      )}

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
              {milestones.length === 0 && <li className="rounded-md bg-slate-50 p-3 text-slate-600">No milestones were parsed.</li>}
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

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-ink">Receipt</h2>
              <span className={isPaid ? 'rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700' : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500'}>
                {isPaid ? 'Available' : 'Locked'}
              </span>
            </div>
            {isPaid ? (
              <div className="document-body mt-4 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: bundle?.receiptPreview || '<p>Generating receipt preview...</p>' }} />
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-600">Mark payment as paid to unlock the receipt export.</p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
