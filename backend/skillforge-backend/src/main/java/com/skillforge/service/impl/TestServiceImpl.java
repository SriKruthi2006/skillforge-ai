package com.skillforge.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.entity.*;
import com.skillforge.repository.OptionRepository;
import com.skillforge.repository.ResultRepository;
import com.skillforge.repository.TestRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.TestService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class TestServiceImpl implements TestService {
    private final TestRepository testRepository;
    private final OptionRepository optionRepository;
    private final UserRepository userRepository;
    private final ResultRepository resultRepository;
    private final ObjectMapper mapper = new ObjectMapper();

    public TestServiceImpl(TestRepository testRepository, OptionRepository optionRepository, UserRepository userRepository, ResultRepository resultRepository) {
        this.testRepository = testRepository;
        this.optionRepository = optionRepository;
        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
    }

    @Override
    public TestExam createTest(TestExam test) {
        test.setCreatedAt(Instant.now());
        return testRepository.save(test);
    }

    @Override
    public TestExam getTest(Long id) {
        return testRepository.findById(id).orElseThrow();
    }

    @Override
    public Result submitAnswers(Long userId, Long testId, List<UserAnswer> answers) {
        int score = 0;
        int total = 0;
        Map<Long, TopicStats> topicMap = new HashMap<>();
        for (UserAnswer a : answers) {
            total++;
            var opt = optionRepository.findById(a.getSelectedOptionId()).orElse(null);
            boolean correct = opt != null && opt.isCorrect();
            if (correct) score++;
            a.setCorrect(correct);
            // topic aggregation
            Long topicId = a.getQuestion().getTopic().getId();
            TopicStats ts = topicMap.computeIfAbsent(topicId, k -> new TopicStats());
            ts.attempts++;
            if (correct) ts.correct++;
        }
        Result r = new Result();
        r.setUser(userRepository.findById(userId).orElseThrow());
        r.setTest(testRepository.findById(testId).orElseThrow());
        r.setScore(score);
        r.setTotal(total);
        r.setTakenAt(Instant.now());
        try {
            r.setAnalytics(mapper.writeValueAsString(topicMap));
        } catch (Exception e) {
            r.setAnalytics("{}");
        }
        return resultRepository.save(r);
    }

    static class TopicStats {
        public int attempts = 0;
        public int correct = 0;
    }
}
