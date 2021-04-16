import axios from "axios";

export const regUser = (data) => {
    axios.post('/auth/registr', data).then(response => console.log(response.data));
};
export const signUser = (password,email) => {
    return axios.post('/auth/login', {password, email}).then(respponse => {
        localStorage.setItem('token',respponse.data.tokens.accessToken)
        localStorage.setItem('refreshToken',respponse.data.tokens.refreshToken)
        return respponse.data.user
    });
};
export const authUser = () => {

};