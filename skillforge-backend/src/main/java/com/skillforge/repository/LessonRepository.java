package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.entity.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByTopicId(Long topicId);

}