import { useEffect, useState } from "react";
import {
  type InstructionStyle,
  getStoredInstructionStyle,
  setStoredInstructionStyle,
} from "@/lib/instruction-style";

export function useInstructionStyle() {
  const [style, setStyle] = useState<InstructionStyle>(() => getStoredInstructionStyle());

  useEffect(() => {
    setStoredInstructionStyle(style);
  }, [style]);

  return { style, setStyle } as const;
}
