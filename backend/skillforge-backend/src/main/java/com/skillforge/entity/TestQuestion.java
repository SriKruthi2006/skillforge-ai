package com.skillforge.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "test_questions")
@Data
@NoArgsConstructor
public class TestQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private TestExam test;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private int points = 1;
}
