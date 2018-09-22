import events from './events.json'

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
