import { SET_TRAVEL_INFO, SET_NOTES, DELETE_TRAVEL } from '../Constants';

const initialState = {
    init: false,
    notes: "",
    title: "",
    location: "",
    updatedDate: null,
    departureDate: null,
};

export default (state = initialState, action) => {
    var newstate = Object.assign({}, state);
    switch (action.type) {

        case SET_TRAVEL_INFO:
            newstate.init = true;
            newstate.location = action.location || state.location;
            newstate.title = action.title || state.title;
            newstate.departureDate = action.departureDate || state.departureDate;
            newstate.updatedDate = action.updatedDate;
            return newstate;

        case SET_NOTES:
            newstate.notes = action.notes;
            newstate.updatedDate = action.updatedDate;
            return newstate;

        case DELETE_TRAVEL:
            return initialState;

        default:
            return state;
    }
};