package com.skillforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}