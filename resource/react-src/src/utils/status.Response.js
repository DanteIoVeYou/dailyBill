class ResponseStatus { }

ResponseStatus.INVALID_LOGIN = -1;
ResponseStatus.INVALID_SESSION_EXPIRED = -2;
ResponseStatus.INVALID_INSUFFICIENT_PERMISSION = -3;
ResponseStatus.INVALID_ILLEGAL_USER_STATUS = -4;
ResponseStatus.INVALID_NONEXISTENT_USER = -5;
ResponseStatus.INVALID_SESSION_AND_IS_NOT_ADMIN = -6;
ResponseStatus.INVALID_USERNAME_USED = -7;
ResponseStatus.INVALID_MODIFY_USER_INFO_FAILED = -8;
ResponseStatus.VALID_LOGIN = 1;
ResponseStatus.VALID_LOGOUT = 2;
ResponseStatus.VALID_GET_USER_INFO = 3;
ResponseStatus.VALID_SESSION_AND_IS_ADMIN = 3;
ResponseStatus.VALID_MODIFY_USER_INFO = 4;
ResponseStatus.VALID_GET_USER_LIST = 5;

export default ResponseStatus;