// src/components/TableTopicsGenerator.jsx
import React, { useState } from 'react';

const TableTopicsGenerator = () => {
  const [theme, setTheme] = useState('');
  const [numTopics, setNumTopics] = useState(5);
  const [topics, setTopics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const MIN_TOPICS = 1;
  const MAX_TOPICS = 20;

  const generateTopics = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('https://us-west1-tabletopicsgenerator.cloudfunctions.net/gentabletopics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme, numTopics }),
      });
      const data = await response.json();
      setTopics(data.response);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error generating topics:', error);
    }
    setIsGenerating(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topics.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + topics.length) % topics.length);
  };

  const handleReset = () => {
    setTheme('');
    setNumTopics(5);
    setTopics([]);
    setCurrentIndex(0);
  };

  const handleNumTopicsChange = (change) => {
    setNumTopics((prev) => Math.min(MAX_TOPICS, Math.max(MIN_TOPICS, prev + change)));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || MIN_TOPICS;
    setNumTopics(Math.min(MAX_TOPICS, Math.max(MIN_TOPICS, value)));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {topics.length === 0 ? (
        <div className="space-y-4">
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Enter a theme"
            className="block p-3 w-full text-md rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="numTopics" className="text-md">
              # Of Topics:
            </label>
            <button
              onClick={() => handleNumTopicsChange(-1)}
              disabled={numTopics <= MIN_TOPICS}
              className="px-2 py-1 dark:text-white dark:bg-slate-900 bg-gray-200 rounded-md disabled:opacity-50"
            >
              -
            </button>
            <input
              id="numTopics"
              type="number"
              value={numTopics}
              onChange={handleInputChange}
              min={MIN_TOPICS}
              max={MAX_TOPICS}
              className="p-1 w-16 text-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 no-spinner"
            />
            <button
              onClick={() => handleNumTopicsChange(1)}
              disabled={numTopics >= MAX_TOPICS}
              className="px-2 py-1 dark:text-white dark:bg-slate-900 bg-gray-200 rounded-md disabled:opacity-50"
            >
              +
            </button>
          </div>
          <button
            onClick={generateTopics}
            disabled={isGenerating}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
          >
            {isGenerating ? 'Generating...' : 'Generate Topics'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-6">
              <button
                onClick={handlePrevious}
                className="text-3xl text-blue-500 hover:text-blue-600 transition duration-300"
              >
                &#8592;
              </button>
              <p className="text-xl text-center flex-1 px-4 dark:text-slate-900">{topics[currentIndex]}</p>
              <button
                onClick={handleNext}
                className="text-3xl text-blue-500 hover:text-blue-600 transition duration-300"
              >
                &#8594;
              </button>
            </div>
            <div className="flex justify-center p-6">
              <p className="text-sm text-gray-500 dark:text-slate-900">{`Topic ${currentIndex + 1} of ${topics.length}`}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={generateTopics}
              className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Regenerate
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default TableTopicsGenerator;