package com.github.nickklock.backend.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {

    @Test
    void generateId_expect_not_empty_string() {
        IdService idService = new IdService();

        String result = idService.generateId();

        assertFalse(result.isEmpty());
    }
}