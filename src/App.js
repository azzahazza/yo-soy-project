import { useState, useEffect } from 'react';

// ============================================
// CONFIGURATION - All images with verified nationalities
// ============================================
const IMAGE_POOL = [
  // Japanese (10)
  { id: 1, imageUrl: '/images/japanese_1.webp', correctCountry: 'Japanese' },
  { id: 2, imageUrl: '/images/japanese_2.webp', correctCountry: 'Japanese' },
  { id: 3, imageUrl: '/images/japanese_3.webp', correctCountry: 'Japanese' },
  { id: 4, imageUrl: '/images/japanese_4.webp', correctCountry: 'Japanese' },
  { id: 5, imageUrl: '/images/japanese_5.webp', correctCountry: 'Japanese' },
  { id: 6, imageUrl: '/images/japanese_6.webp', correctCountry: 'Japanese' },
  { id: 7, imageUrl: '/images/japanese_7.jpeg', correctCountry: 'Japanese' },
  { id: 8, imageUrl: '/images/japanese_8.jpeg', correctCountry: 'Japanese' },
  { id: 9, imageUrl: '/images/japanese_9.webp', correctCountry: 'Japanese' },
  { id: 10, imageUrl: '/images/japanese_10.jpeg', correctCountry: 'Japanese' },
  
  // Korean (10)
  { id: 11, imageUrl: '/images/korean_1.webp', correctCountry: 'Korean' },
  { id: 12, imageUrl: '/images/korean_2.webp', correctCountry: 'Korean' },
  { id: 13, imageUrl: '/images/korean_3.webp', correctCountry: 'Korean' },
  { id: 14, imageUrl: '/images/korean_4.webp', correctCountry: 'Korean' },
  { id: 15, imageUrl: '/images/korean_5.webp', correctCountry: 'Korean' },
  { id: 16, imageUrl: '/images/korean_6.webp', correctCountry: 'Korean' },
  { id: 17, imageUrl: '/images/korean_7.webp', correctCountry: 'Korean' },
  { id: 18, imageUrl: '/images/korean_8.webp', correctCountry: 'Korean' },
  { id: 19, imageUrl: '/images/korean_9.webp', correctCountry: 'Korean' },
  { id: 20, imageUrl: '/images/korean_10.webp', correctCountry: 'Korean' },
  
  // Chinese (10)
  { id: 21, imageUrl: '/images/chinese_1.jpeg', correctCountry: 'Chinese' },
  { id: 22, imageUrl: '/images/chinese_2.jpeg', correctCountry: 'Chinese' },
  { id: 23, imageUrl: '/images/chinese_3.jpeg', correctCountry: 'Chinese' },
  { id: 24, imageUrl: '/images/chinese_4.jpeg', correctCountry: 'Chinese' },
  { id: 25, imageUrl: '/images/chinese_5.jpeg', correctCountry: 'Chinese' },
  { id: 26, imageUrl: '/images/chinese_6.webp', correctCountry: 'Chinese' },
  { id: 27, imageUrl: '/images/chinese_7.webp', correctCountry: 'Chinese' },
  { id: 28, imageUrl: '/images/chinese_8.webp', correctCountry: 'Chinese' },
  { id: 29, imageUrl: '/images/chinese_9.webp', correctCountry: 'Chinese' },
  { id: 30, imageUrl: '/images/chinese_10.jpeg', correctCountry: 'Chinese' },
  
  // Vietnamese (10)
  { id: 31, imageUrl: '/images/vietnamese_1.webp', correctCountry: 'Vietnamese' },
  { id: 32, imageUrl: '/images/vietnamese_2.png', correctCountry: 'Vietnamese' },
  { id: 33, imageUrl: '/images/vietnamese_3.webp', correctCountry: 'Vietnamese' },
  { id: 34, imageUrl: '/images/vietnamese_4.webp', correctCountry: 'Vietnamese' },
  { id: 35, imageUrl: '/images/vietnamese_5.webp', correctCountry: 'Vietnamese' },
  { id: 36, imageUrl: '/images/vietnamese_6.webp', correctCountry: 'Vietnamese' },
  { id: 37, imageUrl: '/images/vietnamese_7.png', correctCountry: 'Vietnamese' },
  { id: 38, imageUrl: '/images/vietnamese_8.jpeg', correctCountry: 'Vietnamese' },
  { id: 39, imageUrl: '/images/vietnamese_9.jpeg', correctCountry: 'Vietnamese' },
  { id: 40, imageUrl: '/images/vietnamese_10.jpeg', correctCountry: 'Vietnamese' },
  
  // Mongolian (10)
  { id: 41, imageUrl: '/images/mongolian_1.png', correctCountry: 'Mongolian' },
  { id: 42, imageUrl: '/images/mongolian_2.webp', correctCountry: 'Mongolian' },
  { id: 43, imageUrl: '/images/mongolian_3.webp', correctCountry: 'Mongolian' },
  { id: 44, imageUrl: '/images/mongolian_4.jpg', correctCountry: 'Mongolian' },
  { id: 45, imageUrl: '/images/mongolian_5.webp', correctCountry: 'Mongolian' },
  { id: 46, imageUrl: '/images/mongolian_6.webp', correctCountry: 'Mongolian' },
  { id: 47, imageUrl: '/images/mongolian_7.webp', correctCountry: 'Mongolian' },
  { id: 48, imageUrl: '/images/mongolian_8.webp', correctCountry: 'Mongolian' },
  { id: 49, imageUrl: '/images/mongolian_9.webp', correctCountry: 'Mongolian' },
  { id: 50, imageUrl: '/images/mongolian_10.jpeg', correctCountry: 'Mongolian' },
];

// Number of questions per quiz attempt
const QUESTIONS_PER_QUIZ = 10;

const COUNTRIES = ['Chinese', 'Japanese', 'Korean', 'Vietnamese', 'Mongolian'];

// ============================================
// UTILITY FUNCTIONS
// ============================================

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Reorder array to ensure no more than 3 consecutive items have the same nationality
const preventFourInARow = (array) => {
  const result = [...array];
  const maxAttempts = 100;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    let needsReorder = false;
    
    // Check for 4+ in a row
    for (let i = 0; i <= result.length - 4; i++) {
      const country = result[i].correctCountry;
      if (
        result[i + 1].correctCountry === country &&
        result[i + 2].correctCountry === country &&
        result[i + 3].correctCountry === country
      ) {
        // Found 4 in a row - swap the 4th one with a random different position
        const swapFrom = i + 3;
        
        // Find a valid position to swap with (different nationality)
        const validPositions = [];
        for (let j = 0; j < result.length; j++) {
          if (j !== swapFrom && result[j].correctCountry !== country) {
            validPositions.push(j);
          }
        }
        
        if (validPositions.length > 0) {
          const swapTo = validPositions[Math.floor(Math.random() * validPositions.length)];
          [result[swapFrom], result[swapTo]] = [result[swapTo], result[swapFrom]];
          needsReorder = true;
          break;
        }
      }
    }
    
    if (!needsReorder) break;
    attempts++;
  }
  
  return result;
};

// Select N random items from array, ensuring no more than 3 of the same nationality in a row
const selectRandom = (array, count) => {
  const shuffled = shuffleArray(array);
  const selected = shuffled.slice(0, Math.min(count, array.length));
  return preventFourInARow(selected);
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function FaceOriginQuiz() {
  const [stage, setStage] = useState('demographics');
  const [demographics, setDemographics] = useState({
    gender: '',
    race: '',
    eastAsianExposure: '',
  });
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (stage === 'quiz' && questions.length === 0) {
      setQuestions(selectRandom(IMAGE_POOL, QUESTIONS_PER_QUIZ));
    }
  }, [stage, questions.length]);

  const handleDemographicsChange = (field, value) => {
    setDemographics(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswer = (selectedCountry) => {
    const currentQuestion = questions[currentIndex];
    
    const response = {
      questionId: currentQuestion.id,
      correctCountry: currentQuestion.correctCountry,
      selectedCountry,
      isCorrect: selectedCountry === currentQuestion.correctCountry,
    };
    
    setResponses(prev => [...prev, response]);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStage('results');
    }
  };

  const calculateResults = () => {
    const correct = responses.filter(r => r.isCorrect).length;
    const total = responses.length;
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
    
    const byCountry = COUNTRIES.map(country => {
      const countryResponses = responses.filter(r => r.correctCountry === country);
      const countryCorrect = countryResponses.filter(r => r.isCorrect).length;
      return {
        country,
        correct: countryCorrect,
        total: countryResponses.length,
        accuracy: countryResponses.length > 0 
          ? ((countryCorrect / countryResponses.length) * 100).toFixed(1) 
          : 0,
      };
    });
    
    return { correct, total, accuracy, byCountry };
  };

  // ==========================================
  // DEMOGRAPHICS SCREEN
  // ==========================================
  if (stage === 'demographics') {
    const isComplete = demographics.gender && demographics.race && demographics.eastAsianExposure;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Face Origin Study</h1>
          <p className="text-gray-500 mb-6">Please answer the following questions to begin.</p>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={demographics.gender}
                onChange={(e) => handleDemographicsChange('gender', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-say">Prefer not to say</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Race/Ethnicity</label>
              <select
                value={demographics.race}
                onChange={(e) => handleDemographicsChange('race', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="white">White/Caucasian</option>
                <option value="black">Black/African</option>
                <option value="hispanic">Hispanic/Latino</option>
                <option value="south-asian">South Asian</option>
                <option value="east-asian">East Asian</option>
                <option value="southeast-asian">Southeast Asian</option>
                <option value="middle-eastern">Middle Eastern</option>
                <option value="pacific-islander">Pacific Islander</option>
                <option value="mixed">Mixed/Multiple</option>
                <option value="other">Other</option>
                <option value="prefer-not-say">Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level of exposure to East Asian people/culture
              </label>
              <select
                value={demographics.eastAsianExposure}
                onChange={(e) => handleDemographicsChange('eastAsianExposure', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="none">None or very little</option>
                <option value="low">Low (occasional media exposure)</option>
                <option value="moderate">Moderate (some friends/acquaintances, regular media)</option>
                <option value="high">High (many friends/colleagues, lived in East Asia)</option>
                <option value="very-high">Very High (partner/family members, extensive time in East Asia)</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={() => setStage('instructions')}
            disabled={!isComplete}
            className={`w-full mt-8 py-3 px-6 rounded-lg font-medium transition-colors ${
              isComplete 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // INSTRUCTIONS SCREEN
  // ==========================================
  if (stage === 'instructions') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h1>
          
          <div className="text-gray-600 space-y-4 mb-8 text-left">
            <p>You will be shown <strong>{QUESTIONS_PER_QUIZ} photographs</strong> of individuals from East Asia.</p>
            
            <p>For each photograph, please select which nationality you believe the person is:</p>
            
            <ul className="list-disc list-inside pl-4">
              {COUNTRIES.map(c => <li key={c}>{c}</li>)}
            </ul>
            
            <p>Please respond based on your first impression. There is no time limit, but try to respond naturally without overthinking.</p>
          </div>
          
          <button
            onClick={() => setStage('quiz')}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Begin Quiz
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // QUIZ SCREEN
  // ==========================================
  if (stage === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Image card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Person to identify"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <p className="text-center text-gray-700 mb-4 font-medium">
                What nationality is this person?
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {COUNTRIES.map(country => (
                  <button
                    key={country}
                    onClick={() => handleAnswer(country)}
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RESULTS SCREEN
  // ==========================================
  if (stage === 'results') {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Your Results</h1>
          <p className="text-gray-500 text-center mb-8">Thanks for participating!</p>
          
          {/* Score Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{results.accuracy}%</p>
                <p className="text-sm text-gray-500">Overall Accuracy</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{results.correct}/{results.total}</p>
                <p className="text-sm text-gray-500">Correct Answers</p>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-600 mb-3">Accuracy by Nationality</h3>
            <div className="space-y-2">
              {results.byCountry.filter(item => item.total > 0).map(item => (
                <div key={item.country} className="flex items-center justify-between">
                  <span className="text-gray-600">{item.country}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-20 text-right">
                      {item.correct}/{item.total} ({item.accuracy}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
