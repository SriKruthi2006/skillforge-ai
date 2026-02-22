import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { studentAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const Test = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    fetchTest();
  }, [testId]);

  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  const fetchTest = async () => {
    try {
      const response = await studentAPI.getTests();
      const mockTest = {
        id: 1,
        name: 'JavaScript Advanced Concepts',
        totalQuestions: 20,
        difficulty: 'Hard',
        timeLimit: 1800,
        questions: [
          {
            id: 1,
            text: 'What is the correct way to declare a constant in JavaScript?',
            options: ['const x = 5', 'constant x = 5', 'x := 5', 'var x = 5'],
            difficulty: 'Easy'
          },
          {
            id: 2,
            text: 'What is a closure in JavaScript?',
            options: [
              'A function that has access to outer scope variables',
              'A way to close a function',
              'A type of loop',
              'A method to delete variables'
            ],
            difficulty: 'Medium'
          },
          {
            id: 3,
            text: 'What does "this" refer to in an arrow function?',
            options: [
              'The function itself',
              'The object that called the function',
              'The context in which it was defined',
              'The parent object'
            ],
            difficulty: 'Hard'
          },
        ]
      };
      setTest(mockTest);
    } catch (error) {
      console.error('Failed to load test:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await studentAPI.submitTest(testId, answers);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to submit test:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (!test) return <div>Test not found</div>;

  const question = test.questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">✏️ {test.name}</h1>
          <p className="text-gray-600 mt-1">Question {currentQuestion + 1} of {test.totalQuestions}</p>
        </div>
        <div className={`text-3xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-3">
          <Card className="p-8">
            {/* Difficulty Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <span className="text-white text-sm font-bold">✓</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </Button>

              {currentQuestion === test.questions.length - 1 ? (
                <Button variant="primary" onClick={handleSubmit}>
                  Submit Test
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  Next →
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Question Navigator */}
        <Card className="p-6 h-fit sticky top-20">
          <h3 className="font-bold text-gray-900 mb-4">Questions</h3>
          <div className="grid grid-cols-4 gap-2">
            {test.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-full aspect-square rounded-lg font-semibold transition-all ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-600">{answeredCount}</span> of{' '}
              <span className="font-semibold">{test.questions.length}</span> answered
            </p>
          </div>
        </Card>
      </div>

      {/* Results Modal */}
      <Modal isOpen={showResults} onClose={() => {}} title="Test Submitted">
        <div className="text-center py-6">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-gray-600 text-lg">Your test has been submitted successfully!</p>
          <p className="text-gray-600 mt-2">Results will be available shortly.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Test;
