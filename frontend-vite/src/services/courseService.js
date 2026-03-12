import API from "./api";

export const getCourses = () => {
  return API.get("/student/courses");
};

export const getTopicsByCourse = (courseId) => {
  return API.get(`/student/courses/${courseId}/topics`);
};

export const getLessonsByTopic = (topicId) => {
  return API.get(`/student/topics/${topicId}/lesson`);
};

export const getLessonById = (lessonId) => {
  return API.get(`/student/lessons/${lessonId}`);
};

export const markLessonComplete = (lessonId) => {
  return API.post("/student/progress/complete", { lessonId });
};

export const getCourseProgress = (courseId) => {
  return API.get(`/student/progress/${courseId}`);
};

export const getCourseProgressDetails = (courseId) => {
  return API.get(`/student/progress/${courseId}/details`);
};

export const getCourse = (courseId) => {
  return API.get(`/courses/${courseId}`);
};