import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS,
    HEALTH_AND_SEFATY_SUCCESS,
    CART_SUCCESS,
    WORKOUT_PLAN_SUCCESS,
    DIET_PLAN_SUCCESS
} from '../types';
import { AuthServices, PlanServices, ProfileServices, RegisterUser } from '../../services';
import { Alert, Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { clearAllLocalData, getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import { LOGO, route } from '../../lib/utils/constants';
import moment from 'moment';
import { authActions } from './auth';

const getDietPlan = () => {
    return async (dispatch, store) => {
        let data = { user_id: store().authReducer.userData.user_id }
        PlanServices.getDietPlans(data, store().authReducer.userData.token)
            .then(async (res) => {
                if (res.data.success) {
                    let daysArray = [...res.data.data];
                    daysArray.forEach((item, index) => { daysArray[index] = { ...daysArray[index], expanded: false } })
                    dispatch({ type: DIET_PLAN_SUCCESS, dietPlan: daysArray })
                }
                else {
                    dispatch(handleStartDietPlan());
                }
            })
            .catch((err) => { console.log(err.response); })
    }
};

const handleStartDietPlan = () => {
    return async (dispatch, store) => {
        let data = {
            current_date: moment().format('YYYY-MM-DD'),
            user_id: store().authReducer.userData.user_id
        }
        ProfileServices.updateStartDateUserDiet(data, store().authReducer.userData.token)
            .then(async (res) => {
                let userData = {
                    token: store().authReducer.userData.token,
                    user_id: store().authReducer.userData.user_id
                }
                await dispatch(authActions.getUserProfile(userData));
                dispatch(getDietPlan());
            })
            .catch((err) => console.log(err.response))
    }
}

const getWorkoutPlan = () => {
    return async (dispatch, store) => {
        let data = {
            user_id: store().authReducer.userData.user_id
        }
        PlanServices.getWorkoutPlans(data, store().authReducer.userData.token)
            .then(async (res) => {
                if (res.data.success) {
                    let arr = [...res.data.data];
                    arr.forEach((item, index) => { arr[index] = { ...arr[index], expanded: false } })
                    dispatch({ type: WORKOUT_PLAN_SUCCESS, workoutPlan: arr })
                }
            })
            .catch((err) => { console.log(err.response); })
    }
};

export const planActions = {
    getDietPlan,
    getWorkoutPlan
};