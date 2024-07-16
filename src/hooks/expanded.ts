import { useCallback, useState } from "react";

const useExpanded = (initialIds?: string[]) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(
    () => setExpanded(new Set(initialIds)),
    [initialIds]
  );

  const collapseAll = useCallback(() => setExpanded(new Set()), []);

  return {
    expanded,
    expandAll,
    collapseAll,
    toggleExpanded,
    isExpanded: useCallback((id: string) => expanded.has(id), [expanded]),
  };
};

export default useExpanded;
