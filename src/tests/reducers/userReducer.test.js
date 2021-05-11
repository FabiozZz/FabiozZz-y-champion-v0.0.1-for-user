import {userReducer} from "../../reducers/userRedicer";
import {userLogIn} from "../../actions/userActions";


describe('Test userReducer', () => {
    let initialState, user;
    beforeEach(() => {
        user = {name: 'fill', surname: 'morris'};
        initialState = {
            currentUser:{},
            isAuth: false,
        }
    });
    test('should log_in', () => {
        let action = userLogIn(user)
        let newState = userReducer(initialState,action);
        expect(newState).toEqual({currentUser: user, isAuth: true})

    });
});