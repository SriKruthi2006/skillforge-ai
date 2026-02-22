package com.skillforge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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
    public Result() {
    }

    public Result(Integer score, User user, Course course) {
        this.score = score;
        this.user = user;
        this.course = course;
    }

    public Result(Long id, Integer score, User user, Course course, Long createdAt) {
        this.id = id;
        this.score = score;
        this.user = user;
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
    public static ResultBuilder builder() {
        return new ResultBuilder();
    }

    public static class ResultBuilder {
        private Long id;
        private Integer score;
        private User user;
        private Course course;
        private Long createdAt;

        public ResultBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ResultBuilder score(Integer score) {
            this.score = score;
            return this;
        }

        public ResultBuilder user(User user) {
            this.user = user;
            return this;
        }

        public ResultBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public ResultBuilder createdAt(Long createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Result build() {
            return new Result(id, score, user, course, createdAt);
        }
    }
}

