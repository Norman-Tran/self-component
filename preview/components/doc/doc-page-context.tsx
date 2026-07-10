import * as React from 'react';

export type DocTocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

type DocPageContextValue = {
  tocItems: DocTocItem[];
  registerTocItem: (item: DocTocItem) => () => void;
};

const DocPageContext = React.createContext<DocPageContextValue | null>(null);

export function DocPageProvider({ children }: { children: React.ReactNode }) {
  const [tocItems, setTocItems] = React.useState<DocTocItem[]>([]);

  const registerTocItem = React.useCallback((item: DocTocItem) => {
    setTocItems((prev) => {
      if (prev.some((entry) => entry.id === item.id)) return prev;
      return [...prev, item];
    });

    return () => {
      setTocItems((prev) => prev.filter((entry) => entry.id !== item.id));
    };
  }, []);

  const value = React.useMemo(
    () => ({
      tocItems,
      registerTocItem,
    }),
    [tocItems, registerTocItem],
  );

  return <DocPageContext.Provider value={value}>{children}</DocPageContext.Provider>;
}

export function useDocPage() {
  const context = React.useContext(DocPageContext);
  if (!context) {
    throw new Error('useDocPage must be used within ComponentDocLayout');
  }
  return context;
}

export function useRegisterDocTocItem(item: DocTocItem) {
  const { registerTocItem } = useDocPage();

  React.useEffect(() => registerTocItem(item), [item.id, item.title, item.level, registerTocItem]);
}
