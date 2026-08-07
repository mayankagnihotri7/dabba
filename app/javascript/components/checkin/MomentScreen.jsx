import { useEffect, useRef, useState } from "react";
import { Frown, Meh, Smile, Laugh } from "lucide-react";
import api from "../../lib/api";
import ResponseCard from "./ResponseCard";
import { classifyMood, getClassifier } from "../../lib/classifier";
import { generateResponse, getGenerator } from "../../lib/generator";
import ModelLoader from "../ModelLoader";
import { MOODS, NOTE_LENGTH, STUB_RESPONSES } from "../../utils/constants";

const MomentScreen = () => {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [response, setResponse] = useState(null);
  const [modelReady, setModelReady] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadProgress = useRef({ classifier: 0, generator: 0 });

  useEffect(() => {
    const trackProgress = (name) => (data) => {
      if (data.status === "progress") {
        loadProgress.current[name] = data.progress;
        const avg =
          (loadProgress.current.classifier + loadProgress.current.generator) /
          2;
        setProgress(Math.round(avg));
      }
    };

    // preload both models in the background so the first moment isn't slow
    Promise.all([
      getClassifier(trackProgress("classifier")),
      getGenerator(trackProgress("generator")),
    ])
      .then(() => setModelReady(true))
      .catch((e) => console.error(e));
  }, []);

  if (!modelReady) return <ModelLoader progress={progress} />;

  const withTimeout = (promise, ms) => {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timed out")), ms),
      ),
    ]);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!mood && !note.trim()) return;

    setGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 0));

    let finalMood = mood;

    if (note.trim().length > 0) {
      try {
        finalMood = await classifyMood(note);
      } catch (err) {
        console.error(
          "Classification failed, falling back to tapped mood",
          err,
        );
      }
    }

    if (!finalMood) return;

    let text;

    try {
      const generated = await withTimeout(
        generateResponse(finalMood, note),
        15000,
      );
      text =
        generated && generated.length > 5
          ? generated
          : STUB_RESPONSES[finalMood];
    } catch (err) {
      console.error("Generator failed, using fallback", err);
      text = STUB_RESPONSES[finalMood];
    } finally {
      setGenerating(false);
    }

    setResponse(text);

    try {
      await api.post("/moments", { mood: finalMood });
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
    <div className='w-full max-w-sm mx-auto'>
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
            onChange={(e) => setNote(e.target.value.slice(0, { NOTE_LENGTH }))}
            placeholder="what's on your mind right now?"
            rows={4}
            className='w-full bg-dabba-bg border border-dabba-text/10 rounded-lg px-3.5 py-3 text-dabba-text text-sm mb-2 focus:outline-none focus:border-dabba-amber resize-none'
          />
          <p className='text-right text-[11px] text-dabba-text/40 mb-5'>
            {note.length}/{NOTE_LENGTH}
          </p>

          <button
            type='submit'
            disabled={(!mood && !note.trim()) || generating}
            className='w-full bg-dabba-bg text-dabba-text font-semibold text-sm rounded-lg py-3.5 disabled:opacity-40 cursor-pointer'
          >
            {!modelReady
              ? "getting ready..."
              : generating
                ? "thinking..."
                : "Get something for me"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MomentScreen;
