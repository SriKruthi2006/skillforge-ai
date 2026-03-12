package com.skillforge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skillforge.entity.Topic;
import com.skillforge.repository.TopicRepository;

@Service
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getTopicsByCourse(Long courseId) {
        return topicRepository.findByCourseId(courseId);
    }
}