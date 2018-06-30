import { combineReducers } from 'redux';
import travel from './travel';
import days from './days';

export default combineReducers({
    travel,
    days
});