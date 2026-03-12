package com.skillforge.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.LessonDTO;
import com.skillforge.service.LessonService;

@RestController
@RequestMapping("/api/student")
@CrossOrigin("*")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    // return lessons by topic as DTOs
    @GetMapping("/topics/{topicId}/lesson")
    public List<LessonDTO> getLessons(@PathVariable Long topicId) {
        return lessonService.getLessonsByTopic(topicId)
                .stream()
                .map(LessonDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // get single lesson by ID
    @GetMapping("/lessons/{lessonId}")
    public LessonDTO getLesson(@PathVariable Long lessonId) {
        return lessonService.getLessonById(lessonId)
                .map(LessonDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
    }
}