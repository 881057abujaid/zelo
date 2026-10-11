import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
    Platform.OS === "web"
        ? "http://localhost:5000/api/v1"
        : "http://10.180.131.207:5000/api/v1";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});