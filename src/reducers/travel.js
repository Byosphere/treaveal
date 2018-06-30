import { SET_TRAVEL_INFO, SET_HOTEL, SET_DAY, SET_CURRENT_DAY } from '../Constants';

const initialState = {
    notes: "",
    title: "",
    location: "",
    daysNum: 0,
    currentDay: 0
};

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_TRAVEL_INFO:
            return {
                notes: action.notes || state.notes,
                location: action.location || state.location,
                title: action.title || state.title,
                daysNum: action.daysNum || state.daysNum,
                currentDay: action.currentDay || state.currentDay
            };

        // case SET_DAY:
        //     if (action.num) {
        //         state.days[action.num] = action.day
        //     } else {
        //         state.days.push(action.day)
        //     }
        //     return state;

        default:
            return state;
    }
};