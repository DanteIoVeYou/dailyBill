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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    ResponseBody<?> login(@RequestBody User loginUser, HttpServletRequest request) {
        int status = 0;
        String message = "";
        User user = userService.login(loginUser);
        User userInfo = null;
        if(user != null) {
            if(user.getState() != 1) {
                HttpSession session = request.getSession();
                session.setAttribute(SessionUtil.USER_SESSION_KEY, user);
                status = ResponseStatus.VALID_LOGIN;
                message = ResponseMessage.VALID_LOGIN;
                // update login time
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date date = new Date();
                user.setLastLoginTime(dateFormat.format(date));
                int ret = userService.updateUserInfo(user);
                if(ret == 0) {
                    System.out.println("update login time fail");
                }
                // build return value
                userInfo = new User();
                userInfo.setIsAdmin(user.getIsAdmin());
                userInfo.setCreateTime(user.getCreateTime());
                userInfo.setLastLoginTime(user.getLastLoginTime());
                userInfo.setState(user.getState());
                userInfo.setUserid(user.getUserid());
                userInfo.setUsername(user.getUsername());
            } else {
                status = ResponseStatus.INVALID_ILLEGAL_USER_STATUS;
                message = ResponseMessage.INVALID_ILLEGAL_USER_STATUS;
            }
        } else {
            status = ResponseStatus.INVALID_LOGIN;
            message = ResponseMessage.INVALID_LOGIN;
        }
        return new ResponseBody<>(status, message, userInfo);
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
        if(sessionUser != null) {
            userList = userService.getUserList(username);
            status = ResponseStatus.VALID_GET_USER_LIST;
            message = ResponseMessage.VALID_GET_USER_LIST;
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, userList);
    }
    @PostMapping("/modify/user/state")
    ResponseBody<?> modifyUserState(@RequestBody Integer userid, Integer state) {
        // todo
        int status = 0;
        String message = "";
        return new ResponseBody<>(status, message, null);
    }
    @PostMapping("/add/user")
    ResponseBody<Integer> addUser(@RequestBody User newUser, HttpServletRequest request) {
        System.out.println("add user before");
        int status = 0;
        String message = "";
        User sessionUser = SessionUtil.getUserBySession(request);
        System.out.println(sessionUser == null);
        if(sessionUser != null) {
            System.out.println("add user");
            if(sessionUser.getIsAdmin() == 1) {
                status = ResponseStatus.VALID_SESSION_AND_IS_ADMIN;
                message = ResponseMessage.VALID_SESSION_AND_IS_ADMIN;
                // init newUser's property
                newUser.setIsAdmin(0);
                newUser.setState(0);
                newUser.setRecordCount(0);
                // init time
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date date = new Date();
                newUser.setCreateTime(dateFormat.format(date));
                // add user
                int ret = userService.addUser(newUser);
                if(ret == 0) {
                    System.out.println("add user fail");
                }
            } else {
                status = ResponseStatus.INVALID_SESSION_AND_IS_NOT_ADMIN;
                message = ResponseMessage.INVALID_SESSION_AND_IS_NOT_ADMIN;
            }
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, 0);
    }
    @PostMapping("/modify/user/info")
    ResponseBody<?> modifyUserInfo(@RequestBody User user, HttpServletRequest request) {
        int status = 0;
        String message = "";
        User sessionUser = SessionUtil.getUserBySession(request);
        if(sessionUser != null) {
            if(sessionUser.getIsAdmin() != null) {
                int userid = user.getUserid();
                User fullUser = userService.findUserById(userid);
                if(fullUser != null) {
                    System.out.println(fullUser);
                }
                // update user info
                if(user.getUsername() == null) {
                    user.setUsername(fullUser.getUsername());
                }
                if(user.getPassword() == null) {
                    user.setPassword(fullUser.getPassword());
                }
                if(user.getCreateTime() == null) {
                    user.setCreateTime(fullUser.getCreateTime());
                }
                if(user.getLastLoginTime() == null) {
                    user.setLastLoginTime(fullUser.getLastLoginTime());
                }
                if(user.getRecordCount() == null) {
                    user.setRecordCount(fullUser.getRecordCount());
                }
                if(user.getEmail() == null) {
                    user.setEmail(fullUser.getEmail());
                }
                if(user.getState() == null) {
                    user.setState(fullUser.getState());
                }
                if(user.getIsAdmin() == null) {
                    user.setIsAdmin(fullUser.getIsAdmin());
                }
                // debug
                System.out.println(user);
                // update user info
                int ret = userService.updateUserInfo(user);
                if(ret == 0) {
                    System.out.println("update user info fail");
                }
                status = ResponseStatus.VALID_SESSION_AND_IS_ADMIN;
                message = ResponseMessage.VALID_SESSION_AND_IS_ADMIN;
            } else {
                status = ResponseStatus.INVALID_MODIFY_USER_INFO_FAILED;
                message = ResponseMessage.INVALID_MODIFY_USER_INFO_FAILED;
            }
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, null);
    }
}
