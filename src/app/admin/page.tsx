"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LogOut,
  Trash2,
} from "lucide-react";

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

type ConfirmDialogState =
  | { type: "logout" }
  | { type: "delete"; lead: Lead }
  | null;

const LEADS_PER_PAGE = 10;

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingLeadId, setSavingLeadId] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(leads.length / LEADS_PER_PAGE));
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [leads.length]);

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
    setConfirmDialog({ type: "logout" });
  }

  async function confirmLogout() {
    setLoggingOut(true);

    await fetch("/api/auth/logout", { method: "POST" });
    setConfirmDialog(null);
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

  function requestDeleteLead(leadId: string) {
    const leadToDelete = leads.find((lead) => lead.id === leadId);
    if (!leadToDelete) return;

    setConfirmDialog({ type: "delete", lead: leadToDelete });
  }

  async function deleteLead(leadId: string) {
    const previousLeads = leads;
    setSavingLeadId(leadId);
    setLeads((current) => current.filter((lead) => lead.id !== leadId));
    setConfirmDialog(null);

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

  function resetPasswordForm() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  }

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setPasswordSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  }

  const isDeleteDialog = confirmDialog?.type === "delete";
  const dialogTitle = isDeleteDialog ? "Delete lead?" : "Logout?";
  const dialogDescription = isDeleteDialog
    ? `This will permanently delete ${confirmDialog.lead.name}'s lead from the admin dashboard.`
    : "You will be signed out of the admin dashboard.";
  const confirmButtonText = isDeleteDialog ? "Delete lead" : "Logout";
  const isConfirming = isDeleteDialog
    ? savingLeadId === confirmDialog.lead.id
    : loggingOut;
  const totalPages = Math.max(1, Math.ceil(leads.length / LEADS_PER_PAGE));
  const pageStart = (currentPage - 1) * LEADS_PER_PAGE;
  const paginatedLeads = leads.slice(pageStart, pageStart + LEADS_PER_PAGE);
  const firstLeadNumber = leads.length === 0 ? 0 : pageStart + 1;
  const lastLeadNumber = Math.min(pageStart + LEADS_PER_PAGE, leads.length);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Leads ({leads.length})
            <span className="ml-2 text-sm font-medium text-gray-500">
              {leads.filter((lead) => !lead.isRead).length} unread
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetPasswordForm();
                setPasswordDialogOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <KeyRound className="w-4 h-4" />
              Change Password
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
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
                {paginatedLeads.map((lead) => (
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
                        onClick={() => requestDeleteLead(lead.id)}
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
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing {firstLeadNumber}-{lastLeadNumber} of {leads.length} leads
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-20 text-center text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog.Root
        open={Boolean(confirmDialog)}
        onOpenChange={(open) => {
          if (!open && !isConfirming) setConfirmDialog(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl outline-none">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <Dialog.Title className="text-lg font-bold text-gray-900">
              {dialogTitle}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-6 text-gray-600">
              {dialogDescription}
            </Dialog.Description>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={isConfirming}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="button"
                disabled={isConfirming}
                onClick={() => {
                  if (!confirmDialog) return;
                  if (confirmDialog.type === "delete") {
                    deleteLead(confirmDialog.lead.id);
                    return;
                  }
                  confirmLogout();
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isConfirming ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {confirmButtonText}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={passwordDialogOpen}
        onOpenChange={(open) => {
          if (changingPassword) return;
          setPasswordDialogOpen(open);
          if (!open) resetPasswordForm();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl outline-none">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
              <KeyRound className="h-5 w-5" />
            </div>
            <Dialog.Title className="text-lg font-bold text-gray-900">
              Change admin password
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-6 text-gray-600">
              Enter your current password and choose a new password for this admin account.
            </Dialog.Description>

            <form onSubmit={changePassword} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((show) => !show)}
                    className="absolute inset-y-0 right-2 inline-flex items-center justify-center px-1 text-gray-400 hover:text-gray-700"
                    aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((show) => !show)}
                    className="absolute inset-y-0 right-2 inline-flex items-center justify-center px-1 text-gray-400 hover:text-gray-700"
                    aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    className="absolute inset-y-0 right-2 inline-flex items-center justify-center px-1 text-gray-400 hover:text-gray-700"
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {passwordError ? (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {passwordError}
                </p>
              ) : null}
              {passwordSuccess ? (
                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {passwordSuccess}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    disabled={changingPassword}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {changingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save Password
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
