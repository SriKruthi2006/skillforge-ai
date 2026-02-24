import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    difficulty: 'Medium',
    course: '',
    type: 'multiple_choice',
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await adminAPI.getAllQuestions();
      setQuestions(response.data || [
        { id: 1, text: 'What is a closure?', difficulty: 'Hard', course: 'JavaScript', type: 'multiple_choice', createdAt: '2026-01-15' },
        { id: 2, text: 'Explain event propagation', difficulty: 'Medium', course: 'JavaScript', type: 'multiple_choice', createdAt: '2026-01-14' },
        { id: 3, text: 'What is the Virtual DOM?', difficulty: 'Medium', course: 'React', type: 'multiple_choice', createdAt: '2026-01-13' },
      ]);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setFormData({ text: '', difficulty: 'Medium', course: '', type: 'multiple_choice' });
    setShowModal(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setFormData(question);
    setShowModal(true);
  };

  const handleSaveQuestion = async () => {
    try {
      if (editingQuestion) {
        await adminAPI.updateQuestion(editingQuestion.id, formData);
      } else {
        await adminAPI.createQuestion(formData);
      }
      setShowModal(false);
      fetchQuestions();
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await adminAPI.deleteQuestion(id);
        fetchQuestions();
      } catch (error) {
        console.error('Failed to delete question:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">❓ Manage Questions</h1>
          <p className="text-gray-600 mt-1">Create and manage test questions</p>
        </div>
        <Button variant="primary" onClick={handleAddQuestion}>
          + New Question
        </Button>
      </div>

      {/* Questions Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Question</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Difficulty</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{question.text}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{question.course}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{question.type.replace('_', ' ')}</td>
                <td className="px-6 py-4 text-sm text-center space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEditQuestion(question)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteQuestion(question.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingQuestion ? 'Edit Question' : 'Add New Question'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveQuestion}>
              {editingQuestion ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter question text"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., JavaScript"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
              <option value="short_answer">Short Answer</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageQuestions;
