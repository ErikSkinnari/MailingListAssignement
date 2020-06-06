// eslint-disable-next-line no-unused-vars
import axios from 'axios';

const state = {
    userInfoData: {
        id: '',
        username: '',
        email: '',
        isSubscribed: ''
    },
    message: ''
};
const getters = {
    userData: (state) => state.userInfoData
};
const actions = {

    async fetchUserData({ commit }, id) {
        const response = await axios.get('http://127.0.0.1:5000/api/users/' + id);

        commit('setUserData', response.data);
    },
    
    async subscriptionHandler({commit}, id) {

        await axios.put('http://127.0.0.1:5000/api/users/subscribe',{
            id: id,
            bool: !state.userInfoData.isSubscribed
        });
        commit('changeSubscription', !state.userInfoData.isSubscribed);
    }
};
const mutations = {
    setUserData: (state, userData) => {
        state.userInfoData.id = userData._id,
        state.userInfoData.username = userData.username,
        state.userInfoData.email = userData.email,
        state.userInfoData.isSubscribed = userData.wantNewsMail
    },
    changeSubscription: (state, status) => {
        state.userInfoData.isSubscribed = status;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};