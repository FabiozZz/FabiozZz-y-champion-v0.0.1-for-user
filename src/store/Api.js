import axios from 'axios';

export class Api {

    constructor(options = {}) {
        this.client = options.client|| axios.create();
        this.token = options.token ||null
        this.refreshToken = options.refreshToken||null

        this.client.interceptors.request.use(
            config=>{
            if (!this.token) {
                return config;
            }
            const newConfig = {
                header:{},
                ...config,
            }
            newConfig.headers.Authorization = `Bearer ${this.token}`;
            return newConfig;
        },e=>Promise.reject(e));

        this.client.interceptors.request.use(r=>r, async error=> {
            if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
                throw error;
            }
            const {data} = await this.client.post('/auth/refresh', {refreshToken: this.refreshToken});
            this.token = data.token;
            this.refreshToken = data.refreshToken;

            const newRequest={
                ...error.config,
                retry:true
            };
            return this.client(newRequest);
        })
    }

    async login(login,password) {
        const {data} = await this.client.post("/auth/login", {login, password}).then(response=>{
            this.token = response.accessToken;
            this.refreshToken = response.refreshToken;
        });
        return data;
    }

    logout() {
        this.token = null;
        this.refreshToken = null;
    }

    getUsers() {
        return this.client.get('/users').then(({data})=>data)
    }
};