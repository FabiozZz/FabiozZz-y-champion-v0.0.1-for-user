import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios,{delayResponse:2000});

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

mock.onPost('/auth/forget/email').reply(200, {success: 'Ok'});
mock.onPost('/auth/forget/code').reply(200, {success: 'Ok'});
mock.onPost('/auth/forget/refreshPass').reply(200, {success: 'Ok'});

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

    /**
     * Вход в приложение
     * Отправляет данные пользователя {email,password}
     * Получает пару токенов и пользователя
     * @param login
     * @param password
     * @returns {Promise<*>}
     */
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

    /**
     * Автовход
     * После обновления страницы удаляется токен из приложения
     * Используя RefreshToken из localStorage восстанавливает утерянный токен
     * Получает новую пару токенов и пользователя
     * @returns {Promise<AxiosResponse<any>>}
     */
    async autoLog() {
        const refToken = localStorage.getItem('refresh_token');
        if (refToken) {
            return await this.client.post('/auth/refresh', {refreshToken: refToken}).then(ref=> {
                this.setToken(ref.data.accessToken);
                localStorage.setItem('refresh_token', ref.data.refreshToken);
                return ref.data.user
            });
        }
    }

    /**
     * Выход из приложения
     * Удаляются все токены и стирается currentUser из Redux
     */
    logout() {
        this.token = null;
        this.refreshToken = null;
        localStorage.removeItem('refresh_token')
    }

    /**
     * Регистрация пользователя
     * Отправляет данные о пользователе из формы на сервер
     * Получает только статус операции
     * @param data
     * @returns {Promise<AxiosResponse<any>>}
     */
    async register(data={}) {
        return await this.client.post('/auth/register', data)
    }

    /**
     * Временный запрос на получение фиктивных пользователей
     * создавался для проверки наличия в запросе Header:{Authorization: Bearer <someToken>}
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getUsers() {
        return await this.client.get("/users").then((data) => data)
    }

    /**
     * Восстановление пароля
     * Ввод email для отправки письма
     * @param email
     * @returns {Promise<AxiosResponse<any>>}
     */
    async forgetEmail(email) {
        return await  this.client.post('/auth/forget/email',{email})
    }

    /**
     * Восстановление пароля
     * Ввод code полученновго в email
     * @param code
     * @returns {Promise<AxiosResponse<any>>}
     */
    async forgetCode(code) {
        return await  this.client.post('/auth/forget/code',{code})
    }

    /**
     * Восстановление пароля
     * Ввод пары даанных, "пароль" - "потдверждение пароля"
     * @param data
     * @returns {Promise<AxiosResponse<any>>}
     */
    async forgeRefreshPass(data) {
        return await  this.client.post('/auth/forget/refreshPass',data)
    }

    /**
     * Отмена операции запроса для axios
     * @returns {CancelTokenSource}
     */
    abortAxiosCalling(){
        return this.client.CancelToken.source();
    }

}

export default new Api();
