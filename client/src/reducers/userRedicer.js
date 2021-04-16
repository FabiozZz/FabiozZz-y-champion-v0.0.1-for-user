const LOG_OUT = 'LOG_OUT';
const LOG_IN = 'LOG_IN';
const initialState = {
    currentUser:{},
    isAuth: false,
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                currentUser: {...action.user},
                isAuth: true
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
};

export const userLogIn = (user) => ({type: LOG_IN,user});
export const userLogOut = () => ({type: LOG_OUT});