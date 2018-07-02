import { SET_DAY, SET_CURRENT_DAY } from "../Constants";

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