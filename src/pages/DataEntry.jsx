import React, { useState } from 'react';
import { 
  Car, 
  Zap, 
  Utensils, 
  Plane, 
  Save, 
  Calculator,
  Upload,
  FileText
} from 'lucide-react';

const DataEntry = ({ onAddEmission, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState({
    category: 'transportation',
    type: 'car',
    amount: '',
    description: '',
    details: {}
  });
  const [calculatedEmission, setCalculatedEmission] = useState(null);
  const [errors, setErrors] = useState({});

  // Emission factors for calculations
  const emissionFactors = {
    transportation: {
      car: { petrol: 2.31, diesel: 2.68, hybrid: 1.28, electric: 0.45 },
      flight: { domestic: 0.255, international: 0.195 },
      train: 0.041,
      bus: 0.089
    },
    energy: {
      electricity: 0.448,
      gas: 1.85,
      coal: 2.42
    },
    food: {
      beef: 60,
      chicken: 6.9,
      pork: 7.6,
      fish: 6.1,
      dairy: 3.2
    }
  };

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: Car, color: 'red' },
    { id: 'energy', name: 'Energy', icon: Zap, color: 'yellow' },
    { id: 'food', name: 'Food', icon: Utensils, color: 'green' }
  ];

  const typeOptions = {
    transportation: [
      { id: 'car', name: 'Car', fields: ['distance', 'fuelType'] },
      { id: 'flight', name: 'Flight', fields: ['distance', 'flightType'] },
      { id: 'train', name: 'Train', fields: ['distance'] },
      { id: 'bus', name: 'Bus', fields: ['distance'] }
    ],
    energy: [
      { id: 'electricity', name: 'Electricity', fields: ['usage'] },
      { id: 'gas', name: 'Natural Gas', fields: ['usage'] },
      { id: 'coal', name: 'Coal', fields: ['usage'] }
    ],
    food: [
      { id: 'beef', name: 'Beef', fields: ['quantity'] },
      { id: 'chicken', name: 'Chicken', fields: ['quantity'] },
      { id: 'pork', name: 'Pork', fields: ['quantity'] },
      { id: 'fish', name: 'Fish', fields: ['quantity'] },
      { id: 'dairy', name: 'Dairy', fields: ['quantity'] }
    ]
  };

  const handleCategoryChange = (categoryId) => {
    const firstType = typeOptions[categoryId][0].id;
    setFormData({
      ...formData,
      category: categoryId,
      type: firstType,
      details: {}
    });
    setCalculatedEmission(null);
  };

  const handleInputChange = (field, value) => {
    if (field === 'type') {
      setFormData({
        ...formData,
        type: value,
        details: {}
      });
    } else if (field.startsWith('details.')) {
      const detailField = field.replace('details.', '');
      setFormData({
        ...formData,
        details: {
          ...formData.details,
          [detailField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
    
    // Clear errors
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const calculateEmission = () => {
    const { category, type, details } = formData;
    let emission = 0;

    try {
      if (category === 'transportation') {
        const distance = parseFloat(details.distance) || 0;
        if (type === 'car') {
          const fuelType = details.fuelType || 'petrol';
          emission = distance * emissionFactors.transportation.car[fuelType];
        } else if (type === 'flight') {
          const flightType = details.flightType || 'domestic';
          emission = distance * emissionFactors.transportation.flight[flightType];
        } else {
          emission = distance * emissionFactors.transportation[type];
        }
      } else if (category === 'energy') {
        const usage = parseFloat(details.usage) || 0;
        emission = usage * emissionFactors.energy[type];
      } else if (category === 'food') {
        const quantity = parseFloat(details.quantity) || 0;
        emission = quantity * emissionFactors.food[type];
      }

      setCalculatedEmission(emission.toFixed(2));
      setFormData({
        ...formData,
        amount: emission.toFixed(2)
      });
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid emission amount';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const emissionData = {
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      details: formData.details
    };

    onAddEmission(emissionData);

    // Reset form
    setFormData({
      category: 'transportation',
      type: 'car',
      amount: '',
      description: '',
      details: {}
    });
    setCalculatedEmission(null);
    
    // Show success message or navigate
    alert('Emission data logged successfully!');
  };

  const currentTypeOptions = typeOptions[formData.category] || [];
  const currentType = currentTypeOptions.find(t => t.id === formData.type);
  const requiredFields = currentType ? currentType.fields : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Log Carbon Emission</h1>
        
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'manual'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calculator className="inline-block w-4 h-4 mr-2" />
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload className="inline-block w-4 h-4 mr-2" />
            Upload Bill
          </button>
        </div>

        {activeTab === 'manual' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(({ id, name, icon: Icon, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleCategoryChange(id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.category === id
                        ? `border-${color}-500 bg-${color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${
                      formData.category === id ? `text-${color}-600` : 'text-gray-400'
                    }`} />
                    <p className={`font-medium ${
                      formData.category === id ? `text-${color}-900` : 'text-gray-700'
                    }`}>
                      {name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {currentTypeOptions.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredFields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getFieldLabel(field)}
                  </label>
                  {getFieldInput(field)}
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            {requiredFields.length > 0 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={calculateEmission}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Emissions
                </button>
              </div>
            )}

            {/* Calculated Result */}
            {calculatedEmission && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  Calculated Emission: <span className="font-bold">{calculatedEmission} kg CO₂e</span>
                </p>
              </div>
            )}

            {/* Manual Amount Entry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emission Amount (kg CO₂e) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.amount ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter emission amount"
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the activity (e.g., Daily commute to office, Monthly electricity bill)"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Save className="w-4 h-4 mr-2" />
                Log Emission
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Upload Tab
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Bills & Documents</h3>
            <p className="text-gray-600 mb-6">
              Upload electricity bills, fuel receipts, or other documents to automatically extract emission data
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.png,.jpeg"
                multiple
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG up to 10MB
                </span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Feature coming soon! AI will automatically extract emission data from your documents.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Helper functions
  function getFieldLabel(field) {
    const labels = {
      distance: 'Distance (km)',
      usage: 'Usage Amount',
      quantity: 'Quantity (kg)',
      fuelType: 'Fuel Type',
      flightType: 'Flight Type'
    };
    return labels[field] || field;
  }

  function getFieldInput(field) {
    if (field === 'fuelType') {
      return (
        <select
          value={formData.details.fuelType || 'petrol'}
          onChange={(e) => handleInputChange(`details.${field}`, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
        </select>
      );
    }
    
    if (field === 'flightType') {
      return (
        <select
          value={formData.details.flightType || 'domestic'}
          onChange={(e) => handleInputChange(`details.${field}`, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="domestic">Domestic</option>
          <option value="international">International</option>
        </select>
      );
    }

    return (
      <input
        type="number"
        step="0.01"
        value={formData.details[field] || ''}
        onChange={(e) => handleInputChange(`details.${field}`, e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
      />
    );
  }
};

export default DataEntry;