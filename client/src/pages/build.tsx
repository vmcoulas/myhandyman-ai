import { useEffect } from "react";
import Home from "@/pages/home";

/**
 * Build route scrolls directly to the upload section.
 */
export default function Build() {
  useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById("upload-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return <Home />;
}
