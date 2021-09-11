import AsyncStorage from "@react-native-community/async-storage";

const LOCAL_STORAGE_KEYS = {
  personalDetails: 'personalDetails',
  userToken: 'userToken',
  fitnessGoal: "fitnessGoal",
  fitnessEquipment: "fitnessEquipment",
  fitnessLevel: "fitnessLevel",
  focusAreaArms: "focusAreaArms",
  focusAreaWaist: "focusAreaWaist",
  focusAreaLegs: "focusAreaLegs",
  focusAreaChest:"focusAreaChest",
  focusAreaBack:"focusAreaBack",
  focusAreaGlutes: "focusAreaGlutes",
  focusAreaShoulder: "focusAreaShoulder",
  gender: "gender",
  user_id: 'user_id',
  appIntro: 'APP_INTRO',
  email: 'email',
  password: 'password',
  remember_me: 'remember_me',
  fcmToken:"fcmToken",
  emailPassword: 'emailPassword',
  dietPlan:"DietPlan",
  DietPreference:"DietPreference"
};

/**
 * Store local data based on key
 * @param key
 * @param value value to be stored
 */
const storeLocalData = (key: string, value: any) => {
  AsyncStorage.setItem(key, value);
};

/**
 * Get local data based on key
 * @param key
 */
const getLocalData = (key: string) => AsyncStorage.getItem(key);

/**
 * Clear all local data
 */
const clearAllLocalData = () => {
  AsyncStorage.clear();
};

/**
 * Clear local data based on key
 * @param key
 */
const clearLocalData = (key: string) => {
  AsyncStorage.removeItem(key);
};

export {
  storeLocalData,
  getLocalData,
  clearAllLocalData,
  clearLocalData,
  LOCAL_STORAGE_KEYS,
};
