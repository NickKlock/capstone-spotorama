package com.github.nickklock.backend.services;

import com.github.nickklock.backend.exceptions.MyUsernameNotFoundException;
import com.github.nickklock.backend.models.user.Author;
import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserAuth;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    private final UserRepo userRepo = mock(UserRepo.class);
    private final IdService idService = mock(IdService.class);
    private final UserService userService = new UserService(userRepo, idService);

    @Test
    void createNewUser_expect_expected_user() {
        UserAuth givenUserAuth = new UserAuth("nick", "123",
                new Author("admin", "nick", "klockgether", List.of()));

        UserSpot expectedUserSpot = new UserSpot("0", givenUserAuth.username(), givenUserAuth.author());

        when(idService.generateId()).thenReturn("0");

        when(userRepo.save(any()))
                .thenReturn(new User("0", givenUserAuth.username(), givenUserAuth.password(), givenUserAuth.author()));

        UserSpot result = userService.createNewUser(givenUserAuth);

        assertEquals("0", result.id());
        assertEquals(expectedUserSpot, result);
    }

    @Test
    void loadUserByUsername_expect_MyUsernameNotFoundException() {
        when(userRepo.findByUsername("nick")).thenThrow(new MyUsernameNotFoundException());

        assertThrows(MyUsernameNotFoundException.class, () -> userRepo.findByUsername("nick"));
    }

}