package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.entity.Progress;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    List<Progress> findByCourseId(Long courseId);
}