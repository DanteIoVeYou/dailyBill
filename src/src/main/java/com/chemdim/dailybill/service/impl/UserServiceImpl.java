package com.chemdim.dailybill.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.chemdim.dailybill.entity.User;
import com.chemdim.dailybill.mapper.UserMapper;
import com.chemdim.dailybill.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(User loginUser) {
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("username", loginUser.getUsername());
        wrapper.eq("password", loginUser.getPassword());
        return userMapper.selectOne(wrapper);
    }

    @Override
    public int addUser(User newUser) {
        return userMapper.insert(newUser);
    }

    @Override
    public User home(Integer userid) {
        return userMapper.selectById(userid);
    }

    @Override
    public List<User> getUserList(String username) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.like(StringUtils.isNotBlank(username), "username", username);
        return userMapper.selectList(queryWrapper);
    }

    @Override
    public int updateUserInfo(User user) {
        return userMapper.updateById(user);
    }

    @Override
    public User findUserById(Integer userid) {
        return userMapper.selectById(userid);
    }


}
