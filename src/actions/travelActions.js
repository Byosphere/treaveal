import { SET_TRAVEL_INFO, SET_HOTEL, DELETE_TRAVEL } from "../Constants";


export function saveTravelInfo(title, location, daysNum, notes, departureDate) {
    return {
        type: SET_TRAVEL_INFO,
        notes,
        location,
        daysNum: parseInt(daysNum),
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

export function setCurrentDay(currentDay) {
    return {
        type: SET_TRAVEL_INFO,
        currentDay
    }
}

export function deleteTravel() {
    return {
        type: DELETE_TRAVEL
    }
}