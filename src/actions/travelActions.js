import { SET_TRAVEL_INFO, SET_NOTES, DELETE_TRAVEL, TOGGLE_NOTES } from "../Constants";


export function saveTravelInfo(title, location, departureDate) {
    return {
        type: SET_TRAVEL_INFO,
        location,
        title,
        departureDate,
        updatedDate: new Date()
    }
}

export function setNotes(notes) {
    return {
        type: SET_NOTES,
        notes,
        updatedDate: new Date()
    }
}

export function deleteTravel() {
    return {
        type: DELETE_TRAVEL
    }
}

export function toggleNotes() {
    return {
        type: TOGGLE_NOTES
    }
}