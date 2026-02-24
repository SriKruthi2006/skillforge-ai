package com.skillforge.dto;

import com.skillforge.entity.Question;

public class QuestionDTO {
    private Long id;
    private String content;
    private String difficulty;
    private Long courseId;

    public QuestionDTO() {
    }

    public QuestionDTO(Long id, String content, String difficulty, Long courseId) {
        this.id = id;
        this.content = content;
        this.difficulty = difficulty;
        this.courseId = courseId;
    }

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

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public static QuestionDTOBuilder builder() {
        return new QuestionDTOBuilder();
    }

    public static QuestionDTO fromEntity(Question question) {
        return QuestionDTO.builder()
                .id(question.getId())
                .content(question.getContent())
                .difficulty(question.getDifficulty().toString())
                .courseId(question.getCourse().getId())
                .build();
    }

    public static class QuestionDTOBuilder {
        private Long id;
        private String content;
        private String difficulty;
        private Long courseId;

        public QuestionDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public QuestionDTOBuilder content(String content) {
            this.content = content;
            return this;
        }

        public QuestionDTOBuilder difficulty(String difficulty) {
            this.difficulty = difficulty;
            return this;
        }

        public QuestionDTOBuilder courseId(Long courseId) {
            this.courseId = courseId;
            return this;
        }

        public QuestionDTO build() {
            return new QuestionDTO(id, content, difficulty, courseId);
        }
    }
}

