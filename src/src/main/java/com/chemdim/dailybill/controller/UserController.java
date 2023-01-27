package com.chemdim.dailybill.controller;

import com.chemdim.dailybill.entity.User;
import com.chemdim.dailybill.service.UserService;
import com.chemdim.dailybill.uitls.ResponseBody;
import com.chemdim.dailybill.uitls.ResponseMessage;
import com.chemdim.dailybill.uitls.ResponseStatus;
import com.chemdim.dailybill.uitls.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    ResponseBody<?> login(@RequestBody User loginUser, HttpServletRequest request) {
        int status = 0;
        String message = "";
        User user = userService.login(loginUser);
        if(user != null) {
            HttpSession session = request.getSession();
            session.setAttribute(SessionUtil.USER_SESSION_KEY, user);
            status = ResponseStatus.VALID_LOGIN;
            message = ResponseMessage.VALID_LOGIN;
        } else {
            status = ResponseStatus.INVALID_LOGIN;
            message = ResponseMessage.INVALID_LOGIN;
        }
        return new ResponseBody<>(status, message, null);
    }
    @GetMapping("/logout")
    ResponseBody<?> logout(HttpServletRequest request) {
        int status = 0;
        String message = "";
        User sessionUser = SessionUtil.getUserBySession(request);
        if(sessionUser != null) {
            status = ResponseStatus.VALID_LOGOUT;
            message = ResponseMessage.VALID_LOGOUT;
            SessionUtil.removeUserBySession(request);
        } else {
            status = ResponseStatus.INVALID_NONEXISTENT_USER;
            message = ResponseMessage.INVALID_NONEXISTENT_USER;
        }
        return new ResponseBody<>(status, message, null);
    }
    @GetMapping("/home")
    ResponseBody<User> home(HttpServletRequest request) {
        int status = 0;
        String message = "";
        User sessionUser = SessionUtil.getUserBySession(request);
        User user = null;
        if(sessionUser != null) {
            user = userService.home(sessionUser.getUserid());
            if(user != null) {
                status = ResponseStatus.VALID_GET_USER_INFO;
                message = ResponseMessage.VALID_GET_USER_INFO;
            } else {
                status = ResponseStatus.INVALID_NONEXISTENT_USER;
                message = ResponseMessage.INVALID_NONEXISTENT_USER;
            }
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, user);
    }
    @GetMapping("/userlist")
    ResponseBody<List<User>> userlist(@RequestParam String username, HttpServletRequest request) {
        int status = 0;
        String message = "";
        User sessionUser = SessionUtil.getUserBySession(request);
        List<User> userList = null;
        if(sessionUser == null) {
            userList = userService.getUserList(username);
            status = ResponseStatus.VALID_GET_USER_LIST;
            message = ResponseMessage.VALID_GET_USER_LIST;
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, userList);
    }
    @PostMapping("/modifdy/user/state")
    ResponseBody<?> modifyUserState(@RequestBody Integer userid) {
        int status = 0;
        String message = "";
        return new ResponseBody<>(status, message, null);
    }
    @PostMapping("/add/user")
    ResponseBody<Integer> addUser(@RequestBody User newUser) {
        int status = 0;
        String message = "";
        int ret = userService.addUser(newUser);
        return new ResponseBody<>(status, message, 0);
    }
    @PostMapping("/modify/user/info")
    ResponseBody<?> modifyUserInfo(@RequestBody User user) {
        int status = 0;
        String message = "";
        return new ResponseBody<>(status, message, null);
    }
}
