import { SET_HOTEL } from '../Constants';

const initialState = {
    days: [
        { id: 0 },
        { id: 1 }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {

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