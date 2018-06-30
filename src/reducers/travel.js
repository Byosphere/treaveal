import { SET_TRAVEL_INFO, SET_HOTEL, SET_DAY, SET_CURRENT_DAY } from '../Constants';

const initialState = {
    init: false,
    notes: "",
    title: "",
    location: "",
    daysNum: 1,
    currentDay: 1
};

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_TRAVEL_INFO:
            return {
                init: true,
                notes: action.notes || state.notes,
                location: action.location || state.location,
                title: action.title || state.title,
                daysNum: action.daysNum || state.daysNum,
                currentDay: action.currentDay || state.currentDay
            };

        default:
            return state;
    }
};