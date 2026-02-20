package com.skillforge.controller;

import com.skillforge.entity.Difficulty;
import com.skillforge.entity.Question;
import com.skillforge.repository.QuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping("/topic/{topicId}")
    public List<Question> byTopic(@PathVariable Long topicId) {
        return questionRepository.findByTopicId(topicId);
    }

    @GetMapping("/difficulty/{diff}")
    public List<Question> byDifficulty(@PathVariable String diff) {
        Difficulty d = Difficulty.valueOf(diff.toUpperCase());
        return questionRepository.findByDifficulty(d);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Question q) {
        Question saved = questionRepository.save(q);
        return ResponseEntity.ok(saved);
    }
}
