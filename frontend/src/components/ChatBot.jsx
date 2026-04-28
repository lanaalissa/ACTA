import { useMemo, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';
import { demoData } from '../data/demoData.js';

const questions = [
  { key: 'freelancerName', label: 'Freelancer or business name', prompt: 'What is your freelancer or business name?', required: true },
  { key: 'clientName', label: 'Client name', prompt: 'Who is the client?', required: true },
  { key: 'clientEmail', label: 'Client email', prompt: 'What is the client email?', required: true, type: 'email' },
  { key: 'projectTitle', label: 'Project title', prompt: 'What is the project title?', required: true },
  { key: 'scope', label: 'Scope', prompt: 'Describe the project scope.', required: true, multiline: true },
  { key: 'deliverables', label: 'Deliverables', prompt: 'List the deliverables.', required: true, multiline: true },
  { key: 'price', label: 'Price', prompt: 'What is the total project price?', required: true, type: 'number' },
  { key: 'currency', label: 'Currency', prompt: 'What currency should be used?', required: true },
  { key: 'deadline', label: 'Deadline', prompt: 'What is the final deadline?', required: true, type: 'date' },
  { key: 'paymentTerms', label: 'Payment terms', prompt: 'What are the payment terms?', required: true, multiline: true },
  { key: 'milestones', label: 'Milestones', prompt: 'Add project milestones and dates.', required: true, multiline: true },
  { key: 'notes', label: 'Notes', prompt: 'Any extra notes or special terms?', required: false, multiline: true }
];

export default function ChatBot({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const currentQuestion = questions[step];
  const messages = useMemo(() => questions.slice(0, step).map((question) => ({
    question: question.prompt,
    answer: answers[question.key]
  })), [answers, step]);

  function validate(question, rawValue) {
    const trimmed = rawValue.trim();
    if (question.required && !trimmed) {
      return `${question.label} is required.`;
    }
    if (question.type === 'email' && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return 'Enter a valid email address.';
    }
    if (question.type === 'number' && (!Number.isFinite(Number(trimmed)) || Number(trimmed) <= 0)) {
      return 'Enter a valid price greater than 0.';
    }
    return '';
  }

  function submitAnswer(event) {
    event.preventDefault();
    const validationError = validate(currentQuestion, value);

    if (validationError) {
      setError(validationError);
      return;
    }

    const nextAnswers = { ...answers, [currentQuestion.key]: value.trim() };
    setAnswers(nextAnswers);
    setError('');
    setValue('');

    if (step + 1 === questions.length) {
      onComplete(nextAnswers);
      return;
    }

    setStep((currentStep) => currentStep + 1);
  }

  function useDemoData() {
    setAnswers(demoData);
    onComplete(demoData);
  }

  return (
    <section className="mx-auto grid min-h-screen max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-3xl font-black text-ink">A.C.A.T Intake</h1>
        <p className="mt-3 text-slate-600">Answer each prompt to create a clean agreement draft, milestone plan, and invoice.</p>
        <div className="mt-6">
          <ProgressBar current={step} total={questions.length} />
        </div>
        <button
          onClick={useDemoData}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 font-bold text-ink transition hover:border-mint hover:text-navy"
        >
          <Sparkles size={18} />
          Use Demo Data
        </button>
      </aside>

      <div className="flex min-h-[620px] flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="max-w-[85%] rounded-lg bg-slate-100 p-4 text-slate-800">
            Hi. I will collect the details step by step and keep contract, invoice, and receipt language separate.
          </div>
          {messages.map((message) => (
            <div key={message.question} className="space-y-3">
              <div className="max-w-[85%] rounded-lg bg-slate-100 p-4 text-slate-800">{message.question}</div>
              <div className="ml-auto max-w-[85%] rounded-lg bg-navy p-4 text-white">{message.answer}</div>
            </div>
          ))}
          <div className="max-w-[85%] rounded-lg bg-slate-100 p-4 text-slate-800">{currentQuestion.prompt}</div>
        </div>

        <form onSubmit={submitAnswer} className="border-t border-slate-200 p-4">
          <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor={currentQuestion.key}>
            {currentQuestion.label}{currentQuestion.required ? ' *' : ''}
          </label>
          <div className="flex gap-3">
            {currentQuestion.multiline ? (
              <textarea
                id={currentQuestion.key}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="min-h-24 flex-1 rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-mint focus:ring-4 focus:ring-mint/20"
              />
            ) : (
              <input
                id={currentQuestion.key}
                type={currentQuestion.type || 'text'}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="min-h-12 flex-1 rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-mint focus:ring-4 focus:ring-mint/20"
              />
            )}
            <button className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-coral text-white transition hover:bg-[#dc5d48]" title="Send answer">
              <Send size={20} />
            </button>
          </div>
          {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  );
}
