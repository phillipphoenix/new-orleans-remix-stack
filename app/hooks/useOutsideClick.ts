import { useEffect } from "react";

export const useOutsideClick = (ref, onOutsideClick: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onOutsideClick?.();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);
};
