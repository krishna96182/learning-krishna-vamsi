// redux/actions/categoryActions.js
import { SET_SELECTED_CATEGORY, SET_SELECTED_SERVICE } from '../actionTypes/categoryActionTypes';

export const setSelectedCategory = (category) => {
    return {
        type: SET_SELECTED_CATEGORY,
        payload: category,
    };
};

export const setSelectedService = (service) => {
    return {
        type: SET_SELECTED_SERVICE,
        payload: service,
    };
};
