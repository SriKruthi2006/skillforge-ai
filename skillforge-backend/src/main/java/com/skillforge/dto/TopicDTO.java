package com.skillforge.dto;

import com.skillforge.entity.Topic;

public class TopicDTO {
    private Long id;
    private String title;

    public TopicDTO() {}

    public TopicDTO(Long id, String title) {
        this.id = id;
        this.title = title;
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

    public static TopicDTO fromEntity(Topic topic) {
        return new TopicDTO(topic.getId(), topic.getTitle());
    }
}