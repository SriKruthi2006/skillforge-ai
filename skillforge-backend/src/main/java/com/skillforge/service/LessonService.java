package com.skillforge.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillforge.entity.Lesson;
import com.skillforge.repository.LessonRepository;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public List<Lesson> getLessonsByTopic(Long topicId) {
        return lessonRepository.findByTopicId(topicId);
    }

    public Optional<Lesson> getLessonById(Long lessonId) {
        return lessonRepository.findById(lessonId);
    }
}