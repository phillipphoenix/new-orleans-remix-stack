import { useEffect, useState } from "react";

export const useClassnames = (
  id: string,
  idClassnames: { [key: string]: string }
) => {
  const [currentClassnames, setCurrentClassnames] = useState(idClassnames[id]);

  useEffect(() => {
    setCurrentClassnames(idClassnames[id]);
  }, [id, idClassnames]);

  return currentClassnames;
};
