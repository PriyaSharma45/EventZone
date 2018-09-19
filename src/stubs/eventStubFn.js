import events from './events.json'
import userevents from './userevents.json'

export const getAllEvent = () => {
    return Object.assign({}, events);
}

export const createNewEvent = (event) => {
    const id = events.length + 1;
    events.push({ ...event, id });
    return Object.assign({}, events)
}