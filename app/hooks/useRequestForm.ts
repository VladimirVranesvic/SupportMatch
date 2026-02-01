import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  location: string;
  role: string;
  needs: string;
  phone: string;
  website: string; // Honeypot field
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
    website: "", // Honeypot - always empty
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Don't allow changes to honeypot field
    if (e.target.name === "website") return;
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error on input
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          company: "",
          location: "",
          role: "Support Coordinator",
          needs: "",
          phone: "",
          website: "",
        });
      } else {
        setError(json.error || "Failed to submit request. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  return { form, sending, submitted, error, onChange, onSubmit };
}