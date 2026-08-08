import { pipeline } from "@huggingface/transformers";
import { MOOD_PROMPTS, STUB_RESPONSES } from "../utils/constants";

let generatorPromise = null;

export const getGenerator = (onProgress) => {
  if (!generatorPromise) {
    generatorPromise = pipeline(
      "text-generation",
      "HuggingFaceTB/SmolLM2-360M-Instruct",
      {
        progress_callback: onProgress,
      },
    );
  }
  return generatorPromise;
};

const trimToLastSentence = (text) => {
  const match = text.match(/^[^.?!]*[.!?]/);
  return match ? match[0] : text;
};

export const generateResponse = async (mood, ventText) => {
  const generator = await getGenerator();
  const userInstruction = ventText
    ? `Someone on a Mumbai train wrote: "${ventText}". Respond with one short, warm sentence:`
    : MOOD_PROMPTS[mood];

  const messages = [
    {
      role: "system",
      content:
        "You are a warm, minimalist companion for Mumbai local train commuters. Reply with strictly one single sentence and nothing else.",
    },
    { role: "user", content: userInstruction },
  ];

  const output = await generator(messages, {
    max_new_tokens: 45,
    temperature: 0.65,
    do_sample: true,
    top_p: 0.9,
    repetition_penalty: 1.3,
  });

  const generatedEntry = output[0]?.generated_text;
  let raw = "";

  if (Array.isArray(generatedEntry)) {
    raw = generatedEntry?.at(-1)?.content?.trim() ?? "";
  } else if (typeof generatedEntry === "string") {
    raw = generatedEntry.trim();
  }

  const trimmed = trimToLastSentence(raw);
  const cleaned = trimmed.replace(/^["']|["']$/g, "").trim();
  const looksBroken =
    cleaned.length < 5 ||
    cleaned.includes("Reply with") ||
    cleaned.includes("Write one short") ||
    cleaned.includes("Someone on a Mumbai train");

  return looksBroken ? STUB_RESPONSES[mood] : cleaned;
};
