import { AsyncStorage } from 'react-native';


const SCHOOL_CODE = 'school_code';
const ORGANIZATION_ID = 'organization_id';
const IS_LOGIN = 'is_login';
const FCM_TOKEN = 'fcm_Token';
const ORGANIZATION_DATA = "organization_data";
const LOGIN_RESPONSE = "Login_response";

export default class AsyncSetting {

    static async getValue(key: string) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            return null;
        }
    }

    static async getBoolean(key: string) {
        const value = await this.getValue(key);
        if (value) {
            console.log('get guest', value)
            return Boolean(value);
        }
        return false;
    }

    static async setValue(key: string, value: *) {
        await AsyncStorage.setItem(key, `${value}`);
        //  console.log('value for set',val)
        return value;
    }


    static async getuthenticationUserFlag() {
        return this.getBoolean('isAuthenticateUser');
    }
    static setAuthenticationUserFlag(flag) {
        return this.setValue('isAuthenticateUser', flag);
    }

    static setSchoolCode(id) {
        return this.setValue(SCHOOL_CODE, id);
    }

    static async getSchoolCode() {
        return this.getValue(SCHOOL_CODE);

    }
    static setOrganizationId(id) {
        return this.setValue(ORGANIZATION_ID, id);
    }

    static async getOrganizationId() {
        return this.getValue(ORGANIZATION_ID);

    }
    static setIsLogin(isLogin) {
        return this.setValue(IS_LOGIN, isLogin);
    }

    static async getIsLogin() {
        return this.getValue(IS_LOGIN);

    }

    static setFcmToken(fcmToken) {
        console.log("setFcmToken", fcmToken)
        return this.setValue(FCM_TOKEN, JSON.stringify(fcmToken));
    }

    static async getFcmToken() {

        return this.getValue(FCM_TOKEN);

    }

    static setOrganizationData(orgData) {
        return this.setValue(ORGANIZATION_DATA, orgData);
    }

    static async getOrganizationData() {

        return this.getValue(ORGANIZATION_DATA);

    }

    static setLoginData(loginRes) {

        return this.setValue(LOGIN_RESPONSE, JSON.stringify(loginRes));
    }

    static async getLoginData() {

        return this.getValue(LOGIN_RESPONSE);

    }

    static async clearPref() {
        await AsyncStorage.clear();
    }
}
