package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findTop5ByOrderByIdDesc();

}