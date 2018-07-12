import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS} from "./eventConstants";
import { asyncActionError, asyncActionStart, asyncActionFinish } from "../async/asyncActions";
import { fetchSampleData} from "../../app/data/mockApi";

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event
        }
    }
};

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event
        }
    }
};

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
};

export const fetchEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: events
    }
};

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart());
            let events = await fetchSampleData();
            dispatch(fetchEvents(events));
            dispatch(asyncActionFinish());
        } catch(err) {
            dispatch(asyncActionError());
        }
    }
};