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
    APP_INTRO_Button_DESCRIPTION_1: 'I want to sculpt, tone up & improve my health',
    APP_INTRO_Button_DESCRIPTION_2: 'I want to build muscle & get stronger',
    APP_INTRO_Button_DESCRIPTION_3: 'I want to slim down, lose fat & feel better',
    APP_INTRO_Heading_2: "SET YOUR FITNESS LEVEL",
    APP_INTRO_DESCRIPTION_2: "Choose the description that best suits your current fitness level so we can create a personal plan that offers the right challenge for you.",
    APP_INTRO_Heading_3: "SELECT EQUIPMENT'S",
    APP_INTRO_DESCRIPTION_3: "Select the equipment you would like to use in your personal workout program.",
    APP_INTRO_Button_1_3: "Body Weights",
    APP_INTRO_Button_2_3: "Dumbbell",
    APP_INTRO_Button_3_3: "Bands",
    APP_INTRO_Button_4_3: "All Equipment's",
    APP_INTRO_Button_DESCRIPTION_1_3: 'I want to improve my lorem....',
    APP_INTRO_Button_DESCRIPTION_2_3: 'I want to see my original muscles growth',
    APP_INTRO_Button_DESCRIPTION_3_3: 'I want to slim and feel better',
    APP_INTRO_Button_DESCRIPTION_4_3: 'I want to slim and feel better',
    APP_INTRO_Heading_4: "SELECT YOUR GENDER",
    APP_INTRO_DESCRIPTION_4: "Select your gender so that we can lorem ipsum dolor",
    APP_INTRO_Heading_5: "SELECT FOCUS AREAS",
    CREATINGPLAN_HEADING: 'CREATING YOUR PERSONALIZED PLAN',
    CREATINGPLAN_DESCRIPTION: 'Calculating and analyzing your...',
    NEXT: "NEXT",
    POWER_OF_MIND: "Power Of Mind"

};
const Fonts = {
    regular: {
        // fontFamily: 'Anton-Regular'
    }
};

const route = {
    APPINTRO1st: "AppIntro1st",
    APPINTRO2nd: "AppIntro2nd",
    APPINTRO3rd: "AppIntro3rd",
    APPINTRO4th: "AppIntro4th",
    APPINTRO5th: "AppIntro5th",
    CREATINGPLAN: "CreatingPlan",
    AUTH_LOADING: "AuthLoading",
    APPINTRO: "AppIntro",
    MAIN: "Main",
    HOME: 'Home',
    HOMESCREEN: 'HomeScreen',
    DIET: 'Diet',
    PROGRESS: 'Progress',
    SETTING: 'Setting',
    POWER_OF_MIND: "PowerOfMind",
    DAYS_WORLOUT: "DaysWorkout",
    DIETSCREEN: "DietScreen",
    POWEROFMINDAUDIO: "PowerOfMindAudio",
    DAYSWORKOUTVIDEOS: "DaysWorkoutVideos",
    DAYSWORKOUTVIDEOPLAYER:"DayWorkoutVideo"

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