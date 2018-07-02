import { SET_HOTEL, SET_DAY, SET_CURRENT_DAY, DELETE_DAY } from '../Constants';

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
                    action.day.date = lastDate.setDate(lastDate.getDate() + 1);
                }
                newstate.list.push(action.day);
                newstate.currentDay = newstate.nbDays;
                newstate.nbDays++;
            } else {
                newstate.list[action.dayNum] = action.day;
            }
            return newstate;

        case DELETE_DAY:
            newstate.list.splice(newstate.dayId, 1);
            newstate.nbDays--;
            newstate.currentDay = 0;
            return newstate;

        case SET_CURRENT_DAY:
            newstate.currentDay = action.currentDay;
            return newstate;

        case SET_HOTEL:
            newstate.list[action.dayNum].hotel = action.hotel;
            return newstate;

        default:
            return state;
    }
};