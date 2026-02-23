package com.skillforge.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    // 🔥 DASHBOARD API
    @GetMapping("/dashboard")
    public Map<String, Object> getStudentDashboard() {

        Map<String, Object> data = new HashMap<>();
        data.put("testsCompleted", 5);
        data.put("averageScore", 82);
        data.put("learningTime", "12h");
        data.put("topicsMastered", 8);

        return data;
    }
}