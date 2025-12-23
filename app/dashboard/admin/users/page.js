// app/admin/users/page.js
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Mail,
  Calendar,
  Download,
  Eye,
  Shield,
  ShieldOff,
  Search,
  RefreshCw,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

const ROLE_OPTIONS = [
  { value: "user", label: "User", color: "bg-slate-100 text-slate-800", icon: ShieldOff },
  { value: "admin", label: "Admin", color: "bg-indigo-100 text-indigo-800", icon: Shield },
];

export default function AdminAllUsers() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState(null);

  const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !isAdmin) {
      window.location.href = "/signin";
      return;
    }
    fetchUsers();
  }, [status, session]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const confirmRoleChange = (userId, newRole) => {
    setPendingRoleChange({ userId, newRole });
  };

  const updateRole = async (userId, newRole) => {
    if (updatingId) return;
    setUpdatingId(userId);

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      alert("Error updating role");
    } finally {
      setUpdatingId(null);
      setPendingRoleChange(null);
    }
  };

  const getRoleInfo = (role) => {
    return ROLE_OPTIONS.find((opt) => opt.value === role) || ROLE_OPTIONS[0];
  };

  // Filtered & Sorted Users
  const filteredAndSorted = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower)
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.createdAt || b.joinedAt) - new Date(a.createdAt || a.joinedAt);
      if (sortBy === "date-asc") return new Date(a.createdAt || a.joinedAt) - new Date(b.createdAt || b.joinedAt);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      return 0;
    });

    return filtered;
  }, [users, searchTerm, roleFilter, sortBy]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
          <p className="text-2xl font-semibold text-slate-700 text-center">Loading users...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center max-w-lg">
          <ShieldOff className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-lg text-slate-600">Only admins can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8 transition-all duration-1000 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-7xl mx-auto relative">
     

        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Sparkles className="w-96 h-96 text-indigo-400 animate-pulse" />
          </div>
          <h1 className="relative text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">
            All Users Management
          </h1>
          <p className="text-xl text-slate-600">View and manage platform users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-white/50 overflow-hidden transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="relative text-4xl font-black text-slate-800">{users.length}</p>
            <p className="relative text-lg font-medium text-slate-600 mt-2">Total Users</p>
          </div>
          {ROLE_OPTIONS.map((role) => {
            const Icon = role.icon;
            const count = users.filter((u) => u.role === role.value).length;
            return (
              <div
                key={role.value}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-white/50 overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`relative w-20 h-20 ${role.color} rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <Icon className="w-10 h-10" />
                </div>
                <p className="relative text-4xl font-black text-slate-800">{count}</p>
                <p className="relative text-sm font-medium text-slate-600 mt-2">{role.label}s</p>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
            >
              <option value="all">All Roles</option>
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="email">Email</option>
            </select>

            <div className="text-right text-slate-600 flex items-center justify-end gap-2">
              <span className="font-semibold">{filteredAndSorted.length}</span> users
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-8 border-b border-slate-200">
            <h2 className="text-3xl font-bold flex items-center gap-4">
              <Users className="w-10 h-10 text-indigo-600" />
              All Users ({filteredAndSorted.length})
            </h2>
          </div>

          {paginated.length === 0 ? (
            <div className="p-32 text-center">
              <Users className="w-32 h-32 text-slate-300 mx-auto mb-8" />
              <p className="text-2xl text-slate-500">No users match your filters</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-200">
                {paginated.map((user) => {
                  const roleInfo = getRoleInfo(user.role);
                  const RoleIcon = roleInfo.icon;

                  return (
                    <div
                      key={user._id}
                      className="p-8 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/30 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative grid lg:grid-cols-12 gap-6 items-center">
                        {/* User Info */}
                        <div className="lg:col-span-4 flex items-center gap-5">
                          <div className="relative">
                            <img
                              src={user.image || "/default-avatar.png"}
                              alt={user.name}
                              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white shadow-2xl group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 rounded-3xl ring-4 ring-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                            <p className="text-slate-600 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {/* Joined Date */}
                        <div className="lg:col-span-2">
                          <p className="text-sm text-slate-500 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Joined {new Date(user.createdAt || user.joinedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>

                        {/* Current Role */}
                        <div className="lg:col-span-2">
                          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-3xl ${roleInfo.color} font-bold shadow-lg`}>
                            <RoleIcon className="w-6 h-6" />
                            {roleInfo.label}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="lg:col-span-4 flex items-center justify-end gap-4">
                          <Link
                            href={`/profile?email=${encodeURIComponent(user.email)}`}
                            target="_blank"
                            className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3"
                          >
                            <Eye className="w-5 h-5" />
                            View Profile
                          </Link>

                          {user.hasResume && (
                            <a
                              href={`/api/profile/resume?email=${encodeURIComponent(user.email)}`}
                              download
                              className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all flex items-center gap-3"
                            >
                              <Download className="w-5 h-5" />
                              Resume
                            </a>
                          )}

                          <select
                            value={user.role}
                            onChange={(e) => confirmRoleChange(user._id, e.target.value)}
                            disabled={updatingId === user._id || user.email === session?.user?.email}
                            className="px-6 py-4 bg-white border-2 border-slate-300 rounded-3xl font-semibold text-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all cursor-pointer hover:border-indigo-400 disabled:opacity-50"
                          >
                            {ROLE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-8 flex items-center justify-between bg-gradient-to-r from-indigo-50/30 to-purple-50/30">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 bg-white/80 rounded-2xl shadow-lg disabled:opacity-50 flex items-center gap-3 hover:bg-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" /> Previous
                  </button>
                  <span className="font-semibold text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 bg-white/80 rounded-2xl shadow-lg disabled:opacity-50 flex items-center gap-3 hover:bg-white transition-all"
                  >
                    Next <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Role Change Confirmation Modal */}
      {pendingRoleChange && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-md border border-white/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Confirm Role Change
            </h3>
            <p className="text-slate-600 mb-8">
              Are you sure you want to change this user's role to{" "}
              <span className="font-bold text-indigo-600">
                {pendingRoleChange.newRole === "admin" ? "Admin" : "User"}
              </span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setPendingRoleChange(null)}
                className="px-8 py-4 bg-slate-200 hover:bg-slate-300 rounded-2xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => updateRole(pendingRoleChange.userId, pendingRoleChange.newRole)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}