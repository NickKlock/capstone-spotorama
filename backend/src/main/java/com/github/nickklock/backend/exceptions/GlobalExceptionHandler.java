package com.github.nickklock.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String TIMESTAMP = "timestamp";
    private static final String MESSAGE = "message";
    private static final String ERROR = "error";

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(UserNotFoundException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(TIMESTAMP, LocalDateTime.now());
        responseBody.put(MESSAGE, "User not found");
        responseBody.put(ERROR, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoSuchSpotException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(NoSuchSpotException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(TIMESTAMP, LocalDateTime.now());
        responseBody.put(MESSAGE, "The requested Spot does not exist");
        responseBody.put(ERROR, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotTheRequestedUserException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(NotTheRequestedUserException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(TIMESTAMP, LocalDateTime.now());
        responseBody.put(MESSAGE, "Permission problem");
        responseBody.put(ERROR, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception e) {
        Map<String, Object> responseBody = new LinkedHashMap<>();

        responseBody.put(TIMESTAMP, LocalDateTime.now());
        responseBody.put(MESSAGE, "Sorry! The request could be handled!");
        responseBody.put(ERROR, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }


}
