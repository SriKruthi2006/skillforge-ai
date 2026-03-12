package com.skillforge.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.CourseDTO;
import com.skillforge.dto.TopicDTO;
import com.skillforge.repository.CourseRepository;
import com.skillforge.service.TopicService;

@RestController
@RequestMapping("/api/student/courses")
@CrossOrigin("*")
public class StudentCourseController {

    private final CourseRepository courseRepository;
    private final TopicService topicService;

    public StudentCourseController(CourseRepository courseRepository, TopicService topicService) {
        this.courseRepository = courseRepository;
        this.topicService = topicService;
    }

    @GetMapping
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/{courseId}/topics")
    public List<TopicDTO> getTopicsByCourse(@PathVariable Long courseId) {
        return topicService.getTopicsByCourse(courseId)
                .stream()
                .map(TopicDTO::fromEntity)
                .collect(Collectors.toList());
    }
}