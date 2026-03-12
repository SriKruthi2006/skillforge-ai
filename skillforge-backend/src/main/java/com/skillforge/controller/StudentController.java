package com.skillforge.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.entity.User;
import com.skillforge.repository.LessonRepository;
import com.skillforge.repository.ProgressRepository;
import com.skillforge.repository.UserRepository;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @GetMapping("/dashboard/{studentId}")
    public Map<String, Object> getStudentDashboard(@PathVariable Long studentId) {

        Map<String, Object> data = new HashMap<>();

        // 🔎 Fetch user from database
        User user = userRepository.findById(studentId).orElse(null);

        // DEBUG: check what is returned
        System.out.println("User from DB: " + user);

        String name = "Student";
        if (user != null) {
            name = user.getName();
        }

        // Completed lessons
        int completedLessons =
                progressRepository.countByStudentIdAndCompletedTrue(studentId);

        // Total lessons
        int totalLessons = (int) lessonRepository.count();

        int progress = 0;
        if (totalLessons > 0) {
            progress = (completedLessons * 100) / totalLessons;
        }

        data.put("name", name);
        data.put("completedLessons", completedLessons);
        data.put("totalLessons", totalLessons);
        data.put("progress", progress);

        return data;
    }
}