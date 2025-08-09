import  { useState } from 'react';
import { Shuffle, RotateCcw, Trophy, Heart, Quote } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
}

interface Level {
  name: string;
  description: string;
  emoji: string;
  color: string;
}

const questions: Question[] = [
  // --- Culture & Tradition ---
  { id: 1,  question: "In Newar culture, what's the name of the feast held after a girl's 'Bel Bibaha'?", options: ["Janku", "Ihi Bhoj", "Guthi Bhoj", "Bara Khana"], points: [1, 3, 2, 0] },
  { id: 2,  question: "Which festival celebrates brothers and sisters meeting even if they live far apart?", options: ["Teej", "Bhai Tika", "Maghe Sankranti", "Lhosar"], points: [0, 3, 0, 0] },
  { id: 3,  question: "'Guthi' in Newar culture is primarily a:", options: ["Religious trust", "Family gathering", "Temple", "Market"], points: [3, 0, 0, 0] },
  { id: 4,  question: "What is the main ingredient in 'Yomari'?", options: ["Rice flour", "Wheat flour", "Buckwheat flour", "Millet flour"], points: [3, 0, 0, 0] },
  { id: 5,  question: "In Gurung culture, 'Rodhi Ghar' was traditionally used for:", options: ["Village meetings", "Youth gatherings", "Religious rituals", "Trading goods"], points: [0, 3, 0, 0] },
  { id: 6,  question: "Which of these is NOT a type of 'Lhosar'?", options: ["Tamu Lhosar", "Sonam Lhosar", "Gyalpo Lhosar", "Tiji Lhosar"], points: [0, 0, 0, 3] },
  { id: 7,  question: "Which festival marks the end of the monsoon and is popular in the Terai?", options: ["Teej", "Chhath", "Holi", "Bisket Jatra"], points: [0, 3, 0, 0] },
  { id: 8,  question: "'Fulpati' in Dashain is traditionally brought from where to Kathmandu?", options: ["Gorkha", "Bhaktapur", "Pokhara", "Janakpur"], points: [3, 0, 0, 0] },
  { id: 9,  question: "'Indra Jatra' is celebrated mainly in which city?", options: ["Bhaktapur", "Lalitpur", "Kathmandu", "Pokhara"], points: [0, 0, 3, 0] },
  { id: 10, question: "'Maghe Sankranti' is celebrated with which special food?", options: ["Yomari", "Til ko laddu", "Momo", "Chatamari"], points: [0, 3, 0, 0] },

  // --- History & Politics ---
  { id: 11, question: "Which year in the Bikram Sambat calendar marks the unification of Nepal by Prithvi Narayan Shah?", options: ["1826 BS", "1831 BS", "1872 BS", "1901 BS"], points: [3, 1, 0, 0] },
  { id: 12, question: "Who was the first elected Prime Minister of Nepal?", options: ["B.P. Koirala", "Matrika Prasad Koirala", "Kirtinidhi Bista", "Krishna Prasad Bhattarai"], points: [3, 0, 0, 0] },
  { id: 13, question: "When was Nepal declared a Federal Democratic Republic?", options: ["2006 AD", "2008 AD", "2010 AD", "2015 AD"], points: [0, 3, 0, 0] },
  { id: 14, question: "Who is known as the 'Iron Man' of Nepal?", options: ["B.P. Koirala", "Ganesh Man Singh", "Prithvi Narayan Shah", "Pushpa Lal Shrestha"], points: [0, 3, 0, 0] },
  { id: 15, question: "The Kot Massacre took place in which year (AD)?", options: ["1846", "1864", "1901", "1923"], points: [3, 0, 0, 0] },

  // --- Language & Slang ---
  { id: 16, question: "The phrase 'Jaat le ho' is most likely used to mean:", options: ["It's fate", "It's someone's caste", "It's a festival", "It's a joke"], points: [3, 0, 0, 1] },
  { id: 17, question: "In Nepali slang, 'Chappal ma mukh haneko' means:", options: ["Embarrassed", "Angry", "Surprised", "Defeated"], points: [3, 0, 0, 0] },
  { id: 18, question: "If someone says 'Daal bhat power, 24 hour', they are talking about:", options: ["Nepali energy", "A restaurant", "A political slogan", "A song"], points: [3, 0, 0, 0] },
  { id: 19, question: "What does 'Aafno manche' literally mean?", options: ["My person", "Our people", "Trusted person", "Relative"], points: [0, 1, 3, 2] },
  { id: 20, question: "If a Nepali says 'Jhyaap', they mean:", options: ["Very tired", "Drunk", "Lost", "Excited"], points: [0, 3, 0, 0] },

  // --- Geography ---
  { id: 21, question: "Which district is famous for 'Marpha' apples?", options: ["Mustang", "Dolpa", "Jumla", "Rasuwa"], points: [3, 1, 2, 0] },
  { id: 22, question: "How many 8,000+ meter peaks are in Nepal?", options: ["4", "6", "8", "14"], points: [0, 0, 3, 0] },
  { id: 23, question: "'Panch Pokhari' is famous for:", options: ["Five holy lakes", "Five hills", "Five temples", "Five forts"], points: [3, 0, 0, 0] },
  { id: 24, question: "Which city is called the 'City of Devotees'?", options: ["Patan", "Bhaktapur", "Kirtipur", "Banepa"], points: [0, 3, 1, 0] },
  { id: 25, question: "Which is the smallest district in Nepal by area?", options: ["Bhaktapur", "Manang", "Lalitpur", "Dolpa"], points: [3, 0, 0, 0] },

  // --- Music & Arts ---
  { id: 26, question: "'Rajamati' is famous for being:", options: ["A folk song", "A type of rice", "A historical queen", "A Newari dish"], points: [3, 0, 0, 0] },
  { id: 27, question: "Who wrote the national anthem 'Sayaun Thunga Phoolka'?", options: ["Pradeep Kumar Rai", "Amber Gurung", "Byakul Maila", "Chandra Man Singh Maskey"], points: [0, 0, 3, 1] },
  { id: 28, question: "Amber Gurung is best known for:", options: ["Painting", "Sculpture", "Music", "Dance"], points: [0, 0, 3, 0] },
  { id: 29, question: "'Sarangi' is a traditional Nepali:", options: ["Flute", "Drum", "String instrument", "Dance"], points: [0, 0, 3, 0] },
  { id: 30, question: "'Panche Baja' is used mainly in:", options: ["Weddings", "Funerals", "Festivals", "Political rallies"], points: [3, 0, 0, 0] },

  // --- Food & Drink ---
  { id: 31, question: "'Raksi' is traditionally made from:", options: ["Rice", "Millet", "Corn", "Barley"], points: [0, 3, 1, 0] },
  { id: 32, question: "Which dish is made from buckwheat flour?", options: ["Dhido", "Yomari", "Sel Roti", "Thukpa"], points: [3, 0, 0, 0] },
  { id: 33, question: "'Kwati' is prepared using:", options: ["One type of bean", "Nine types of beans", "Five types of beans", "Lentils only"], points: [0, 3, 0, 0] },
  { id: 34, question: "Which street food is Kathmandu famous for?", options: ["Pani Puri", "Chatpate", "Momo", "All of these"], points: [0, 0, 0, 3] },
  { id: 35, question: "'Sel Roti' is traditionally made during:", options: ["Tihar", "Holi", "Buddha Jayanti", "Maghe Sankranti"], points: [3, 0, 0, 0] },

  // --- Lifestyle & Fun ---
  { id: 36, question: "Which is the most common phrase you'll hear on a Nepali bus?", options: ["Ticket, please!", "K garera basne?", "Aghi sir, aghi!", "Mind the gap."], points: [0, 0, 3, 0] },
  { id: 37, question: "If your internet is slow, a Nepali will first:", options: ["Reboot the router", "Call the ISP", "Restart the whole house", "Shout 'Net chhaina!'"], points: [0, 0, 0, 3] },
  { id: 38, question: "Which note has Mt. Everest printed on it?", options: ["Rs. 10", "Rs. 50", "Rs. 500", "All of them"], points: [0, 0, 0, 3] },
  { id: 39, question: "A cow blocking the road in Nepal is:", options: ["Rare", "Illegal", "Common", "Myth"], points: [0, 0, 3, 0] },
  { id: 40, question: "'Tudikhel' in Kathmandu is used for:", options: ["Military parades", "Public gatherings", "Sports", "All of these"], points: [0, 0, 0, 3] },

  // --- Rare & Tricky ---
  { id: 41, question: "Which is the only district in Nepal without a road connection?", options: ["Dolpa", "Humla", "Manang", "Rukum East"], points: [0, 3, 0, 0] },
  { id: 42, question: "What is the traditional attire of Rai women called?", options: ["Gunyu Cholo", "Mekhli", "Fariya", "Haku Patasi"], points: [0, 3, 0, 0] },
  { id: 43, question: "Which lake changes color depending on the season?", options: ["Rara", "Phoksundo", "Tilicho", "Gosainkunda"], points: [0, 0, 0, 3] },
  { id: 44, question: "Which is the oldest temple in Kathmandu Valley?", options: ["Changunarayan", "Pashupatinath", "Swayambhunath", "Boudhanath"], points: [3, 0, 0, 0] },
  { id: 45, question: "Which Nepali city is famous for pottery?", options: ["Bhaktapur", "Janakpur", "Biratnagar", "Tansen"], points: [3, 0, 0, 0] },
  { id: 46, question: "'Barha' in Newar culture refers to:", options: ["A girl's seclusion ritual", "A festival", "A type of jewelry", "A religious book"], points: [3, 0, 0, 0] },
  { id: 47, question: "'Bajra' is the Nepali name for:", options: ["Millet", "Barley", "Wheat", "Corn"], points: [3, 0, 0, 0] },
  { id: 48, question: "Which district produces the most tea in Nepal?", options: ["Ilam", "Jhapa", "Dhankuta", "Sindhupalchok"], points: [3, 0, 0, 0] },
  { id: 49, question: "Which place is called the 'Switzerland of Nepal'?", options: ["Jiri", "Mustang", "Rara", "Gorkha"], points: [3, 0, 0, 0] },
  { id: 50, question: "Which animal is considered the national animal of Nepal?", options: ["Cow", "Yak", "Snow Leopard", "One-horned Rhino"], points: [0, 0, 0, 3] }
];

const levels: Level[] = [
  {
    name: "Google Baba Ko Chora",
    description: "Your Nepali knowledge is as limited as searching Machhapuchhre on Google Maps. Time to load some serious dal-bhat power!",
    emoji: "🗺️",
    color: "bg-gray-500"
  },
  {
    name: "Momo Tourist",
    description: "You can say ‘Namaste’ and order a plate of momos, but thinking Everest is the only mountain in Nepal? Nah, there’s more to explore!",
    emoji: "🎒",
    color: "bg-blue-500"
  },
  {
    name: "Dal Bhat Learner",
    description: "You know about Dashain and Tihar, and dal-bhat tastes pretty good to you. Now it’s time to understand the real fun of ‘Nepali time’!",
    emoji: "📚",
    color: "bg-green-500"
  },
  {
    name: "Momo Achar Critic",
    description: "When the power goes out, you’re already at the ‘Oh no!’ level. You probably have strong opinions on momo achar flavors too!",
    emoji: "🤝",
    color: "bg-yellow-500"
  },
  {
    name: "Ghar Ko Jwai",
    description: "Rice without ghee feels incomplete, shoes always outside the gate, and endless debates about the best momo place — you’re basically family now!",
    emoji: "❤️",
    color: "bg-orange-500"
  },
  {
    name: "Pure Nepali",
    description: "You are the true Nepali this world has been waiting for! You know that load shedding builds character, aama’s cooking is unbeatable, and khorsani is life.",
    emoji: "🏔️",
    color: "bg-red-500"
  }
];

const quotes: string[] = [
  "जसको हात बलियो, उसको न्याय पनि बलियो।",
  "आफ्नो आकाश आफ्नो देश, यही हो सच्चा स्वाभिमान।",
  "परिश्रम बिना सफलता सम्भव छैन।",
  "भएका कुरा सानै भए पनि, गरिमा त ठूलो हुन्छ।",
  "अर्काको भरमा टिक्ने बानी कहिल्यै सफलता दिंदैन।",
  "जलको थोपा थोपा मिलेर सागर बन्छ।",
  "देश भनेको माटो मात्र होइन, यहाँको जनताको मन पनि हो।",
  "कहिले उकालो, कहिले ओरालो — यही हो जीवनको बाटो।",
  "ज्ञान नै सबैभन्दा ठूलो सम्पत्ति हो।",
  "दुख सहनु पर्छ, सुख पाउन।"
];

function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [, setUserAnswers] = useState<number[]>([]);
  const [showTransition, setShowTransition] = useState(false);

  const startGame = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setGameState('playing');
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const points = currentQuestion.points[answerIndex];
    
    setScore(prev => prev + points);
    setUserAnswers(prev => [...prev, answerIndex]);
    setShowTransition(true);
    
    setTimeout(() => {
      setShowTransition(false);
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('results');
      }
    }, 800);
  };

  const getLevel = (score: number): Level => {
    const percentage = (score / 30) * 100;
    if (percentage >= 90) return levels[5];
    if (percentage >= 75) return levels[4];
    if (percentage >= 60) return levels[3];
    if (percentage >= 40) return levels[2];
    if (percentage >= 20) return levels[1];
    return levels[0];
  };

  const currentLevel = getLevel(score);
  const progress = selectedQuestions.length > 0 ? ((currentQuestionIndex + 1) / selectedQuestions.length) * 100 : 0;

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Are You a <span className="text-red-600">Nepali</span>?
              </h1>
              <p className="text-xl text-gray-600 mb-2">Be Honest.</p>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Time to test your Nepali-ness! Answer 10 carefully selected questions 
                and discover your true level of connection to the land of mountains, 
                momos, and endless possibilities.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Shuffle className="w-5 h-5 mr-2 text-blue-500" />
                  10 Random Questions
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  6 Nepali Levels
                </div>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start the Quiz
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const currentQuote = quotes[currentQuestionIndex % quotes.length];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm font-medium">
                Question {currentQuestionIndex + 1} of {selectedQuestions.length}
              </span>
              <span className="text-white text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Quote Section - Hidden on mobile, shown on large screens */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-white font-semibold text-lg">Nepali Wisdom</h3>
                </div>
                <blockquote className="text-white/90 text-lg leading-relaxed font-medium">
                  "{currentQuote}"
                </blockquote>
              </div>
            </div>

            {/* Main Question Section */}
            <div className="lg:col-span-3">
              <div className={`transition-all duration-300 ${showTransition ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center leading-tight">
                    {currentQuestion.question}
                  </h2>
                  
                  <div className="grid gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="text-left p-6 rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                      >
                        <span className="text-lg text-gray-700 font-medium">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section for mobile - shown below question */}
            <div className="lg:hidden col-span-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 mt-4">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-white font-semibold text-lg">Nepali Wisdom</h3>
                </div>
                <blockquote className="text-white/90 text-lg leading-relaxed font-medium text-center">
                  "{currentQuote}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-center">
            <div className="mb-8">
              <div className={`w-24 h-24 mx-auto ${currentLevel.color} rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg`}>
                {currentLevel.emoji}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {currentLevel.name}
              </h2>
              
              <div className="text-lg text-gray-600 mb-6">
                Score: <span className="font-bold text-red-600">{score}/30</span> points
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {currentLevel.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startGame}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <button
                onClick={() => setGameState('start')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;