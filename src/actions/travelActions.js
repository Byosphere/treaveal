import { SET_TRAVEL_INFO, SET_HOTEL, SET_DAY } from "../Constants";


export function saveTravelInfo(title, location, daysNum, notes) {
    return {
        type: SET_TRAVEL_INFO,
        notes,
        location,
        daysNum: parseInt(daysNum),
        title
    }
}

export function setDay(num, day) {
    return {
        type: SET_DAY,
        num,
        day
    }
}

export function addDay(day) {
    return {
        type: SET_DAY,
        day
    }
}

export function saveHotel(hotel, dayNum) {
    return {
        type: SET_HOTEL,
        hotel,
        dayNum
    }
}

export function saveDay(day) {
    return {
        type: SET_DAY,
        day
    }
}

export function setCurrentDay(currentDay) {
    return {
        type: SET_TRAVEL_INFO,
        currentDay
    }
}