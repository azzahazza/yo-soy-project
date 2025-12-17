import { useState, useEffect } from 'react';

// ============================================
// CONFIGURATION - All images with verified nationalities
// ============================================
const IMAGE_POOL = [
  // Japanese (15) - NEW
  { id: 1, imageUrl: '/images/japanese_1.jpeg', correctCountry: 'Japanese' },
  { id: 2, imageUrl: '/images/japanese_2.jpeg', correctCountry: 'Japanese' },
  { id: 3, imageUrl: '/images/japanese_3.jpeg', correctCountry: 'Japanese' },
  { id: 4, imageUrl: '/images/japanese_4.jpeg', correctCountry: 'Japanese' },
  { id: 5, imageUrl: '/images/japanese_5.jpeg', correctCountry: 'Japanese' },
  { id: 6, imageUrl: '/images/japanese_6.jpeg', correctCountry: 'Japanese' },
  { id: 7, imageUrl: '/images/japanese_7.jpeg', correctCountry: 'Japanese' },
  { id: 8, imageUrl: '/images/japanese_8.jpeg', correctCountry: 'Japanese' },
  { id: 9, imageUrl: '/images/japanese_9.jpg', correctCountry: 'Japanese' },
  { id: 10, imageUrl: '/images/japanese_10.jpg', correctCountry: 'Japanese' },
  { id: 11, imageUrl: '/images/japanese_11.jpg', correctCountry: 'Japanese' },
  { id: 12, imageUrl: '/images/japanese_12.jpg', correctCountry: 'Japanese' },
  { id: 13, imageUrl: '/images/japanese_13.jpg', correctCountry: 'Japanese' },
  { id: 14, imageUrl: '/images/japanese_14.jpg', correctCountry: 'Japanese' },
  { id: 15, imageUrl: '/images/japanese_15.jpg', correctCountry: 'Japanese' },
  
  // Korean (15)
  { id: 16, imageUrl: '/images/korean_1.webp', correctCountry: 'Korean' },
  { id: 17, imageUrl: '/images/korean_2.webp', correctCountry: 'Korean' },
  { id: 18, imageUrl: '/images/korean_3.webp', correctCountry: 'Korean' },
  { id: 19, imageUrl: '/images/korean_4.jpeg', correctCountry: 'Korean' },
  { id: 20, imageUrl: '/images/korean_5.jpeg', correctCountry: 'Korean' },
  { id: 21, imageUrl: '/images/korean_6.jpeg', correctCountry: 'Korean' },
  { id: 22, imageUrl: '/images/korean_7.jpeg', correctCountry: 'Korean' },
  { id: 23, imageUrl: '/images/korean_8.jpeg', correctCountry: 'Korean' },
  { id: 24, imageUrl: '/images/korean_9.jpeg', correctCountry: 'Korean' },
  { id: 25, imageUrl: '/images/korean_10.jpeg', correctCountry: 'Korean' },
  { id: 26, imageUrl: '/images/korean_11.jpeg', correctCountry: 'Korean' },
  { id: 27, imageUrl: '/images/korean_12.jpeg', correctCountry: 'Korean' },
  { id: 28, imageUrl: '/images/korean_13.jpeg', correctCountry: 'Korean' },
  { id: 29, imageUrl: '/images/korean_14.jpeg', correctCountry: 'Korean' },
  { id: 30, imageUrl: '/images/korean_15.jpeg', correctCountry: 'Korean' },
  
  // Chinese (15)
  { id: 31, imageUrl: '/images/chinese_1.jpg', correctCountry: 'Chinese' },
  { id: 32, imageUrl: '/images/chinese_2.jpg', correctCountry: 'Chinese' },
  { id: 33, imageUrl: '/images/chinese_3.jpeg', correctCountry: 'Chinese' },
  { id: 34, imageUrl: '/images/chinese_4.jpeg', correctCountry: 'Chinese' },
  { id: 35, imageUrl: '/images/chinese_5.jpeg', correctCountry: 'Chinese' },
  { id: 36, imageUrl: '/images/chinese_6.jpeg', correctCountry: 'Chinese' },
  { id: 37, imageUrl: '/images/chinese_7.jpeg', correctCountry: 'Chinese' },
  { id: 38, imageUrl: '/images/chinese_8.jpeg', correctCountry: 'Chinese' },
  { id: 39, imageUrl: '/images/chinese_9.jpeg', correctCountry: 'Chinese' },
  { id: 40, imageUrl: '/images/chinese_10.jpeg', correctCountry: 'Chinese' },
  { id: 41, imageUrl: '/images/chinese_11.jpg', correctCountry: 'Chinese' },
  { id: 42, imageUrl: '/images/chinese_12.jpg', correctCountry: 'Chinese' },
  { id: 43, imageUrl: '/images/chinese_13.jpg', correctCountry: 'Chinese' },
  { id: 44, imageUrl: '/images/chinese_14.jpg', correctCountry: 'Chinese' },
  { id: 45, imageUrl: '/images/chinese_15.jpg', correctCountry: 'Chinese' },
  
  // Vietnamese (15) - NEW
  { id: 46, imageUrl: '/images/vietnamese_1.webp', correctCountry: 'Vietnamese' },
  { id: 47, imageUrl: '/images/vietnamese_2.jpg', correctCountry: 'Vietnamese' },
  { id: 48, imageUrl: '/images/vietnamese_3.png', correctCountry: 'Vietnamese' },
  { id: 49, imageUrl: '/images/vietnamese_4.webp', correctCountry: 'Vietnamese' },
  { id: 50, imageUrl: '/images/vietnamese_5.png', correctCountry: 'Vietnamese' },
  { id: 51, imageUrl: '/images/vietnamese_6.jpg', correctCountry: 'Vietnamese' },
  { id: 52, imageUrl: '/images/vietnamese_7.jpeg', correctCountry: 'Vietnamese' },
  { id: 53, imageUrl: '/images/vietnamese_8.jpeg', correctCountry: 'Vietnamese' },
  { id: 54, imageUrl: '/images/vietnamese_9.jpeg', correctCountry: 'Vietnamese' },
  { id: 55, imageUrl: '/images/vietnamese_10.jpeg', correctCountry: 'Vietnamese' },
  { id: 56, imageUrl: '/images/vietnamese_11.jpeg', correctCountry: 'Vietnamese' },
  { id: 57, imageUrl: '/images/vietnamese_12.jpeg', correctCountry: 'Vietnamese' },
  { id: 58, imageUrl: '/images/vietnamese_13.jpeg', correctCountry: 'Vietnamese' },
  { id: 59, imageUrl: '/images/vietnamese_14.jpeg', correctCountry: 'Vietnamese' },
  { id: 60, imageUrl: '/images/vietnamese_15.jpeg', correctCountry: 'Vietnamese' },
  
  // Mongolian (15)
  { id: 61, imageUrl: '/images/mongolian_1.jpeg', correctCountry: 'Mongolian' },
  { id: 62, imageUrl: '/images/mongolian_2.jpeg', correctCountry: 'Mongolian' },
  { id: 63, imageUrl: '/images/mongolian_3.jpeg', correctCountry: 'Mongolian' },
  { id: 64, imageUrl: '/images/mongolian_4.jpeg', correctCountry: 'Mongolian' },
  { id: 65, imageUrl: '/images/mongolian_5.jpeg', correctCountry: 'Mongolian' },
  { id: 66, imageUrl: '/images/mongolian_6.jpeg', correctCountry: 'Mongolian' },
  { id: 67, imageUrl: '/images/mongolian_7.jpeg', correctCountry: 'Mongolian' },
  { id: 68, imageUrl: '/images/mongolian_8.jpeg', correctCountry: 'Mongolian' },
  { id: 69, imageUrl: '/images/mongolian_9.jpeg', correctCountry: 'Mongolian' },
  { id: 70, imageUrl: '/images/mongolian_10.webp', correctCountry: 'Mongolian' },
  { id: 71, imageUrl: '/images/mongolian_11.jpeg', correctCountry: 'Mongolian' },
  { id: 72, imageUrl: '/images/mongolian_12.jpg', correctCountry: 'Mongolian' },
  { id: 73, imageUrl: '/images/mongolian_13.jpeg', correctCountry: 'Mongolian' },
  { id: 74, imageUrl: '/images/mongolian_14.jpg', correctCountry: 'Mongolian' },
  { id: 75, imageUrl: '/images/mongolian_15.jpg', correctCountry: 'Mongolian' },
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

// Flag images for title page
const FLAGS = [
  { country: 'China', src: '/images/chinaflag.png' },
  { country: 'Japan', src: '/images/Flag_of_Japan.svg' },
  { country: 'Korea', src: '/images/Flag_of_South_Korea.svg.png' },
  { country: 'Vietnam', src: '/images/Flag_of_Vietnam.svg.png' },
  { country: 'Mongolia', src: '/images/Flag_of_Mongolia.svg' },
];

export default function FaceOriginQuiz() {
  const [stage, setStage] = useState('title');
  const [demographics, setDemographics] = useState({
    gender: '',
    race: '',
    eastAsianExposure: '',
  });
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (stage === 'instructions') {
      setQuestions(selectRandom(IMAGE_POOL, QUESTIONS_PER_QUIZ));
    }
  }, [stage]);

  const handleAnswer = (selectedCountry) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedCountry === currentQuestion.correctCountry;
    
    setResponses([...responses, {
      imageId: currentQuestion.id,
      selectedCountry,
      correctCountry: currentQuestion.correctCountry,
      isCorrect
    }]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStage('results');
    }
  };

  const calculateResults = () => {
    const correct = responses.filter(r => r.isCorrect).length;
    return {
      correct,
      total: responses.length,
      percentage: Math.round((correct / responses.length) * 100)
    };
  };

  // ==========================================
  // TITLE SCREEN
  // ==========================================
  if (stage === 'title') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            East Asian Nationality Identification Study
          </h1>
          <p className="text-gray-600 mb-8">
            A research study on cross-cultural facial perception
          </p>
          
          {/* Flag display */}
          <div className="flex justify-center gap-4 mb-8">
            {FLAGS.map((flag) => (
              <div key={flag.country} className="flex flex-col items-center">
                <img 
                  src={flag.src} 
                  alt={`${flag.country} flag`}
                  className="w-16 h-10 object-cover border border-gray-200 rounded shadow-sm"
                />
                <span className="text-xs text-gray-500 mt-1">{flag.country}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setStage('demographics')}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Study
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // DEMOGRAPHICS SCREEN
  // ==========================================
  if (stage === 'demographics') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">About You</h2>
          <p className="text-gray-500 mb-6">Please answer a few questions before we begin.</p>
          
          <div className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your gender?
              </label>
              <select
                value={demographics.gender}
                onChange={(e) => setDemographics({...demographics, gender: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
            
            {/* Race/Ethnicity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your race/ethnicity?
              </label>
              <select
                value={demographics.race}
                onChange={(e) => setDemographics({...demographics, race: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
            
            {/* East Asian Exposure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How much exposure do you have to East Asian people/culture?
              </label>
              <select
                value={demographics.eastAsianExposure}
                onChange={(e) => setDemographics({...demographics, eastAsianExposure: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="none">None/Very little</option>
                <option value="some">Some (occasional media, acquaintances)</option>
                <option value="moderate">Moderate (friends, regular media consumption)</option>
                <option value="high">High (close relationships, lived in East Asia)</option>
                <option value="native">I am East Asian</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={() => setStage('instructions')}
            disabled={!demographics.gender || !demographics.race || !demographics.eastAsianExposure}
            className="w-full mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
          
          <div className="text-left text-gray-600 space-y-4 mb-8">
            <p>You will be shown <strong>{QUESTIONS_PER_QUIZ} photographs</strong> of East Asian individuals.</p>
            <p>For each photo, select which country you think the person is from:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>China</li>
              <li>Japan</li>
              <li>South Korea</li>
              <li>Vietnam</li>
              <li>Mongolia</li>
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
        <div className="max-w-4xl w-full">
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
          
          {/* Image and answers side by side */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:min-h-96">
              {/* Image on left */}
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
                <img 
                  src={currentQuestion.imageUrl} 
                  alt="Person to identify"
                  style={{ height: '100%', width: 'auto', maxHeight: '384px', objectFit: 'contain' }}
                />
              </div>
              
              {/* Answers on right */}
              <div className="md:w-1/2 p-6 flex flex-col justify-center">
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
      </div>
    );
  }

  // ==========================================
  // RESULTS SCREEN
  // ==========================================
  if (stage === 'results') {
    const results = calculateResults();
    const correct = results.correct;
    const wrong = results.total - results.correct;
    
    // Custom messages based on score
    let message = "";
    if (correct <= 3) {
      message = "You probably do the voices in private";
    } else if (correct <= 7) {
      message = `You aight ${demographics.race === 'white' ? 'White/Caucasian' : demographics.race === 'black' ? 'Black/African' : demographics.race === 'hispanic' ? 'Hispanic/Latino' : demographics.race === 'south-asian' ? 'South Asian' : demographics.race === 'east-asian' ? 'East Asian' : demographics.race === 'southeast-asian' ? 'Southeast Asian' : demographics.race === 'middle-eastern' ? 'Middle Eastern' : demographics.race === 'pacific-islander' ? 'Pacific Islander' : demographics.race === 'mixed' ? 'Mixed/Multiple' : demographics.race === 'other' ? 'Other' : 'Prefer not to say'} boy`;
    } else {
      message = "我们需要你们战斗，我们将把台北从帝国主义猪猡手中解放出来!";
    }
    
    const handleTryAgain = () => {
      setQuestions([]);
      setCurrentIndex(0);
      setResponses([]);
      setShowDetails(false);
      setStage('instructions');
    };
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Your Results</h1>
          <p className="text-gray-500 text-center mb-8">Thanks for participating!</p>
          
          {/* Score Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg border-2 border-green-200">
                <p className="text-4xl font-bold text-green-600">{correct}</p>
                <p className="text-sm text-gray-500">Correct</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-red-200">
                <p className="text-4xl font-bold text-red-500">{wrong}</p>
                <p className="text-sm text-gray-500">Wrong</p>
              </div>
            </div>
            
            {/* Custom message */}
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-medium text-gray-700">{message}</p>
            </div>
          </div>
          
          {/* Show Details Button */}
          {!showDetails && (
            <button
              onClick={() => setShowDetails(true)}
              className="w-full mb-4 py-3 px-6 rounded-lg font-medium border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Show What I Got Right/Wrong
            </button>
          )}
          
          {/* Detailed Results */}
          {showDetails && (
            <div className="mb-6 space-y-3 max-h-64 overflow-y-auto">
              {responses.map((response, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-lg ${response.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                >
                  <img 
                    src={questions[index].imageUrl} 
                    alt={`Question ${index + 1}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">You said:</span> {response.selectedCountry}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Actual:</span> {response.correctCountry}
                    </p>
                  </div>
                  <span className="text-xl">{response.isCorrect ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={handleTryAgain}
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
