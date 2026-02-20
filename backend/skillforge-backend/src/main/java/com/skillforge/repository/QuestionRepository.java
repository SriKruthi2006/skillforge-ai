package com.skillforge.repository;

import com.skillforge.entity.Question;
import com.skillforge.entity.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTopicId(Long topicId);
    List<Question> findByDifficulty(Difficulty difficulty);

    @Query("select q from Question q where q.topic.id = ?1 and q.difficulty = ?2")
    List<Question> findByTopicAndDifficulty(Long topicId, Difficulty difficulty);
}
