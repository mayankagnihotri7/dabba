import { Frown, Meh, Smile, Laugh } from "lucide-react";

export const MOODS = [
  { key: "stressed", label: "Stressed", Icon: Frown },
  { key: "tired", label: "Tired", Icon: Meh },
  { key: "neutral", label: "Neutral", Icon: Smile },
  { key: "good", label: "Good", Icon: Laugh },
];

export const STUB_RESPONSES = {
  stressed:
    "Three stops left. Whatever's waiting after this ride can wait ten more seconds - look up.",
  tired:
    "You don't have to be anything right now except a person on a train. That's enough.",
  neutral: "Some rides are just rides. That's a fine way for one to go.",
  good: "Good - hold on to that. It's allowed to just be a good day, no reason needed.",
};

export const TABS = {
  MOMENT: "moment",
  CHEER_WALL: "cheerwall",
};

export const EMOTION_TO_MOOD = {
  positive: "good",
  negative: "stressed",
};

export const MOOD_PROMPTS = {
  stressed:
    "Someone on a Mumbai train is feeling stressed right now. Write one short, calming sentence that helps them exhale:",
  tired:
    "Someone on a Mumbai train is feeling tired right now. Write one short, gentle sentence about resting without guilt:",
  neutral:
    "Someone on a Mumbai train is feeling neutral right now. Write one short, quietly observant sentence about an ordinary moment:",
  good: "Someone on a Mumbai train is feeling good right now. Write one short, warm sentence that celebrates that without being over the top:",
};

export const TOKEN_KEY = "dabba_token";
export const MAX_LENGTH = 280;
export const NOTE_LENGTH = 250
