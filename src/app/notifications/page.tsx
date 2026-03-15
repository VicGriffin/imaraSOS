"use client";

import { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, MapPin, Users, X } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

interface Notification {
  id: string;
  type: "alert" | "info" | "location" | "contact";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "SOS Alert Resolved",
    message: "Your emergency alert from earlier has been marked as resolved.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "contact",
    title: "Jane Doe viewed your location",
    message: "Your emergency contact Jane Doe checked your shared location.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Safety Tip",
    message: "Remember to update your emergency contacts and medical profile regularly.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "location",
    title: "Location sharing ended",
    message: "Your 1-hour location sharing session has ended.",
    time: "2 days ago",
    read: true,
  },
];

const typeConfig = {
  alert: { icon: AlertTriangle, color: "#EF4444" },
  info: { icon: Bell, color: "#60A5FA" },
  location: { icon: MapPin, color: "#4ADE80" },
  contact: { icon: Users, color: "#A78BFA" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      <PageHeader title="Notifications" accentColor="#60A5FA" />

      <div className="px-4 py-4 space-y-4">
        {unreadCount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#64748B" }}>
              {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
            </span>
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "#60A5FA" }}
            >
              <CheckCircle size={14} />
              Mark all read
            </button>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell size={40} color="#334155" className="mb-3" />
            <p className="text-sm font-semibold" style={{ color: "#64748B" }}>
              No notifications
            </p>
            <p className="text-xs mt-1" style={{ color: "#475569" }}>
              You&apos;re all caught up!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => {
              const config = typeConfig[n.type];
              const Icon = config.icon;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{
                    backgroundColor: n.read ? "#1E293B" : `${config.color}10`,
                    border: `1px solid ${n.read ? "#334155" : `${config.color}30`}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon size={18} color={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold" style={{ color: n.read ? "#94A3B8" : "#F8FAFC" }}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: config.color }} />
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                      {n.message}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#475569" }}>
                      {n.time}
                    </p>
                  </div>
                  <button onClick={() => dismiss(n.id)} className="flex-shrink-0">
                    <X size={14} color="#475569" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
