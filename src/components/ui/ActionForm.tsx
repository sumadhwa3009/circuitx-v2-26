"use client";
import { createContext, useContext, useState } from "react";
import type { ButtonHTMLAttributes, FormEvent, FormHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

const PendingContext = createContext(false);

type FormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "action" | "onSubmit"> & {
  action: (formData: FormData) => void | Promise<void>;
};

/**
 * A form that runs a server action and tells its buttons while it is working.
 * Use <SubmitButton> inside it: the button shows a spinner and is disabled until the server answers,
 * so you can see the site is alive and cannot double-submit.
 */
export function ActionForm({ action, children, ...rest }: FormProps) {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const data = new FormData(e.currentTarget);
    setPending(true);
    try {
      await action(data);
    } finally {
      setPending(false);
    }
  }

  return (
    <form {...rest} onSubmit={onSubmit} aria-busy={pending}>
      <PendingContext.Provider value={pending}>{children}</PendingContext.Provider>
    </form>
  );
}

export function SubmitButton({ children, iconOnly, disabled, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { iconOnly?: boolean }) {
  const pending = useContext(PendingContext);
  return (
    <button {...rest} type="submit" disabled={disabled || pending} aria-busy={pending}>
      {pending ? <><Spinner />{!iconOnly && children}</> : children}
    </button>
  );
}
