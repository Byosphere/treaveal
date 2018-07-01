import { combineReducers } from 'redux';
import travel from './travel';
import days from './days';
import login from './login';

export default combineReducers({
    travel,
    days,
    login
});