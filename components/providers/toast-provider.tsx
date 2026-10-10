"use client";

import * as React from "react";
import { Toast, type ToastVariant } from "@/components/ui/toast";

type Item = { id: string; variant: ToastVariant; title: string; message?: string };
type Push = (t: Omit<Item, "id">) => void;

const Ctx = React.createContext<Push | null>(null);

/** One toast stack for the whole app; call `useToast()` from any client component. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<Item[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setItems((v) => v.filter((i) => i.id !== id));
  }, []);

  const push = React.useCallback<Push>(
    (t) => {
      const id = crypto.randomUUID();
      setItems((v) => [...v, { ...t, id }]);
      window.setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <Ctx value={push}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col gap-3"
      >
        {items.map((i) => (
          <div key={i.id} className="rise pointer-events-auto">
            <Toast variant={i.variant} title={i.title} message={i.message} onClose={() => dismiss(i.id)} />
          </div>
        ))}
      </div>
    </Ctx>
  );
}

export function useToast() {
  const push = React.useContext(Ctx);
  if (!push) throw new Error("useToast must be used inside <ToastProvider>");
  return push;
}
