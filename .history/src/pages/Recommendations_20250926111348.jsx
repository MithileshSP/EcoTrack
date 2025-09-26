import React, { useState } from 'react';
import { 
  Lightbulb, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  Circle,
  Star,
  Target,
  Zap,
  Car,
  Utensils,
  ChevronRight,
  Play,
  Calendar,
  DollarSign
} from 'lucide-react';

const Recommendations = ({ user, emissions }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [completedActions, setCompletedActions] = useState(new Set());

  // Mock recommendations based on user's emission patterns
  const recommendations = [
    {
      id: 1,
      title: 'Switch to LED Bulbs',
      description: 'Replace incandescent bulbs with LED bulbs to reduce electricity consumption by 80%',
      potentialSavings: 120,
      difficulty: 'Easy',
      category: 'energy',
      timeframe: '1 week',
      cost: 'Low ($50-100)',
      priority: 'High',
      actionSteps: [
        'Audit current bulbs in your home',
        'Purchase LED replacements from local store',
        'Replace bulbs one room at a time',
        'Monitor electricity usage for next month'
      ],
      tips: 'Look for Energy Star certified LED bulbs for maximum efficiency',
      roi: '6 months payback period'
    },
    {
      id: 2,
      title: 'Use Public Transportation',
      description: 'Use public transport 3 days a week instead of personal car',
      potentialSavings: 450,
      difficulty: 'Medium',
      category: 'transportation',
      timeframe: '2 weeks',
      cost: 'Medium ($100-200/month)',
      priority: 'High',
      actionSteps: [
        'Research local bus/metro routes and schedules',
        'Purchase monthly public transport pass',
        'Plan travel times with extra buffer',
        'Track fuel savings and emissions reduction'
      ],
      tips: 'Start with 1-2 days per week and gradually increase',
      roi: '3 months savings on fuel and parking'
    },
    {
      id: 3,
      title: 'Reduce Meat Consumption',
      description: 'Have 2 plant-based meals per week to reduce food carbon footprint',
      potentialSavings: 200,
      difficulty: 'Medium',
      category: 'food',
      timeframe: '1 month',
      cost: 'Neutral ($0-50 savings)',
      priority: 'Medium',
      actionSteps: [
        'Research plant-based protein recipes',
        'Plan weekly meals with meat alternatives',
        'Shop for legumes, tofu, and plant proteins',
        'Track dietary changes and carbon impact'
      ],
      tips: 'Start with familiar dishes and substitute plant proteins',
      roi: 'Health benefits + environmental impact'
    },
    {
      id: 4,
      title: 'Home Energy Audit',
      description: 'Conduct a comprehensive energy audit to identify saving opportunities',
      potentialSavings: 300,
      difficulty: 'Hard',
      category: 'energy',
      timeframe: '1 month',
      cost: 'High ($200-500)',
      priority: 'Medium',
      actionSteps: [
        'Schedule professional energy audit',
        'Identify air leaks and insulation gaps',
        'Prioritize improvements by cost-benefit',
        'Implement changes gradually over time'
      ],
      tips: 'Many utility companies offer free or discounted energy audits',
      roi: '12-18 months payback on improvements'
    },
    {
      id: 5,
      title: 'Smart Thermostat Installation',
      description: 'Install a programmable thermostat to optimize heating and cooling',
      potentialSavings: 180,
      difficulty: 'Medium',
      category: 'energy',
      timeframe: '1 day',
      cost: 'Medium ($150-300)',
      priority: 'High',
      actionSteps: [
        'Research compatible smart thermostat models',
        'Purchase and schedule installation',
        'Set up energy-saving schedules',
        'Monitor energy usage patterns'
      ],
      tips: 'Set temperature 2-3 degrees lower in winter, higher in summer',
      roi: '8-12 months payback period'
    },
    {
      id: 6,
      title: 'Carpool or Rideshare',
      description: 'Share rides with colleagues or neighbors for daily commute',
      potentialSavings: 280,
      difficulty: 'Easy',
      category: 'transportation',
      timeframe: '1 week',
      cost: 'Low ($0-50)',
      priority: 'High',
      actionSteps: [
        'Find colleagues with similar routes',
        'Create carpool schedule',
        'Use rideshare apps for regular routes',
        'Track shared ride frequency'
      ],
      tips: 'Apps like BlaBlaCar can help find regular carpooling partners',
      roi: 'Immediate fuel and parking savings'
    }
  ];

  // Filter recommendations
  const filteredRecommendations = recommendations.filter(rec => {
    const categoryMatch = selectedCategory === 'all' || rec.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || rec.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  // Calculate total potential savings
  const totalPotentialSavings = filteredRecommendations.reduce((sum, rec) => sum + rec.potentialSavings, 0);

  const toggleActionCompletion = (actionId) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
    }
    setCompletedActions(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'green',
      Medium: 'yellow',
      Hard: 'red'
    };
    return colors[difficulty] || 'gray';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'red',
      Medium: 'yellow',
      Low: 'green'
    };
    return colors[priority] || 'gray';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      transportation: Car,
      energy: Zap,
      food: Utensils
    };
    const Icon = icons[category] || Lightbulb;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h1 className="text-2xl font-bold mb-2">AI-Powered Recommendations</h1>
        <p className="text-blue-100">
          Personalized actions to reduce your carbon footprint by up to{' '}
          <span className="font-bold">{totalPotentialSavings.toFixed(0)} kg CO₂e</span> per year
        </p>
      </div>

      {/* Filters & Stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="transportation">Transportation</option>
              <option value="energy">Energy</option>
              <option value="food">Food</option>
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-gray-600">Potential Savings:</span>
              <span className="font-bold text-green-600 ml-1">{totalPotentialSavings.toFixed(0)} kg CO₂e</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-gray-600">Completed:</span>
              <span className="font-bold text-blue-600 ml-1">{completedActions.size}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            isCompleted={completedActions.has(recommendation.id)}
            onToggleCompletion={() => toggleActionCompletion(recommendation.id)}
            getCategoryIcon={getCategoryIcon}
            getDifficultyColor={getDifficultyColor}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more recommendations.</p>
        </div>
      )}

      {/* Progress Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedActions.size}</div>
            <div className="text-sm text-green-800">Actions Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {filteredRecommendations.filter(r => completedActions.has(r.id)).reduce((sum, r) => sum + r.potentialSavings, 0).toFixed(0)}
            </div>
            <div className="text-sm text-blue-800">kg CO₂e Saved</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {recommendations.length - completedActions.size}
            </div>
            <div className="text-sm text-purple-800">Actions Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Recommendation Card Component
const RecommendationCard = ({ 
  recommendation, 
  isCompleted, 
  onToggleCompletion, 
  getCategoryIcon, 
  getDifficultyColor, 
  getPriorityColor 
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${
      isCompleted ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${
              isCompleted ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {getCategoryIcon(recommendation.category)}
            </div>
            <div className="flex-1">
              <h3 className={`font-medium text-lg ${
                isCompleted ? 'text-green-900' : 'text-gray-900'
              }`}>
                {recommendation.title}
              </h3>
              <p className={`text-sm mt-1 ${
                isCompleted ? 'text-green-700' : 'text-gray-600'
              }`}>
                {recommendation.description}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleCompletion}
            className="flex-shrink-0 ml-2"
          >
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 hover:text-green-600" />
            )}
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <TrendingDown className="w-4 h-4 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Potential Savings</p>
              <p className="font-bold text-green-600">{recommendation.potentialSavings} kg CO₂e/year</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Time to Implement</p>
              <p className="font-medium text-gray-900">{recommendation.timeframe}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getDifficultyColor(recommendation.difficulty)}-100 text-${getDifficultyColor(recommendation.difficulty)}-800`}>
            {recommendation.difficulty}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getPriorityColor(recommendation.priority)}-100 text-${getPriorityColor(recommendation.priority)}-800`}>
            {recommendation.priority} Priority
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {recommendation.category}
          </span>
        </div>

        {/* Cost & ROI */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{recommendation.cost}</span>
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            <span>{recommendation.roi}</span>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <span>{expanded ? 'Hide Details' : 'Show Action Steps'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-4">
              {/* Action Steps */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Action Steps
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-6">
                  {recommendation.actionSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Pro Tips
                </h4>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  {recommendation.tips}
                </p>
              </div>

              {/* Start Action Button */}
              <div className="pt-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-100 text-green-800 cursor-default'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={isCompleted}
                >
                  {isCompleted ? '✓ Completed' : 'Start This Action'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;