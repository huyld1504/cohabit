import {callAPI} from "./axios.instance.js";

const CHARACTERISTIC_API_BASE = {
    GET_ALL: '/Characteristic'
};

export const characteristicApi = {
    getAllCharacteristics: async () => callAPI('GET', CHARACTERISTIC_API_BASE.GET_ALL)
};