package com.skillforge.controller;

import com.skillforge.dto.CourseDTO;
import com.skillforge.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        List<CourseDTO> courses = courseRepository.findAll()
                .stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(course -> ResponseEntity.ok(CourseDTO.fromEntity(course)))
                .orElse(ResponseEntity.notFound().build());
    }
}

