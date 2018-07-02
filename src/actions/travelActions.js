import { SET_TRAVEL_INFO, SET_HOTEL, DELETE_TRAVEL } from "../Constants";


export function saveTravelInfo(title, location, notes, departureDate) {
    return {
        type: SET_TRAVEL_INFO,
        notes,
        location,
        title,
        departureDate,
        updatedDate: new Date()
    }
}

export function saveHotel(hotel, dayNum) {
    return {
        type: SET_HOTEL,
        hotel,
        dayNum
    }
}

export function deleteTravel() {
    return {
        type: DELETE_TRAVEL
    }
}