import React, { useState, useEffect } from "react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  mode: "add" | "update" | "delete";
  selectedDate?: Date;
  eventTitle?: string;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  selectedDate,
  eventTitle,
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (mode === "add") {
        setTitle("");
      } else if (eventTitle) {
        setTitle(eventTitle);
      }
    }
  }, [isOpen, mode, eventTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" && mode !== "delete") {
      return;
    }
    onSubmit(title);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${month} ${day}, ${year} (${dayOfWeek})`;
  };

  const getModalTitle = () => {
    switch (mode) {
      case "add":
        return "Add Event";
      case "update":
        return "Update Event";
      case "delete":
        return "Delete Event";
      default:
        return "Event";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-xl relative z-[10000] w-[400px]">
        <h3 className="text-lg font-semibold mb-4">{getModalTitle()}</h3>
        {selectedDate && (
          <p className="text-gray-600 mb-4">{formatDate(selectedDate)}</p>
        )}
        <form onSubmit={handleSubmit}>
          {mode === "delete" ? (
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete &ldquo;{eventTitle}&rdquo;?
            </p>
          ) : (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="border p-2 mb-4 w-full rounded"
              autoFocus
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                mode === "delete"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={title.trim() === "" && mode !== "delete"}
            >
              {mode === "delete"
                ? "Delete"
                : mode === "update"
                  ? "Update"
                  : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
