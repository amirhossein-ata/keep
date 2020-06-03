import { useEffect } from "react";

export function useOutsideChecker(ref, outsideClickCallback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideClickCallback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, outsideClickCallback]);
}

export function getHashtags(text) {
  return text.split(" ").filter((i) => i.startsWith("#"));
}
