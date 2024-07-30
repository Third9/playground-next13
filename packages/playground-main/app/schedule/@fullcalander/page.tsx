"use client"

import * as React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import {useState} from "react";
import {EventAddArg, EventApi} from "@fullcalendar/core";

const CalendarPage = (message?: any) => {
    let eventGuid = 0
    const createEventId = () => {
        return String(eventGuid++)
    }
    const [weekendsVisible, setWeekendsVisible] = useState<Boolean>(true)
    const [currentEvents, setCurrentEvents] = useState<any[]>([])
     const handleDateSelect = (selectInfo: any) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleEventClick = (clickInfo: any) => {
        console.log('handleEventClick')
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    const handleEvents = (events: EventApi[]) => {
        console.log('handleEvents')
        setCurrentEvents(events)
    }

    const handleEventAdd = (addInfo: EventAddArg) => {
        console.log('handleEventAdd')
        alert(`events >> ${addInfo.event.start}`)
        console.log('events >> ', addInfo)
    }

    return (
            <div className='calendar-container'>
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin
                    ]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                    }}
                    initialView='dayGridMonth'
                    nowIndicator={true}
                    editable={true}
                    select={handleDateSelect}
                    selectable={true}
                    selectMirror={true}
                    // eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    eventAdd={handleEventAdd}
                    initialEvents={[
                        { title: 'nice event', start: new Date(), }
                    ]}
                />
            </div>
    )
}

const renderEventContent = (eventInfo: any) => {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}
export default CalendarPage