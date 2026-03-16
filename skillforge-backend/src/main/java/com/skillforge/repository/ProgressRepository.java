package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.entity.Progress;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    int countByStudentIdAndCompletedTrue(Long studentId);

    List<Progress> findByCourseId(Long courseId);

}