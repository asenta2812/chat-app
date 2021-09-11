import React from 'react';
import { toast } from 'react-toastify';
import ErrorLanguage from '../constants/error/content';
import store from '../stores/index';

export const showError = (...key) => {
    toast.error(getContentMessage(key));
};
export const showWarning = (...key) => {
    toast.warning(getContentMessage(key));
};
export const showInfo = (...key) => {
    toast.info(getContentMessage(key));
};

export const showSuccess = (...key) => {
    toast.success(getContentMessage(key));
};
export const getErrorFeedback = (feedback) => {
    if (
        (feedback.ModelState != null && feedback.ModelState.length !== 0) ||
        feedback.Message != null
    ) {
        toast.error(getContentMessage(feedback.ModelState));
    }
};

const getContentMessage = (key) => {
    const text = getListMessage();
    if (key.length > 1) {
        let textShow = '';
        key.map((item) => (textShow += `${text[item] || item}</br>`));
        return <p dangerouslySetInnerHTML={{ __html: textShow }}></p>;
    }
    return text[key[0]] || key[0];
};

const getListMessage = () => {
    const languageId = store.getState().languageId;
    return ErrorLanguage.find((x) => x.key === languageId).text;
};
