import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store(
{
    state: {

        status: '',
        token: localStorage.getItem('token') || null,
        user: {}
    },
    getters: {

        loggedIn: state => state.token !== null,
        authStatus: state => state.status,
        user: state => state.user,
    },
    mutations: {

        setUserData: (state, userData) => {
            console.log('setuserdata')
            console.log(userData);
            state.user._id = userData._id,
            state.user.username = userData.username,
            state.user.email = userData.email,
            state.user.isSubscribed = userData.isSubscribed
        },

        changeSubscription: (state, status) => {
            console.log(status);
            state.user.isSubscribed = status;
        },

        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, { token, user }) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = null
        }
    },
    actions: {

        async fetchUserData({ commit }, id) {
            const response = await axios.get('http://127.0.0.1:5000/api/users/' + id);
            console.log('commit user data: ');
            commit('setUserData', response.data);
        },

        async subscriptionHandler({ commit }, { id, status}) {
            console.log('Inside subscriptionhandler...');
            await axios.put('http://127.0.0.1:5000/api/users/subscribe', { id: id, bool: status });
            commit('changeSubscription', status);
        },

        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                console.log(user);
                commit('auth_request')
                axios({ url: 'http://127.0.0.1:5000/api/users/login', data: user, method: 'POST' })
                .then(resp => {
                    console.log(resp);
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token

                    console.log(token);
                    console.log('User:')
                    console.log(user);
                    commit('auth_success', { token, user });
                    commit('setUserData', user);
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                console.log(user);
                axios({ url: 'http://127.0.0.1:5000/api/users/register', data: user, method: 'POST' })
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    }
})