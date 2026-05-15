"use client";

import { useEffect, useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Trash2 } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  rank: number;
  category: string | null;
  gender: string | null;
  course: string | null;
  isRead?: boolean | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingLeadId, setSavingLeadId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    if (!window.confirm("Are you sure you want to logout?")) return;

    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login" as Route);
    router.refresh();
  }

  async function updateReadStatus(leadId: string, isRead: boolean) {
    const previousLeads = leads;
    setSavingLeadId(leadId);
    setLeads((current) =>
      current.map((lead) => (lead.id === leadId ? { ...lead, isRead } : lead))
    );

    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, isRead }),
      });

      if (!res.ok) throw new Error("Failed to update lead");
    } catch (error) {
      console.error(error);
      setLeads(previousLeads);
    } finally {
      setSavingLeadId(null);
    }
  }

  async function deleteLead(leadId: string) {
    const leadToDelete = leads.find((lead) => lead.id === leadId);
    const leadName = leadToDelete?.name ? ` "${leadToDelete.name}"` : "";

    if (!window.confirm(`Are you sure you want to delete${leadName}?`)) return;

    const previousLeads = leads;
    setSavingLeadId(leadId);
    setLeads((current) => current.filter((lead) => lead.id !== leadId));

    try {
      const res = await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId }),
      });

      if (!res.ok) throw new Error("Failed to delete lead");
    } catch (error) {
      console.error(error);
      setLeads(previousLeads);
    } finally {
      setSavingLeadId(null);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Leads ({leads.length})
          <span className="ml-2 text-sm font-medium text-gray-500">
            {leads.filter((lead) => !lead.isRead).length} unread
          </span>
        </h2>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No leads found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold rounded-tl-lg">Read</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Gender</th>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className={lead.isRead ? "bg-gray-50/70 text-gray-500" : "hover:bg-gray-50/50"}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={Boolean(lead.isRead)}
                      disabled={savingLeadId === lead.id}
                      onChange={(event) => updateReadStatus(lead.id, event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label={`Mark ${lead.name} as read`}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.rank.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">{lead.category || "-"}</td>
                  <td className="px-4 py-3">{lead.gender || "-"}</td>
                  <td className="px-4 py-3">{lead.course || "-"}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={savingLeadId === lead.id}
                      onClick={() => deleteLead(lead.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
