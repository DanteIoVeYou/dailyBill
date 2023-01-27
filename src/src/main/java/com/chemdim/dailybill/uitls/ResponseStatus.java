package com.chemdim.dailybill.uitls;

public class ResponseStatus {
    /**
     * invalid status
     */
    public static final Integer INVALID_LOGIN = -1;
    public static final Integer INVALID_SESSION_EXPIRED = -2;
    public static final Integer INVALID_INSUFFICIENT_PERMISSION = -3;
    public static final Integer INVALID_ILLEGAL_USER_STATUS = -4;
    public static final Integer INVALID_NONEXISTENT_USER = -5;
    public static final Integer INVALID_SESSION_AND_IS_NOT_ADMIN = -6;
    public static final Integer INVALID_USERNAME_USED = -7;
    public static final Integer INVALID_MODIFY_USER_INFO_FAILED = -8;
    /**
     * valid status
     */
    public static final Integer VALID_LOGIN = 1;
    public static final Integer VALID_LOGOUT = 2;
    public static final Integer VALID_GET_USER_INFO = 3;
    public static final Integer VALID_SESSION_AND_IS_ADMIN = 3;
    public static final Integer VALID_MODIFY_USER_INFO = 4;
    public static final Integer VALID_GET_USER_LIST = 5;
}
