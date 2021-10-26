import {
    WORKOUT_PLAN_SUCCESS,
    DIET_PLAN_SUCCESS
} from '../types';

const initialState = {
    workoutPlan: [],
    dietPlan: []
};

const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case WORKOUT_PLAN_SUCCESS:
            console.log(" action.workoutPlan : ", action.workoutPlan)
            return {
                ...state,
                workoutPlan: action.workoutPlan,
            };
        case DIET_PLAN_SUCCESS:
            console.log(" action.dietPlan : ", action.dietPlan)
            return {
                ...state,
                dietPlan: action.dietPlan,
            };
        default:
            return state;
    }
};

export default planReducer;
