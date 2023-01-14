package com.github.nickklock.backend.services;

import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class ImageService {

    public String encodeImageToBase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }
}
