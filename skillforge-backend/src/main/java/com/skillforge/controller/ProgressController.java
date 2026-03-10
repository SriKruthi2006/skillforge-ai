package com.skillforge.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.entity.Lesson;
import com.skillforge.entity.Progress;
import com.skillforge.repository.ProgressRepository;

@RestController
@RequestMapping("/api/student/progress")
@CrossOrigin
public class ProgressController {

    private final ProgressRepository repo;
    private final com.skillforge.repository.LessonRepository lessonRepository;

    public ProgressController(ProgressRepository repo, com.skillforge.repository.LessonRepository lessonRepository) {
        this.repo = repo;
        this.lessonRepository = lessonRepository;
    }

    /**
     * Mark a lesson as completed by the current student. The request body only
     * needs to supply the lessonId; the controller will determine the courseId
     * by inspecting the lesson's topic.
     */
    @PostMapping("/complete")
    public Progress completeLesson(@RequestBody java.util.Map<String, Long> payload) {
        Long lessonId = payload.get("lessonId");
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Lesson not found"));

        Long courseId = lesson.getTopic().getCourse().getId();

        Progress p = new Progress();
        // TODO: replace with actual student id from security context when available
        p.setStudentId(1L);
        p.setCourseId(courseId);
        p.setLessonId(lessonId);
        p.setCompleted(true);
        return repo.save(p);
    }

    /**
     * Get list of completed lesson IDs for a given course by the current student.
     */
    @GetMapping("/{courseId}")
    public java.util.List<Long> getProgress(@PathVariable Long courseId) {
        return repo.findByCourseId(courseId)
                .stream()
                .filter(p -> p.isCompleted())
                .map(progress -> progress.getLessonId())
                .collect(Collectors.toList());
    }

    /**
     * Get detailed progress information for a course
     */
    @GetMapping("/{courseId}/details")
    public Map<String, Object> getProgressDetails(@PathVariable Long courseId) {
        List<Progress> completedProgress = repo.findByCourseId(courseId).stream()
                .filter(p -> p.isCompleted())
                .collect(Collectors.toList());
        int completedCount = completedProgress.size();
        List<Long> completedLessonIds = completedProgress.stream()
                .map(Progress::getLessonId)
                .collect(Collectors.toList());

        // Get total lessons in the course
        List<Lesson> allLessons = lessonRepository.findAll().stream()
                .filter(lesson -> lesson.getTopic() != null && lesson.getTopic().getCourse().getId().equals(courseId))
                .collect(Collectors.toList());

        int totalLessons = allLessons.size();
        int progress = totalLessons > 0 ? (completedCount * 100) / totalLessons : 0;

        Map<String, Object> result = new HashMap<>();
        result.put("completedLessons", completedCount);
        result.put("totalLessons", totalLessons);
        result.put("progress", progress);
        result.put("completedLessonIds", completedLessonIds);

        return result;
    }
}