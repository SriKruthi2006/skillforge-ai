package com.skillforge.dto;

import com.skillforge.entity.Course;

public class CourseDTO {
    private Long id;
    private String title;
    private String description;

    public CourseDTO() {
    }

    public CourseDTO(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static CourseDTOBuilder builder() {
        return new CourseDTOBuilder();
    }

    public static CourseDTO fromEntity(Course course) {
        return CourseDTO.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .build();
    }

    public static class CourseDTOBuilder {
        private Long id;
        private String title;
        private String description;

        public CourseDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CourseDTOBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CourseDTOBuilder description(String description) {
            this.description = description;
            return this;
        }

        public CourseDTO build() {
            return new CourseDTO(id, title, description);
        }
    }
}

