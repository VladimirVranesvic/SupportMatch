import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  location: string;
  role: string;
  needs: string;
  phone: string;
}

export function useRequestForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    location: "",
    role: "Support Coordinator",
    needs: "",
    phone: "",
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.ok) {
        setSubmitted(true);
      } else {
        alert("send fail: " + (json.error || "Unknown error"));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      alert("send error: " + msg);
    } finally {
      setSending(false);
    }
  };

  return { form, sending, submitted, onChange, onSubmit };
}