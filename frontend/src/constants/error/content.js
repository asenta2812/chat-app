import KeyMessage from './key-message';

const ErrorLanguage = [
    {
        key: 'vi',
        text: {
            errorCode400: 'Tên người dùng và mật khẩu không hợp lệ.',
            errorCode401:
                'Đã cố thực hiện thao tác trái phép trên chức năng này',
            errorCode403:
                '403: Xin lỗi, thông tin đăng nhập của bạn đã hết hạn',
            errorCode404:
                '404: Xin lỗi nhưng chúng tôi không thể tìm thấy trang này',
            errorCode500:
                'Đã cố thực hiện thao tác trái phép trên chức năng này.',
            errorUnexpected:
                'Một ngoại lệ không mong muốn đã xảy ra trong mã, vui lòng liên hệ với quản trị viên hệ thống của bạn và chuyển thông tin có trong thông báo này.',
            errorServer: 'Lỗi máy chủ',
            selectPackageType: 'Hãy chọn cước phí',
            errorTitle: 'Lỗi',
            successTitle: 'Thành công',
            infoTitle: 'Thông tin',
            warningTitle: 'Cảnh báo',
            nameRequired: 'Vui lòng nhập vào Họ và Tên',
            usernameRequired: '',
        },
    },
    {
        key: 'en',
        text: {
            errorCode400: 'User name and password are invalid.',
            errorCode401:
                'Attempted to perform an unauthorized operation on this function',
            errorCode403: '403: Sorry your login had expired',
            errorCode404: "404: Sorry but we couldn't find this page",
            errorCode500:
                'Attempted to perform an unauthorized operation on this function.',
            errorUnexpected:
                'An unexpected exception has occurred in the code, please contact your system administrator and pass on the information contained within this message.',
            errorServer: 'Server error',
            selectPackageType: 'Please select package',
            errorTitle: 'Error',
            successTitle: 'Success',
            infoTitle: 'Info',
            warningTitle: 'Warning',
            nameRequired: 'Name is required',
            [KeyMessage.UserNameRequired]: 'Username is required',
            [KeyMessage.PasswordRequired]: 'Password is required',
            [KeyMessage.UserNameUnique]: 'Username already exists',
            [KeyMessage.UserNotExists]: 'User does not exist',
            [KeyMessage.UserNameOrPasswordInvalid]:
                'Invalid username or password',
            [KeyMessage.ConfirmPasswordNotMatch]:
                'Confirm password does not match',
        },
    },
];
export default ErrorLanguage;
