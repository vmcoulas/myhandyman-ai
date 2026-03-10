export type InstructionStyle = "coach" | "pro";

const STORAGE_KEY = "snapbuilder:instructionStyle";

export function getStoredInstructionStyle(): InstructionStyle {
  if (typeof window === "undefined") return "coach";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "pro" ? "pro" : "coach";
}

export function setStoredInstructionStyle(style: InstructionStyle) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, style);
}
