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

    private static final String timeStampString = "timestamp";
    private static final String messageString = "message";
    private static final String errorString = "error";

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(UserNotFoundException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(timeStampString, LocalDateTime.now());
        responseBody.put(messageString, "User not found");
        responseBody.put(errorString, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoSuchSpotException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(NoSuchSpotException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(timeStampString, LocalDateTime.now());
        responseBody.put(messageString, "The requested Spot does not exist");
        responseBody.put(errorString, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotTheRequestedUserException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(NotTheRequestedUserException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(timeStampString, LocalDateTime.now());
        responseBody.put(messageString, "Permission problem");
        responseBody.put(errorString, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception e) {
        Map<String, Object> responseBody = new LinkedHashMap<>();

        responseBody.put(timeStampString, LocalDateTime.now());
        responseBody.put(messageString, "Sorry! The request could be handled!");
        responseBody.put(errorString, e.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }


}
