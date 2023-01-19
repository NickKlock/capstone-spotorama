package com.github.nickklock.backend.annotations.password;

import com.github.nickklock.backend.models.user.UserRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ValidationTests {

    private static Validator validator;

    @BeforeAll
    public static void setUp() {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
        }
    }

    @Test
    void test_valid_password_valid_email() {
        UserRequest userRequest = new UserRequest("a@a.de", "123Aa!", null, null);
        Set<ConstraintViolation<UserRequest>> constraintViolations = validator.validate(userRequest);
        assertEquals(0, constraintViolations.size());
    }

    @Test
    void test_invalid_password_invalid_email() {
        UserRequest userRequest = new UserRequest("a", "123", null, null);
        Set<ConstraintViolation<UserRequest>> constraintViolations = validator.validate(userRequest);
        assertEquals(2, constraintViolations.size());
    }

    @Test
    void test_valid_password_invalid_email() {
        UserRequest userRequest = new UserRequest("aa.de", "123Aa!", null, null);
        Set<ConstraintViolation<UserRequest>> constraintViolations = validator.validate(userRequest);
        assertEquals(1, constraintViolations.size());
    }

    @Test
    void test_invalid_password_valid_email() {
        UserRequest userRequest = new UserRequest("a@a.de", "123Aa", null, null);
        Set<ConstraintViolation<UserRequest>> constraintViolations = validator.validate(userRequest);
        assertEquals(1, constraintViolations.size());
    }


}