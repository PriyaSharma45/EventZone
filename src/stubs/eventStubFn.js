import events from './events.json'
import notifications from './notifications.json'

export const getAllEvent = () => {
    return Object.assign([], events);
}

export const createEvent = (event) => {
    const id = Math.random(3, 1999);
    const registered = false;
    return { ...event, id, registered }
}

export const replaceUpdatedEvent = (updatedEvent) => {
    return updatedEvent
}

export const deleteEvent = (eventId) => eventId

export const getNotification = (email) => {
    if(email === "test@test.com"){
        return notifications
    }
    return []
}
