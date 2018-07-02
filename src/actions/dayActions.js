import { SET_DAY, SET_CURRENT_DAY, DELETE_DAY } from "../Constants";

export function setDay(day, newDay) {
	return {
		type: SET_DAY,
		day,
		newDay
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