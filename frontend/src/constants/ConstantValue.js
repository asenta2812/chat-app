const ConstantValue = {
    // BaseHost: 'https://chat-app-asenta.herokuapp.com/',
    // BaseApiUrl: 'https://chat-app-asenta.herokuapp.com/api/', 
    BaseHost: 'http://localhost:8000/',
    BaseApiUrl: 'http://localhost:8000/api/',
    LanguageKey: {
        Vie: 'vi',
        Eng: 'en',
    },
    AccessTokenStorageKey: 'chat-app-access-token',
    Sound: {
        Message: 'message',
        NewUser: 'new-user',
    },
};

export default ConstantValue;

export const AsyncActionStatus = {
    STARTED: 'STARTED',
    SUCCEEDED: 'SUCCEEDED',
    FAILED: 'FAILED',
};
