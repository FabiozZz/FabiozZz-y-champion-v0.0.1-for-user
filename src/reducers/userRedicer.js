const type = require('../utils/constants');
const initialState = {
    currentUser:{},
    isAuth: false,
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.LOG_IN:
            return {
                ...state,
                currentUser: {...action.user},
                isAuth: true
            }
        case type.LOG_OUT:
            return {
                currentUser: {},
                isAuth: false,
                token: null
            };

        default:
            return state
    }
};

