import React, { useState } from 'react';

const LocationSelector = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [streetName, setStreetName] = useState('');

  const locations = {
    Kerala: {
      districts: [
        'Thiruvananthapuram',
        'Kollam',
        'Pathanamthitta',
        'Alappuzha',
        'Kottayam',
        'Idukki',
        'Ernakulam',
        'Thrissur',
        'Palakkad',
        'Malappuram',
        'Kozhikode',
        'Wayanad',
        'Kannur',
        'Kasaragod'
      ]
    },
    // Add other states if needed
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict('');
    setStreetName('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleStreetChange = (e) => {
    setStreetName(e.target.value);
  };

  return (
    <div className="location-selector">
      <h2>Select Location</h2>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        <option value="Kerala">Kerala</option>
        {/* Add more states */}
      </select>

      {selectedState && locations[selectedState] && (
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          {locations[selectedState].districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      )}

      {selectedDistrict && (
        <input
          type="text"
          placeholder="Enter Street Name"
          value={streetName}
          onChange={handleStreetChange}
        />
      )}

      {streetName && (
        <p>Selected Location: {selectedState} > {selectedDistrict} > {streetName}</p>
      )}
    </div>
  );
};

export default LocationSelector;