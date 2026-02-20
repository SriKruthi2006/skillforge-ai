package com.skillforge.service;

import com.skillforge.entity.Result;
import com.skillforge.entity.TestExam;
import com.skillforge.entity.UserAnswer;

import java.util.List;

public interface TestService {
    TestExam createTest(TestExam test);
    TestExam getTest(Long id);
    Result submitAnswers(Long userId, Long testId, List<UserAnswer> answers);
}
