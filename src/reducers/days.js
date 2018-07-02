import { SET_HOTEL, SET_DAY, SET_CURRENT_DAY } from '../Constants';

const initialState = {
    nbDays: 0,
    currentDay: 0,
    list: []
};

export default (state = initialState, action) => {
    var newstate = Object.assign({}, state);
    switch (action.type) {

        case SET_DAY:
            if (action.newDay) {
                action.day.id = newstate.list.length;
                newstate.list.push(action.day);
                newstate.nbDays++;
                newstate.currentDay = action.day.id;
            } else {
                newstate.list[action.day.id] = action.day;
            }
            return newstate;

        case SET_CURRENT_DAY:
            newstate.currentDay = action.currentDay;
            return newstate;

        case SET_HOTEL:
            if (!state.days[action.dayNum]) {
                state.days[action.dayNum] = { id: action.dayNum }
            }
            state.days[action.dayNum].hotel = action.hotel;
            return state;

        default:
            return state;
    }
};