import {callAPI} from "./axios.instance";

const PROFILE_API_BASE = {
    GET_PROFILE: '/v1/Profile',
    UPDATE_PROFILE: '/v1/Profile',
    CHANGE_PASSWORD: '/v1/Profile/ChangePassword',
    GET_CHARACTERISTICS: '/v1/Profile/Characteristics',
    UPDATE_CHARACTERISTICS: '/v1/Profile/Characteristics',
    ADD_CHARACTERISTICS: '/v1/Profile/Characteristics',
};

const convertSexFieldToNumber = (sex) => {
    switch (sex) {
        case 'Male':
            return 0;
        case 'Female':
            return 1;
        case 'Other':
            return 3;
        default:
            return 3;
    }
}

export const profileApi = {
    getProfile: async () => callAPI('GET', PROFILE_API_BASE.GET_PROFILE),
    updateProfile: async (profileData) => {
        const dataToSend = {
            ...profileData,
            sex: convertSexFieldToNumber(profileData.sex)
        };
        return callAPI('PUT', PROFILE_API_BASE.UPDATE_PROFILE, dataToSend);
    },
    changePassword: async (passwordData) => callAPI('POST', PROFILE_API_BASE.CHANGE_PASSWORD, passwordData),
    getCharacteristics: async () => callAPI('GET', PROFILE_API_BASE.GET_CHARACTERISTICS),
    updateCharacteristics: async (characteristicsData) => callAPI('PUT', PROFILE_API_BASE.UPDATE_CHARACTERISTICS, characteristicsData),
    addCharacteristics: async (characteristicsData) => callAPI('POST', PROFILE_API_BASE.ADD_CHARACTERISTICS, characteristicsData),
}