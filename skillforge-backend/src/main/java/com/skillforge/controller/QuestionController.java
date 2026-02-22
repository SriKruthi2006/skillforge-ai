package com.skillforge.controller;

import com.skillforge.dto.QuestionDTO;
import com.skillforge.repository.QuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class QuestionController {

    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        List<QuestionDTO> questions = questionRepository.findAll()
                .stream()
                .map(QuestionDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        return questionRepository.findById(id)
                .map(question -> ResponseEntity.ok(QuestionDTO.fromEntity(question)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByCourse(@PathVariable Long courseId) {
        List<QuestionDTO> questions = questionRepository.findByCourseId(courseId)
                .stream()
                .map(QuestionDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(questions);
    }
}

