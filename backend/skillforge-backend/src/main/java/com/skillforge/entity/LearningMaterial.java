package com.skillforge.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "learning_materials")
@Data
@NoArgsConstructor
public class LearningMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String contentUrl;
    private String contentType; // video, article, pdf

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
