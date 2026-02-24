package com.skillforge.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "created_at")
    private Long createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = System.currentTimeMillis();
    }

    // Constructors
    public Question() {
    }

    public Question(String content, Difficulty difficulty, Course course) {
        this.content = content;
        this.difficulty = difficulty;
        this.course = course;
    }

    public Question(Long id, String content, Difficulty difficulty, Course course, Long createdAt) {
        this.id = id;
        this.content = content;
        this.difficulty = difficulty;
        this.course = course;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    // Builder pattern support
    public static QuestionBuilder builder() {
        return new QuestionBuilder();
    }

    public static class QuestionBuilder {
        private Long id;
        private String content;
        private Difficulty difficulty;
        private Course course;
        private Long createdAt;

        public QuestionBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public QuestionBuilder content(String content) {
            this.content = content;
            return this;
        }

        public QuestionBuilder difficulty(Difficulty difficulty) {
            this.difficulty = difficulty;
            return this;
        }

        public QuestionBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public QuestionBuilder createdAt(Long createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Question build() {
            return new Question(id, content, difficulty, course, createdAt);
        }
    }

    public enum Difficulty {
        EASY, MEDIUM, HARD
    }
}

