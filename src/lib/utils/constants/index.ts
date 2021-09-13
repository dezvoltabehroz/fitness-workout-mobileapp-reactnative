import { Dimensions } from "react-native";

const LOGO = require('../../../assets/images/logo.png');

const NO_PHOTO = require('../../../assets/images/placeholder_user.png');
const PLACEHOLDER_ORG = require('../../../assets/images/placeholder_org.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const screen = {

    SCREEN_TITLE_ALIGN_CENTER: "center",
    NO_FOUND_MESSAGE: "We couldn't find anything to show for ",
    NO_FOUND_MESSAGE_1: "We couldn't find anything to show you ",
    AGREE_TERM: "I the parent has read and fully understood the Privacy Policy and Terms",
    SEARCHBAR_PLACEHOLDER: "What are you looking for?",
    APP_INTRO_Heading_1: "WHAT IS YOUR FITNESS GOAL?",
    APP_INTRO_Button_1: "Sculpt & Tone",
    APP_INTRO_Button_2: "Muscle Gain",
    APP_INTRO_Button_3: "Fat Loss",
    APP_INTRO_Button_DESCRIPTION_1: 'I want to sculpt my body, tone up & improve my health.',
    APP_INTRO_Button_DESCRIPTION_2: 'I want to build muscle & get stronger',
    APP_INTRO_Button_DESCRIPTION_3: 'I want to slim down, lose fat & feel better',
    APP_INTRO_Heading_2: "SET YOUR FITNESS LEVEL",
    APP_INTRO_DESCRIPTION_2: "Please honestly choose your current fitness level so we can create a personal plan that offers the right amount of challenge for you.",
    APP_INTRO_Heading_3: "SELECT EQUIPMENT",
    APP_INTRO_DESCRIPTION_3: "Select the equipment you would like to use in your personal workout program.",
    APP_INTRO_Button_1_3: "Body Weights",
    APP_INTRO_Button_2_3: "Dumbbell",
    APP_INTRO_Button_3_3: "Bands",
    APP_INTRO_Button_4_3: "Mixed equipment",
    APP_INTRO_Button_DESCRIPTION_1_3: 'No equipment. I want to use bodyweight exercise only in my personal workout program.',
    APP_INTRO_Button_DESCRIPTION_2_3: 'I want to use dumbbells only in my personal workout program.',
    APP_INTRO_Button_DESCRIPTION_3_3: 'I want to use resistance bands only in my personal workout program.',
    APP_INTRO_Button_DESCRIPTION_4_3: 'I want to use a mixture of bodyweight exercise along with dumbbells & resistance bands in my personal workout program.',
    APP_INTRO_Heading_4: "SELECT YOUR GENDER",
    APP_INTRO_DESCRIPTION_4: "Is your gender male or female?",
    APP_INTRO_Heading_5: "SELECT FOCUS AREAS",
    CREATINGPLAN_HEADING: 'CREATING YOUR PERSONALIZED PLAN',
    CREATINGPLAN_DESCRIPTION: 'Your plan gets completed',
    UPDATINGPLAN_HEADING: 'UPDATING YOUR PERSONALIZED PLAN',
    UPDATINGPLAN_DESCRIPTION: 'Your plan gets completed',
    NEXT: "NEXT",
    EDIT: 'EDIT',
    SEEMORE: 'SEE MORE',
    POWER_OF_MIND: "Power Of Mind",
    SETTINGS: "SETTINGS",
    MY_PROFILE: "My Profile",
    EDIT_PROFILE: "Edit Profile",
    PAYMENTMETHOD: "Payment Method",
    DIETPLAN: 'Diet Plan',
    COMPLETEPROFILE: "Complete your profile",
    PROGRESS_PICS: 'Your Progress Pics',


};
const Fonts = {
    regular: {
        // fontFamily: 'Anton-Regular'
    }
};

const route = {
    APPINTRO1st: "AppIntro1st",
    CHANGEPASSWORD:"ChangePassword",
    APPINTROZERO:"AppIntroZero",
    APPINTRO2nd: "AppIntro2nd",
    APPINTRO3rd: "AppIntro3rd",
    APPINTRO4th: "AppIntro4th",
    APPINTRO5th: "AppIntro5th",
    FITNESSGOAL: "FitnessGoal",
    FITNESSLEVEL: "FitnessLevel",
    SELECTEUIPMENT: "SelectEuipment",
    FOCUSAREA: "FocusArea",
    UPDATINGPLAN: "UpdatingPlan",
    CREATINGPLAN: "CreatingPlan",
    AUTH_LOADING: "AuthLoading",
    APPINTRO: "AppIntro",
    MAIN: "Main",
    LOGIN: "Login",
    HOME: 'Home',
    HOMESCREEN: 'HomeScreen',
    DIET: 'Diet',
    PROGRESS: 'Progress',
    PROGRESSSCREEN: "ProgressScreen",
    SETTING: 'Setting',
    SETTINGS: 'Settings',
    POWER_OF_MIND: "PowerOfMind",
    DAYS_WORLOUT: "DaysWorkout",
    DIETSCREEN: "DietScreen",
    POWEROFMINDAUDIO: "PowerOfMindAudio",
    DAYSWORKOUTVIDEOS: "DaysWorkoutVideos",
    DAYSWORKOUTVIDEOPLAYER: "DayWorkoutVideo",
    PROFILE: "Profile",
    PAYMENTMETHOD: "PaymentMethod",
    DIETPLAN: 'DietPlan',
    DIETPLANDETAILS: 'DietPlanDetails',
    COMPLETEPROFILE: "CompleteProfile",
    EDITPROFILE: "EditProfile",
    PROGRESSPICS: "ProgressPics",
    WORKOUTSETTING:"WorkoutSetting"

}
const TOKEN = "token";
const MULTIPART = "multipart";
const EMPTY = "";

export {
    screen,
    route,
    TOKEN,
    EMPTY,
    MULTIPART,
    LOGO,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    NO_PHOTO,
    PLACEHOLDER_ORG,
    Fonts,
}