import { SET_HOTEL, SET_DAY, SET_CURRENT_DAY, DELETE_DAY } from '../Constants';
import { daysBetween, formatDate } from '../utils/helpers';

const initialState = {
    nbDays: 0,
    currentDay: 0,
    list: []
};

export default (state = initialState, action) => {
    var newstate = Object.assign({}, state);
    switch (action.type) {

        case SET_DAY:
            if (!action.dayNum) {
                if (!action.day.date) {
                    let lastDate = new Date(newstate.list[newstate.nbDays - 1].date)
                    action.day.date = formatDate(lastDate.setDate(lastDate.getDate() + 1));
                }
                newstate.list.push(action.day);
                newstate.currentDay = newstate.nbDays;
                newstate.nbDays++;
            } else {
                newstate.list[action.dayNum] = action.day;
            }
            return newstate;

        case DELETE_DAY:
            newstate.list.splice(action.dayId, 1);
            newstate.nbDays--;
            newstate.currentDay = 0;
            return newstate;

        case SET_CURRENT_DAY:
            newstate.currentDay = action.currentDay;
            return newstate;

        case SET_HOTEL:

            if (action.hotel.autocomplete) {
                let nbDays = daysBetween(new Date(action.hotel.checkIn), new Date(action.hotel.checkOut));
                let date = new Date(action.hotel.checkIn);
                for (let index = 0; index <= nbDays; index++) {
                    if (newstate.list[action.dayNum + index]) {
                        newstate.list[action.dayNum + index].hotel = action.hotel;
                    } else {
                        newstate.list[action.dayNum + index] = {
                            name: action.hotel.name + ': day ' + index,
                            date: formatDate(date.setDate(date.getDate() + index)),
                            hotel: action.hotel
                        }
                    }
                }
                newstate.nbDays = newstate.list.length;
            } else {
                newstate.list[action.dayNum].hotel = action.hotel;
            }
            return newstate;

        default:
            return state;
    }
};