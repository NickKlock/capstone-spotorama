package com.github.nickklock.backend.annotations.password;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.passay.*;

import java.util.Arrays;
import java.util.Optional;

public class PasswordConstraintsValidator implements ConstraintValidator<ValidPassword, String> {
    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        PasswordValidator passwordValidator = new PasswordValidator(
                Arrays.asList(
                        new LengthRule(6, 12),
                        new CharacterRule(EnglishCharacterData.UpperCase, 1),
                        new CharacterRule(EnglishCharacterData.LowerCase, 1),
                        new CharacterRule(EnglishCharacterData.Digit, 1),
                        new CharacterRule(EnglishCharacterData.Special, 1)
                )
        );
        RuleResult result = passwordValidator.validate(new PasswordData(password));

        if (result.isValid()) {
            return true;
        } else {
            Optional<String> firstInvalidRule = passwordValidator.getMessages(result).stream().findFirst();
            firstInvalidRule.ifPresent(s -> constraintValidatorContext.buildConstraintViolationWithTemplate(s)
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation());
            return false;
        }
    }
}
