"use client";

import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { EventAddArg, EventApi, DateSelectArg } from "@fullcalendar/core";
import EventModal from "./components/EventModal";

const CalendarPage = () => {
  let eventGuid = 0;
  const createEventId = () => String(eventGuid++);

  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "update" | "delete">(
    "add"
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [calendarApi, setCalendarApi] = useState<any>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setModalMode("add");
    setSelectedDate(selectInfo.start);
    setCalendarApi(selectInfo.view.calendar);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
    setCalendarApi(null);
  };

  const handleModalSubmit = (title: string) => {
    if (modalMode === "add" && selectedDate && calendarApi) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectedDate,
        allDay: true,
        extendedProps: {
          showDeleteButton: true,
        },
      });
    } else if (modalMode === "update" && selectedEvent) {
      selectedEvent.setProp("title", title);
    } else if (modalMode === "delete" && selectedEvent) {
      selectedEvent.remove();
    }
    handleModalClose();
  };

  const handleEventClick = (clickInfo: { event: EventApi }) => {
    setSelectedEvent(clickInfo.event);
    setSelectedDate(new Date(clickInfo.event.startStr));
    setModalMode("update");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (event: EventApi, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        select={handleDateSelect}
        selectable={true}
        selectMirror={true}
        eventContent={(eventInfo) => {
          return (
            <div className="flex items-center justify-between w-full px-1">
              <div className="flex-1 truncate">{eventInfo.event.title}</div>
              <button
                onClick={(e) => handleDeleteClick(eventInfo.event, e)}
                className="text-gray-400 hover:text-red-500 ml-2"
              >
                ×
              </button>
            </div>
          );
        }}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        initialEvents={[]}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        mode={modalMode}
        selectedDate={selectedDate || undefined}
        eventTitle={selectedEvent?.title}
      />
    </div>
  );
};

export default CalendarPage;
