import { useEffect, useState } from 'react';
import { studentAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await studentAPI.getCourses();
      setCourses(response.data || [
        {
          id: 1,
          name: 'JavaScript Fundamentals',
          description: 'Master the basics of JavaScript programming',
          progress: 65,
          topics: 12,
          icon: '📚',
          instructor: 'John Smith'
        },
        {
          id: 2,
          name: 'React for Beginners',
          description: 'Learn to build interactive web applications',
          progress: 40,
          topics: 15,
          icon: '⚛️',
          instructor: 'Jane Doe'
        },
        {
          id: 3,
          name: 'Advanced CSS',
          description: 'Master modern CSS techniques and animations',
          progress: 85,
          topics: 10,
          icon: '🎨',
          instructor: 'Mike Johnson'
        },
        {
          id: 4,
          name: 'Web Development Fundamentals',
          description: 'Complete guide to web development',
          progress: 20,
          topics: 20,
          icon: '🌐',
          instructor: 'Sarah Williams'
        },
      ]);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📚 Courses</h1>
        <p className="text-gray-600 mt-1">Continue learning and master new skills</p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6 flex flex-col">
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{course.icon}</div>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {course.progress}%
              </span>
            </div>

            {/* Course Info */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{course.description}</p>

            {/* Instructor */}
            <p className="text-xs text-gray-500 mb-4">by {course.instructor}</p>

            {/* Progress Bar */}
            <ProgressBar value={course.progress} max={100} color="blue" />

            {/* Topics */}
            <p className="text-xs text-gray-600 mt-3 mb-4">{course.topics} topics</p>

            {/* Button */}
            <Button variant="primary" size="md" className="w-full mt-auto">
              {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
