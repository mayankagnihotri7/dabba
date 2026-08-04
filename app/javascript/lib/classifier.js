import { pipeline } from "@huggingface/transformers";

let classifierPromise = null;

export const getClassifier = (onProgress) => {
  if (!classifierPromise) {
    classifierPromise = pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      { progress_callback: onProgress },
    );
  }
  return classifierPromise;
};

export const classifyMood = async (text) => {
  const classifier = await getClassifier();
  const [{ label, score }] = await classifier(text);

  if (label === "POSITIVE") {
    return score > 0.85 ? "good" : "neutral";
  }
  return score > 0.85 ? "stressed" : "tired";
};
