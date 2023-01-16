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
    @ExceptionHandler(MyUsernameNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(MyUsernameNotFoundException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("message", "User not found");
        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoSuchSpotException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(NoSuchSpotException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("message", "The requested Spot does not exist");
        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotTheRequestedUserException.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFoundException(NotTheRequestedUserException e) {

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("message", "Permission problem");
        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException() {
        Map<String, Object> responseBody = new LinkedHashMap<>();

        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("message", "Sorry! The request could be handled!");

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }


}
