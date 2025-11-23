import { callAPI } from "./axios.instance";

const FEEDBACK_API_ROUTES = {
    GET_FEEDBACKS: '/AppFeedback',
    ADD_FEEDBACK: '/Feedback'
};

export const feedbackApi = {
    getFeedbacks: async (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const url = queryParams ? `${FEEDBACK_API_ROUTES.GET_FEEDBACKS}?${queryParams}` : FEEDBACK_API_ROUTES.GET_FEEDBACKS;
        return callAPI('GET', url);
    }
}