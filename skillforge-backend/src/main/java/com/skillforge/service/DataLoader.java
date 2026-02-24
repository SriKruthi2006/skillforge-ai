package com.skillforge.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.skillforge.entity.Course;
import com.skillforge.entity.Question;
import com.skillforge.entity.Result;
import com.skillforge.entity.User;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.QuestionRepository;
import com.skillforge.repository.ResultRepository;
import com.skillforge.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final QuestionRepository questionRepository;
    private final ResultRepository resultRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, CourseRepository courseRepository, 
                      QuestionRepository questionRepository, ResultRepository resultRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.questionRepository = questionRepository;
        this.resultRepository = resultRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            logger.info("Loading initial data...");

            // Create Admin User
            User admin = new User();
admin.setName("Admin User");
admin.setEmail("admin@skillforge.com");
admin.setPassword(passwordEncoder.encode("admin123"));
admin.setRole(User.Role.ADMIN);
userRepository.save(admin);
            logger.info("Admin user created: {}", admin.getEmail());

            // Create Student User
            User student = new User();
student.setName("John Doe");
student.setEmail("student@skillforge.com");
student.setPassword(passwordEncoder.encode("student123"));
student.setRole(User.Role.STUDENT);
userRepository.save(student);
            logger.info("Student user created: {}", student.getEmail());

            // Create Course 1
            Course course1 = Course.builder()
                    .title("Java Programming Basics")
                    .description("Learn the fundamentals of Java programming language")
                    .build();
            courseRepository.save(course1);
            logger.info("Course created: {}", course1.getTitle());

            // Create Course 2
            Course course2 = Course.builder()
                    .title("Advanced Spring Boot")
                    .description("Master Spring Boot framework for enterprise applications")
                    .build();
            courseRepository.save(course2);
            logger.info("Course created: {}", course2.getTitle());

            // Create Questions for Course 1
            Question q1 = Question.builder()
                    .content("What is the difference between interface and abstract class?")
                    .difficulty(Question.Difficulty.MEDIUM)
                    .course(course1)
                    .build();
            questionRepository.save(q1);

            Question q2 = Question.builder()
                    .content("How does garbage collection work in Java?")
                    .difficulty(Question.Difficulty.HARD)
                    .course(course1)
                    .build();
            questionRepository.save(q2);

            Question q3 = Question.builder()
                    .content("What is Java Virtual Machine (JVM)?")
                    .difficulty(Question.Difficulty.EASY)
                    .course(course1)
                    .build();
            questionRepository.save(q3);

            // Create Questions for Course 2
            Question q4 = Question.builder()
                    .content("What is dependency injection in Spring?")
                    .difficulty(Question.Difficulty.MEDIUM)
                    .course(course2)
                    .build();
            questionRepository.save(q4);

            Question q5 = Question.builder()
                    .content("How does Spring Security handle authentication?")
                    .difficulty(Question.Difficulty.HARD)
                    .course(course2)
                    .build();
            questionRepository.save(q5);
            logger.info("5 questions created");

            // Create Result
            Result result = Result.builder()
                    .score(85)
                    .user(student)
                    .course(course1)
                    .build();
            resultRepository.save(result);
            logger.info("Result created with score: {}", result.getScore());

            logger.info("Initial data loading completed successfully!");
        } else {
            logger.info("Database already has data, skipping initial load");
        }
    }
}

