import { useState } from "react";
import { Frown, Meh, Smile, Laugh } from "lucide-react";
import api from "../../lib/api";
import ResponseCard from "./ResponseCard";

const MOODS = [
  { key: "stressed", label: "Stressed", Icon: Frown },
  { key: "tired", label: "Tired", Icon: Meh },
  { key: "neutral", label: "Neutral", Icon: Smile },
  { key: "good", label: "Good", Icon: Laugh },
];

const STUB_RESPONSES = {
  stressed:
    "Three stops left. Whatever's waiting after this ride can wait ten more seconds - look up.",
  tired:
    "You don't have to be anything right now except a person on a train. That's enough.",
  neutral: "Some rides are just rides. That's a fine way for one to go.",
  good: "Good - hold on to that. It's allowed to just be a good day, no reason needed.",
};

const MomentScreen = () => {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [response, setResponse] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!mood) return;

    setResponse(STUB_RESPONSES[mood]);

    try {
      await api.post("/moments", { mood });
    } catch (e) {
      console.error("Failed to save moment", e);
    }
  };

  const reset = () => {
    setMood(null);
    setNote("");
    setResponse(null);
  };

  if (response) {
    return <ResponseCard response={response} onDone={reset} />;
  }

  return (
    <div className='min-h-screen bg-dabba-bg flex items-center justify-center px-6'>
      <div className='w-full max-w-sm'>
        <div className='text-center mb-8'>
          <p className='font-mono text-[11px] tracking-widest text-dabba-teal uppercase mb-1'>
            Dabba · Local
          </p>
          <h1 className='font-display text-2xl text-dabba-text'>
            how's the ride
          </h1>
        </div>

        <form onSubmit={submit} className='ticket-card pt-6 px-7 pb-7'>
          <div className='flex gap-2 mb-5'>
            {MOODS.map(({ key, label, Icon }) => (
              <button
                key={key}
                type='button'
                onClick={() => setMood(key)}
                className={`flex-1 flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-medium transition-colors ${mood === key ? "bg-dabba-amber text-dabba-bg" : "bg-dabba-bg text-dabba-text/60"} cursor-pointer`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 250))}
            placeholder="what's on your mind right now?"
            rows={4}
            className='w-full bg-dabba-bg border border-dabba-text/10 rounded-lg px-3.5 py-3 text-dabba-text text-sm mb-2 focus:outline-none focus:border-dabba-amber resize-none'
          />
          <p className='text-right text-[11px] text-dabba-text/40 mb-5'>
            {note.length}/250
          </p>

          <button
            type='submit'
            disabled={!mood}
            className='w-full bg-dabba-bg text-dabba-text font-semibold text-sm rounded-lg py-3.5 disabled:opacity-40 cursor-pointer'
          >
            Get something for me
          </button>
        </form>
      </div>
    </div>
  );
};

export default MomentScreen;
