import { pipeline } from "@huggingface/transformers";

const MOOD_PROMPTS = {
  stressed:
    "Someone on a Mumbai train is feeling stressed right now. Write one short, calming sentence that helps them exhale:",
  tired:
    "Someone on a Mumbai train is feeling tired right now. Write one short, gentle sentence about resting without guilt:",
  neutral:
    "Someone on a Mumbai train is feeling neutral right now. Write one short, quietly observant sentence about an ordinary moment:",
  good: "Someone on a Mumbai train is feel good right now. Write one short, warm sentence that celebrates that without being over the top:",
};

let generatorPromise = null;

export const getGenerator = (onProgress) => {
  if (!generatorPromise) {
    generatorPromise = pipeline("text-generation", "HuggingFaceTB/SmolLM2-360M-Instruct", {
      progress_callback: onProgress,
    });
  }
  return generatorPromise;
};

export const generateResponse = async (mood, ventText) => {
  const generator = await getGenerator();
  const prompt = ventText
    ? `Someone on a Mumbai train wrote: "${ventText}". Respond with one short, warm sentence:`
    : MOOD_PROMPTS[mood];
  const [{ generated_text }] = await generator(prompt, {
    max_new_tokens: 25,
    temperature: 0.7,
  });

  return generated_text.replace(prompt, "").trim();
};
