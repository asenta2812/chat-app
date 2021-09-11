import validator from 'validator';

function isNullOrEmpty(text) {
    return text === null || text === undefined || text === '';
}

export default {
    isNullOrEmpty,
    ...validator,
};
