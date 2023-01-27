package com.chemdim.dailybill.service;

import com.chemdim.dailybill.entity.User;

import java.util.List;

public interface UserService {

    User login(User loginUser);

    int addUser(User newUser);

    User home(Integer userid);

    List<User> getUserList(String usuername);

}
