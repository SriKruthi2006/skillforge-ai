package com.skillforge.controller;

import com.skillforge.entity.Result;
import com.skillforge.entity.TestExam;
import com.skillforge.entity.UserAnswer;
import com.skillforge.service.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TestExam> create(@RequestBody TestExam test) {
        return ResponseEntity.ok(testService.createTest(test));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestExam> get(@PathVariable Long id) {
        return ResponseEntity.ok(testService.getTest(id));
    }

    @PostMapping("/{testId}/submit")
    public ResponseEntity<Result> submit(@PathVariable Long testId,
                                         @RequestParam Long userId,
                                         @RequestBody List<UserAnswer> answers) {
        Result r = testService.submitAnswers(userId, testId, answers);
        return ResponseEntity.ok(r);
    }
}
