package com.github.nickklock.backend.services;

import com.github.nickklock.backend.exceptions.NotTheRequestedUserException;
import com.github.nickklock.backend.exceptions.UserNotFoundException;
import com.github.nickklock.backend.models.user.Author;
import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserRequest;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepo userRepo = mock(UserRepo.class);
    private final IdService idService = mock(IdService.class);
    private final Authentication authentication = mock(Authentication.class);
    private final SecurityContext securityContext = mock(SecurityContext.class);
    private final HttpSession httpSession = mock(HttpSession.class);
    private final ImageService imageService = mock(ImageService.class);
    private final UserService userService = new UserService(userRepo, idService, imageService);


    @Test
    void createNewUser_expect_expected_user() throws IOException {
        UserRequest givenUserRequest = new UserRequest("nick", "123",
                new Author("admin", "nick", "klockgether", List.of()), null);

        UserSpot expectedUserSpot = new UserSpot("0", givenUserRequest.username(), givenUserRequest.author(), null);

        when(idService.generateId()).thenReturn("0");

        when(userRepo.save(any()))
                .thenReturn(new User("0", givenUserRequest.username(), givenUserRequest.password(), givenUserRequest.author(), null));


        UserSpot result = userService.createNewUser(givenUserRequest, null);

        assertEquals("0", result.id());
        assertEquals(expectedUserSpot, result);
    }

    @Test
    void loadUserByUsername_expect_MyUsernameNotFoundException() {
        when(userRepo.findByUsername("nick")).thenThrow(new UserNotFoundException());

        assertThrows(UserNotFoundException.class, () -> userRepo.findByUsername("nick"));
    }

    @Test
    void getUserSpotBySecurityContext_expect_anonymousUser_username() {
        when(authentication.getName()).thenReturn("");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userRepo.findByUsername("nick")).thenReturn(Optional.empty());
        UserSpot result = userService.getUserSpotBySecurityContext();
        assertEquals("anonymousUser", result.username());
    }

    @Test
    void getUserSpotBySecurityContext_expect_nick_username() {
        when(authentication.getName()).thenReturn("nick");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userRepo.findByUsername("nick")).thenReturn(Optional.of(
                new User("0", "nick", "123",
                        new Author("nick", "", "", Collections.emptyList()), "")));

        UserSpot result = userService.getUserSpotBySecurityContext();
        assertEquals("nick", result.username());
    }

    @Test
    void updateUser_expect_MyUsernameNotFoundException() {
        UserRequest givenUserRequest = new UserRequest("", "", null, null);
        assertThrows(UserNotFoundException.class, () ->
                userService.updateUser("0", givenUserRequest, null));
    }

    @Test
    void updateUser_expect_userSpot() throws IOException {
        Author givenAuthor = new Author("nick", "nick", "", Collections.emptyList());
        UserRequest givenUserRequest = new UserRequest("nick", "1",
                givenAuthor, null);

        User givenUser = new User("0", "nick", "123",
                givenAuthor, "");

        UserSpot expectedResult = new UserSpot("0", "nick", givenAuthor, "");

        when(userRepo.findById("0")).thenReturn(Optional.of(
                givenUser));
        when(userRepo.save(any())).thenReturn(givenUser);


        UserSpot result = userService.updateUser("0", givenUserRequest, null);
        assertEquals(expectedResult, result);
    }

    @Test
    void deleteUser_expect_MyUsernameNotFoundException() {
        when(authentication.getName()).thenReturn("nick");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        assertThrows(UserNotFoundException.class, () ->
                userService.deleteUser("", httpSession));
    }

    @Test
    void deleteUser_expect_NotTheRequestedUserException() {
        Author givenAuthor = new Author("nick", "nick", "", Collections.emptyList());
        User givenUser = new User("0", "nick", "123",
                givenAuthor, "");

        when(authentication.getName()).thenReturn("nick");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepo.findByUsername("nick")).thenReturn(Optional.of(givenUser));

        assertThrows(NotTheRequestedUserException.class, () -> userService.deleteUser("1", httpSession));
    }

    @Test
    void deleteUser_expect_proper_response() {
        Author givenAuthor = new Author("nick", "nick", "", Collections.emptyList());
        User user = new User("nick", "user", "password", givenAuthor, "");
        userRepo.save(user);

        when(authentication.getName()).thenReturn("nick");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userRepo.findByUsername(any())).thenReturn(Optional.of(user));

        UserSpot result = userService.deleteUser(user.id(), httpSession);
        verify(httpSession).invalidate();
        verify(securityContext).setAuthentication(null);

        assertEquals("anonymousUser", result.username());

    }
}