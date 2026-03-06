package com.skillforge.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.entity.Progress;
import com.skillforge.repository.ProgressRepository;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin
public class ProgressController {

    private final ProgressRepository repo;

    public ProgressController(ProgressRepository repo) {
        this.repo = repo;
    }

    // ✅ Save lesson progress
    @PostMapping
    public Progress saveProgress(@RequestBody Progress progress) {
        return repo.save(progress);
    }

    // ✅ Get completed lessons for a course
    @GetMapping("/{courseId}")
    public List<String> getProgress(@PathVariable Long courseId) {
        return repo.findByCourseId(courseId)
                .stream()
                .map(progress -> progress.getLessonTitle())
                .collect(Collectors.toList());
    }
}