package com.chemdim.dailybill.uitls;

import com.chemdim.dailybill.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
    public static final String USER_SESSION_KEY = "user";

    public static User getUserBySession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        User user = null;
        if(session != null && session.getAttribute(USER_SESSION_KEY) != null) {
            user = (User) session.getAttribute(USER_SESSION_KEY);
        }
        return user;
    }

    public static void removeUserBySession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        session.removeAttribute(USER_SESSION_KEY);
    }
}
