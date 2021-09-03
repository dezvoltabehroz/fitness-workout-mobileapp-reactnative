
import axiosInstance from './Interceptor';
import { apiHeaderConfiguration } from '../lib/utils/global'
import { EMPTY, TOKEN } from '../lib/utils/constants'
const Api = {
    generateUserId: function (token) {
        return axiosInstance.post('registration/generateUserId', {
            fcm_token: token
        }, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    userPrefrences:function(data){
        return axiosInstance.post('registration/updateUserPref', data, apiHeaderConfiguration(EMPTY, EMPTY))
    }
};

export default Api;