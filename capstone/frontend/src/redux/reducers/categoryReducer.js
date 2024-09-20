// redux/reducers/categoryReducer.js
const initialState = {
    categories: [], // Ensure categories is an empty array initially
    loading: false,
    error: null,
    selectedCategory: null,
    selectedService: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload, // Populate categories when data is fetched
            };
        case 'SET_SELECTED_CATEGORY':
            return {
                ...state,
                selectedCategory: action.payload,
            };
        case 'SET_SELECTED_SERVICE':
            return {
                ...state,
                selectedService: action.payload,
            };
        default:
            return state;
    }
};

export default categoryReducer;
