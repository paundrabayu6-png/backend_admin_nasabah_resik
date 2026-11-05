"use client";

import React, { useEffect, useState } from "react";
import { getCurrentAdmin, type AdminUser } from "@/services/auth.service";
import {
  Camera,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
  Save,
  Shield,
  Calendar,
} from "lucide-react";

export default function ProfilAdminPage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAdmin(getCurrentAdmin());
      setIsLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const adminName = admin?.nama ?? "Admin";
  const adminEmail = admin?.email ?? "";
  const adminRole = admin?.role === "superadmin" ? "SUPER ADMIN" : "ADMIN";
  const adminRoleLabel = admin?.role === "superadmin" ? "Super Admin" : "Admin";

  // Hitung inisial dari nama
  const initials = adminName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const skeletonClass =
    "animate-pulse bg-gray-200 rounded-lg h-10 w-full";

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#064e3b] font-semibold">Kelola Profil</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Profil</h1>
        <p className="text-xs text-gray-400 mt-1">
          Kelola informasi profil dan keamanan akun Anda.
        </p>
      </div>

      {/* Card Utama */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header Card dengan Gradient */}
        <div className="bg-gradient-to-r from-[#064e3b] to-[#0a7c5c] px-8 py-6">
          <div className="flex items-center gap-5">
            {/* Avatar dengan Inisial */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {initials || "A"}
                </span>
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 p-2 bg-[#E8582B] text-white rounded-xl shadow-md hover:bg-[#c94a22] transition-colors cursor-pointer"
                title="Ganti foto profil"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Info Admin */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {isLoaded ? (
                  <h2 className="text-xl font-bold text-white">{adminName}</h2>
                ) : (
                  <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
                )}
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/20 text-white uppercase tracking-wider border border-white/30">
                  {adminRole}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Akun Terverifikasi
                </span>
                <span className="text-white/30">·</span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <Shield className="w-3 h-3" />
                  {adminRoleLabel}
                </span>
              </div>
              {isLoaded && adminEmail && (
                <p className="text-[11px] text-white/60">{adminEmail}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Section: Informasi Profil */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-1 h-5 bg-[#064e3b] rounded-full" />
              <h3 className="text-sm font-bold text-gray-800">
                Informasi Profil
              </h3>
              <span className="ml-auto text-[10px] text-gray-400 font-medium">
                Data Admin
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  {isLoaded ? (
                    <input
                      key={`admin-name-${admin?.id ?? "loading"}`}
                      type="text"
                      defaultValue={admin?.nama ?? ""}
                      placeholder="Masukkan nama lengkap"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm pl-10 pr-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b] transition-all"
                    />
                  ) : (
                    <div className={skeletonClass} />
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  {isLoaded ? (
                    <input
                      key={`admin-email-${admin?.id ?? "loading"}`}
                      type="email"
                      defaultValue={admin?.email ?? ""}
                      placeholder="admin@resik.id"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm pl-10 pr-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b] transition-all"
                    />
                  ) : (
                    <div className={skeletonClass} />
                  )}
                </div>
              </div>

              {/* Nomor Telepon */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  {isLoaded ? (
                    <input
                      type="text"
                      defaultValue={admin?.telepon ?? ""}
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm pl-10 pr-4 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b] transition-all"
                    />
                  ) : (
                    <div className={skeletonClass} />
                  )}
                </div>
              </div>

              {/* Role (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Role / Jabatan
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={adminRoleLabel}
                    readOnly
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl text-sm pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1 ml-1">
                  Role tidak dapat diubah sendiri
                </p>
              </div>
            </div>

            {/* Tombol Simpan Profil */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#04382a] text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Informasi</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Section: Ubah Password */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-1 h-5 bg-[#E8582B] rounded-full" />
              <h3 className="text-sm font-bold text-gray-800">Ubah Password</h3>
              <span className="ml-auto text-[10px] text-gray-400 font-medium">
                Keamanan Akun
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Lama */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Password Lama
                </label>
                <div className="relative max-w-sm">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Masukkan password lama"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm pl-10 pr-10 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  >
                    {showOldPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Baru */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Password Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Buat password baru"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm pl-10 pr-10 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm pl-10 pr-10 py-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <p className="text-[11px] text-amber-700 font-medium mb-1">
                Persyaratan password:
              </p>
              <ul className="text-[10px] text-amber-600 space-y-0.5 list-disc list-inside">
                <li>Minimal 8 karakter</li>
                <li>Kombinasi huruf besar, huruf kecil, dan angka</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8582B] hover:bg-[#c94a22] text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Perbarui Password</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 flex items-start gap-3">
        <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-emerald-800">
            Info Akun
          </p>
          <p className="text-[11px] text-emerald-600 mt-0.5">
            Untuk perubahan role atau permintaan khusus, hubungi administrator sistem.
          </p>
        </div>
      </div>
    </div>
  );
}
