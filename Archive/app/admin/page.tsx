"use client";

import React, { useState, useEffect } from "react";
import Container from "../Components/UI/Container";
import GradientText from "../Components/UI/GradientText";
import PrimaryButton from "../Components/UI/PrimaryButton";
import GhostButton from "../Components/UI/GhostButton";
import SubmitButton from "../Components/UI/SubmitButton";
import type { Request } from "../Types/api";

export default function AdminPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Check if API key is stored in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("admin_api_key");
    if (stored) {
      setApiKey(stored);
      setAuthenticated(true);
      fetchRequests(stored);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("admin_api_key", apiKey);
      setAuthenticated(true);
      fetchRequests(apiKey);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_api_key");
    setApiKey("");
    setAuthenticated(false);
    setRequests([]);
  };

  const fetchRequests = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/requests?limit=100", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const json = await res.json();

      if (json.ok) {
        setRequests(json.requests || []);
      } else {
        setError(json.error || "Failed to load requests");
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Role", "Location", "Company", "Needs"];
    const rows = requests.map((req) => [
      formatDate(req.created_at),
      req.name,
      req.email,
      req.phone || "",
      req.role || "",
      req.location || "",
      req.company || "",
      req.needs || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-white py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.25),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.25),transparent_40%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
                Admin <GradientText>Access</GradientText>
              </h1>
              <p className="text-slate-900 mb-6">Enter your API key to access the admin dashboard.</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="grid gap-1">
                  <label htmlFor="api-key" className="text-sm font-medium text-slate-900">API Key</label>
                  <input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter admin API key"
                                        className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
                <SubmitButton className="w-full justify-center">
                  Access Admin
                </SubmitButton>
              </form>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.18),transparent_40%)]" />
      <Container className="relative">
        <div className="flex items-center justify-between mb-10">
          <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Client <GradientText>Requests</GradientText>
            </h1>
            <p className="mt-2 text-slate-900">
              Manage and export client request submissions
            </p>
          </div>
          <div className="flex gap-3">
          <div className="flex gap-3">
            <button
              onClick={() => fetchRequests(apiKey)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl text-center">
            <p className="text-slate-600">Loading requests...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                Total: {requests.length} request{requests.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Needs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                        No requests found
                      </td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {formatDate(req.created_at)}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {req.name}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`mailto:${req.email}`}
                            className="text-pink-600 hover:text-pink-700 font-medium hover:underline"
                          >
                            {req.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {req.phone || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {req.role || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {req.location || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {req.company || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                          <div className="truncate" title={req.needs || ""}>
                            {req.needs || "—"}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}