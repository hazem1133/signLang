import { motion } from 'framer-motion';
import { useState } from 'react';

const courses = {
  beginner: [
    {
      id: 1,
      title: "ASL Alphabet",
      description: "Learn the American Sign Language alphabet from A to Z",
      duration: "15 mins",
      completed: false,
      videoUrl: "https://vimeo.com/1090624251"
    },
    {
      id: 2,
      title: "Basic Greetings",
      description: "Learn to say 'Hello', 'Goodbye', 'Thank you', and 'Please'",
      duration: "10 mins",
      completed: false,
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    }
  ],
  intermediate: [
    {
      id: 3,
      title: "Common Phrases",
      description: "Learn everyday conversational phrases",
      duration: "20 mins",
      completed: false,
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    }
  ],
  expert: [
    {
      id: 4,
      title: "Complex Conversations",
      description: "Advanced signing techniques for fluid conversations",
      duration: "30 mins",
      completed: false,
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    }
  ]
};

export default function Course() {
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleStartLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const getVimeoEmbedUrl = (url) => {
    const videoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}?h=7766b99efe`;
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sign Language Course
          </h1>
          <p className="text-gray-600 mb-8">
            Choose your skill level and start learning sign language today.
          </p>

          {/* Level Selection */}
          <div className="flex gap-4 mb-8">
            {['beginner', 'intermediate', 'expert'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-full capitalize ${
                  selectedLevel === level
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {selectedLesson ? (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4">{selectedLesson.title}</h2>
              <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden">
                {selectedLesson.videoUrl.includes('vimeo.com') ? (
                  <iframe
                    src={getVimeoEmbedUrl(selectedLesson.videoUrl)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    className="w-full h-full"
                    controls
                    src={selectedLesson.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="text-primary hover:underline"
              >
                Back to lessons
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {courses[selectedLevel].map((lesson) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: lesson.id * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{lesson.description}</p>
                      <span className="text-sm text-gray-500">
                        Duration: {lesson.duration}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleStartLesson(lesson)}
                      className="px-6 py-2 bg-primary text-white rounded-full hover:bg-indigo-600 transition-colors"
                    >
                      Start Lesson
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}