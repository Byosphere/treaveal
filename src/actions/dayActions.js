import { SET_DAY, SET_CURRENT_DAY, DELETE_DAY, SET_HOTEL } from "../Constants";

export function setDay(day, dayNum) {
	return {
		type: SET_DAY,
		day,
		dayNum
	}
}

export function setCurrentDay(currentDay) {
	return {
		type: SET_CURRENT_DAY,
		currentDay
	}
}

export function deleteDay(dayId) {
	return {
		type: DELETE_DAY,
		dayId
	}
}

export function setHotel(hotel, dayNum) {
	return {
		type: SET_HOTEL,
		hotel,
		dayNum
	}
}