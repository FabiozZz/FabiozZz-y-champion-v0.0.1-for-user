import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios,{delayResponse:4000});

const user = {
    surName:'Mr.',
    name:'FabiozZz',
    patronymic:'Loucoster',
    birthDay: '20/10/1989',
    phone: '+79996569772',
    email: 'fabiozzz.dev@gmail.com',
}
const users=[
    {
        surName:'Mr.',
        name:'FabiozZz',
        patronymic:'Loucoster',
        birthDay: '20/10/1989',
        phone: '+79996569772',
        email: 'fabiozzz.dev@gmail.com',
    },
    {
        surName:'Mr.',
        name:'FabiozZz',
        patronymic:'Loucoster',
        birthDay: '20/10/1989',
        phone: '+79996569772',
        email: 'fabiozzz.dev@gmail.com',
    },
    {
        surName:'Mr.',
        name:'FabiozZz',
        patronymic:'Loucoster',
        birthDay: '20/10/1989',
        phone: '+79996569772',
        email: 'fabiozzz.dev@gmail.com',
    },
    {
        surName:'Mr.',
        name:'FabiozZz',
        patronymic:'Loucoster',
        birthDay: '20/10/1989',
        phone: '+79996569772',
        email: 'fabiozzz.dev@gmail.com',
    },
]
mock.onPost('/auth/login').reply(200, {user,accessToken: 'TOKEN_ACC',refreshToken:'TOKEN_REF'});
mock.onPost('/auth/register').reply(200, {success: 'Ok'});

mock.onPost('/auth/refresh').reply(200,{user,accessToken: 'TOKEN_ACC2',refreshToken:'TOKEN_REs2'});

mock.onGet('/users').reply(200, {users});
mock.resetHistory();

/**
 * response на логин token & refreshToken
 */

class Api {

    constructor(options = {}) {
        this.client = options.client || axios.create();
        this.token = '';
        this.refreshToken = '';

        this.refreshRequest = null;

        this.client.interceptors.request.use(
            config => {
                if (!this.token) {
                    return config;
                }
                const newConfig = {
                    ...config,
                };
                newConfig.headers.Authorization = `Bearer ${this.token}`;
                return newConfig;
            },
            e => Promise.reject(e)
        );

        this.client.interceptors.response.use(
            r => r,
            async error => {
                this.refreshToken = localStorage.getItem('refresh_token')
                if (
                    !this.token ||
                    error.response.status !== 401 ||
                    error.config.retry
                ) {
                    await Promise.reject(error);
                }

                if (!this.refreshRequest) {
                    this.refreshRequest = this.client.post("/auth/refresh", {
                        refreshToken: this.refreshToken,
                    });
                    console.log(this.refreshRequest)
                }
                const { data } = await this.refreshRequest;
                this.token = data.accessToken;
                localStorage.setItem('refresh_token',data.refreshToken)
                this.refreshToken = data.refreshToken;
                const newRequest = {
                    ...error.config,
                    retry: true,
                };

                return this.client(newRequest);
            }
        )
    }

    setToken(some) {
        this.token = some;
    }

    getToken() {
        return this.token;
    }

    async login({ login, password }) {
        const res = await this.client.post("/auth/login", {
            login,
            password
        }).then(r => r).catch(er => Promise.reject(er));
        console.log('вызван логин ')
        this.setToken(await res.data.accessToken);
        console.log('после логина получен токен', this.getToken());
        localStorage.setItem('refresh_token',await res.data.refreshToken)
        this.refreshToken = localStorage.getItem('refresh_token');
        return res
    }

    async autoLog() {
        const refToken = localStorage.getItem('refresh_token');
        if (refToken) {
            return await this.client.post('/auth/refresh', {refreshToken: refToken}).then(ref=> {
                this.setToken(ref.data.accessToken);
                localStorage.removeItem('refresh_token');
                localStorage.setItem('refresh_token', ref.data.refreshToken);
                return ref.data.user
            });
        }
    }

    logout() {
        this.token = null;
        this.refreshToken = null;
        localStorage.removeItem('refresh_token')
    }

    async register(data={}) {
        return await this.client.post('/auth/register', data)
    }

    async getUsers() {
        return await this.client.get("/users").then((data) => data)
    }
}

export default new Api();
