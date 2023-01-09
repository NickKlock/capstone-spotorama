package com.github.nickklock.backend.utils;

import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserSpot;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    public UserSpot fromUser(User user) {
        return new UserSpot(user.id(), user.username(), user.author());
    }
}
