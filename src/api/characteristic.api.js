import {callAPI} from "./axios.instance.js";

const CHARACTERISTIC_API_BASE = {
    GET_ALL: '/v1/Characteristic'
};

export const characteristicApi = {
    getAllCharacteristics: async () => callAPI('GET', CHARACTERISTIC_API_BASE.GET_ALL)
};