import { pipeline } from "@huggingface/transformers";

let classifierPromise = null;

export const getClassifier = (onProgress) => {
  if (!classifierPromise) {
    classifierPromise = pipeline(
      "text-classification",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      { progress_callback: onProgress },
    );
  }
  return classifierPromise;
};

const EMOTION_TO_MOOD = {
  anger: "stressed",
  fear: "stressed",
  sadness: "tired",
  joy: "good",
  love: "good",
  surprise: "neutral"
}

export const classifyMood = async (text) => {
  const classifier = await getClassifier();
  const [{ label }] = await classifier(text);
  return EMOTION_TO_MOOD[label] ?? "neutral"
};
