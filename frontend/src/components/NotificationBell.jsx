import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function NotificationBell({ className = "" }) {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  const loadNotifications = async () => {
    try {
      const { data } = await api.get("/users/notifications");
      setNotifications(data);
    } catch (error) {
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async (id) => {
    await api.put(`/users/notifications/${id}/read`);
    loadNotifications();
  };

  return (
    <div className={`notification-bell ${className}`.trim()}>
      <button className="notification-bell-toggle" onClick={() => setShow(!show)}>
        Inbox ({unreadCount})
      </button>
      {show && (
        <div className="dropdown">
          {notifications.length === 0 ? <p>No notifications</p> : notifications.map((item) => (
            <div key={item._id} className="dropdown-item">
              <strong>{item.title}</strong>
              <p>{item.message}</p>
              {!item.read && <button className="primary" onClick={() => markRead(item._id)}>Mark read</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
