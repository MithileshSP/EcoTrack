// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    totalEmissions: 2340,
    achievements: ['First Step', 'Data Collector'],
    level: 3,
    xp: 150,
    streak: 7,
    joinedDate: '2025-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    totalEmissions: 1890,
    achievements: ['Eco Warrior', 'Carbon Reducer'],
    level: 5,
    xp: 280,
    streak: 12,
    joinedDate: '2024-12-10'
  }
];

// Mock Emissions Data
export const mockEmissionsData = [
  {
    id: 1,
    userId: 1,
    category: 'transportation',
    type: 'car',
    amount: 234.5,
    date: '2025-09-20',
    description: 'Daily commute - 50km',
    details: { distance: 50, fuelType: 'petrol' }
  },
  {
    id: 2,
    userId: 1,
    category: 'energy',
    type: 'electricity',
    amount: 156.8,
    date: '2025-09-21',
    description: 'Monthly electricity bill - 350 kWh',
    details: { usage: 350, rate: 0.448 }
  },
  {
    id: 3,
    userId: 1,
    category: 'transportation',
    type: 'flight',
    amount: 1200.0,
    date: '2025-09-15',
    description: 'Business trip to Mumbai',
    details: { distance: 1400, class: 'economy' }
  },
  {
    id: 4,
    userId: 1,
    category: 'food',
    type: 'meat',
    amount: 45.2,
    date: '2025-09-22',
    description: 'Weekly groceries - beef and chicken',
    details: { meatType: 'mixed', quantity: 2.5 }
  },
  {
    id: 5,
    userId: 1,
    category: 'energy',
    type: 'gas',
    amount: 89.3,
    date: '2025-09-19',
    description: 'Cooking gas cylinder',
    details: { cylinderSize: 14.2, usage: 'cooking' }
  },
  {
    id: 6,
    userId: 1,
    category: 'transportation',
    type: 'car',
    amount: 189.2,
    date: '2025-09-18',
    description: 'Weekend trip - 40km',
    details: { distance: 40, fuelType: 'petrol' }
  },
  {
    id: 7,
    userId: 1,
    category: 'energy',
    type: 'electricity',
    amount: 201.3,
    date: '2025-09-17',
    description: 'High AC usage - 420 kWh',
    details: { usage: 420, rate: 0.479 }
  }
];

// Mock Recommendations
export const mockRecommendations = [
  {
    id: 1,
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with LED bulbs to reduce electricity consumption by 80%',
    potentialSavings: 120,
    difficulty: 'Easy',
    category: 'energy',
    timeframe: '1 week',
    actionSteps: [
      'Audit current bulbs in your home',
      'Purchase LED replacements from local store',
      'Replace bulbs one room at a time',
      'Monitor electricity usage for next month'
    ],
    tips: 'Look for Energy Star certified LED bulbs for maximum efficiency'
  },
  {
    id: 2,
    title: 'Use Public Transportation',
    description: 'Use public transport 3 days a week instead of personal car',
    potentialSavings: 450,
    difficulty: 'Medium',
    category: 'transportation',
    timeframe: '2 weeks',
    actionSteps: [
      'Research local bus/metro routes and schedules',
      'Purchase monthly public transport pass',
      'Plan travel times with extra buffer',
      'Track fuel savings and emissions reduction'
    ],
    tips: 'Start with 1-2 days per week and gradually increase'
  },
  {
    id: 3,
    title: 'Reduce Meat Consumption',
    description: 'Have 2 plant-based meals per week to reduce food carbon footprint',
    potentialSavings: 200,
    difficulty: 'Medium',
    category: 'food',
    timeframe: '1 month',
    actionSteps: [
      'Research plant-based protein recipes',
      'Plan weekly meals with meat alternatives',
      'Shop for legumes, tofu, and plant proteins',
      'Track dietary changes and carbon impact'
    ],
    tips: 'Start with familiar dishes and substitute plant proteins'
  },
  {
    id: 4,
    title: 'Home Energy Audit',
    description: 'Conduct a comprehensive energy audit to identify saving opportunities',
    potentialSavings: 300,
    difficulty: 'Hard',
    category: 'energy',
    timeframe: '1 month',
    actionSteps: [
      'Schedule professional energy audit',
      'Identify air leaks and insulation gaps',
      'Prioritize improvements by cost-benefit',
      'Implement changes gradually over time'
    ],
    tips: 'Many utility companies offer free or discounted energy audits'
  },
  {
    id: 5,
    title: 'Smart Thermostat Installation',
    description: 'Install a programmable thermostat to optimize heating and cooling',
    potentialSavings: 180,
    difficulty: 'Medium',
    category: 'energy',
    timeframe: '1 day',
    actionSteps: [
      'Research compatible smart thermostat models',
      'Purchase and schedule installation',
      'Set up energy-saving schedules',
      'Monitor energy usage patterns'
    ],
    tips: 'Set temperature 2-3 degrees lower in winter, higher in summer'
  },
  {
    id: 6,
    title: 'Carpool or Rideshare',
    description: 'Share rides with colleagues or neighbors for daily commute',
    potentialSavings: 280,
    difficulty: 'Easy',
    category: 'transportation',
    timeframe: '1 week',
    actionSteps: [
      'Find colleagues with similar routes',
      'Create carpool schedule',
      'Use rideshare apps for regular routes',
      'Track shared ride frequency'
    ],
    tips: 'Apps like BlaBlaCar can help find regular carpooling partners'
  }
];

// Mock Achievements
export const mockAchievements = [
  { 
    id: 1, 
    name: 'First Step', 
    description: 'Logged your first emission entry', 
    icon: '🌱', 
    unlocked: true,
    xpReward: 10,
    unlockedDate: '2025-09-15'
  },
  { 
    id: 2, 
    name: 'Data Collector', 
    description: 'Logged 10 emission entries', 
    icon: '📊', 
    unlocked: true,
    xpReward: 25,
    unlockedDate: '2025-09-20'
  },
  { 
    id: 3, 
    name: 'Week Warrior', 
    description: 'Maintained 7-day logging streak', 
    icon: '⚡', 
    unlocked: true,
    xpReward: 50,
    unlockedDate: '2025-09-22'
  },
  { 
    id: 4, 
    name: 'Carbon Reducer', 
    description: 'Reduced emissions by 20% from baseline', 
    icon: '📉', 
    unlocked: false,
    xpReward: 100,
    progress: 65
  },
  { 
    id: 5, 
    name: 'Eco Champion', 
    description: 'Reduced emissions by 50% from baseline', 
    icon: '🏆', 
    unlocked: false,
    xpReward: 200,
    progress: 30
  },
  { 
    id: 6, 
    name: 'Green Guru', 
    description: 'Maintained 30-day logging streak', 
    icon: '🌿', 
    unlocked: false,
    xpReward: 150,
    progress: 23
  },
  { 
    id: 7, 
    name: 'Energy Saver', 
    description: 'Reduced energy consumption by 30%', 
    icon: '💡', 
    unlocked: false,
    xpReward: 75,
    progress: 45
  },
  { 
    id: 8, 
    name: 'Transport Hero', 
    description: 'Used sustainable transport for 20 days', 
    icon: '🚌', 
    unlocked: false,
    xpReward: 80,
    progress: 12
  }
];

// Emission Factors (kg CO2e per unit)
export const emissionFactors = {
  transportation: {
    car: {
      petrol: 2.31, // per km
      diesel: 2.68,
      hybrid: 1.28,
      electric: 0.45
    },
    flight: {
      domestic: 0.255, // per km
      international: 0.195
    },
    train: 0.041, // per km
    bus: 0.089, // per km
    motorcycle: 1.15 // per km
  },
  energy: {
    electricity: 0.448, // per kWh (India average)
    gas: 1.85, // per cubic meter
    coal: 2.42, // per kg
    lpg: 2.98 // per kg
  },
  food: {
    beef: 60, // per kg
    chicken: 6.9,
    pork: 7.6,
    fish: 6.1,
    dairy: 3.2,
    vegetables: 0.4,
    grains: 1.9
  }
};

// Sample comparison data for analytics
export const comparisonData = {
  nationalAverage: 2800, // kg CO2e per person per year in India
  globalAverage: 4800,
  targetReduction: 2000, // Paris Agreement target
  categories: {
    transportation: { user: 45, average: 38 },
    energy: { user: 32, average: 41 },
    food: { user: 18, average: 16 },
    other: { user: 5, average: 5 }
  }
};