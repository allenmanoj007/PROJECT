import React, { useState } from 'react';

const LocationSelector = ({ onLocationChange }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubLocation, setSelectedSubLocation] = useState('');
  const [streetName, setStreetName] = useState('');

  const locations = {
    Kerala: {
      districts: {
        Thiruvananthapuram: {
          subLocations: ['Vazhuthacaud', 'Kowdiar', 'Kattakada', 'Neyyattinkara']
        },
        Kollam: {
          subLocations: ['Kottarakkara', 'Paravur', 'Punalur', 'Karunagappally']
        },
        Pathanamthitta: {
          subLocations: [
            'A',
            'Ammakandakara',
            'Anandapally',
            'Angadi (Kerala)',
            'Angadickal',
            'Angamoozhy',
            'Anicadu',
            'Aranmula',
            'Arukalickal',
            'Aruvappulam',
            'Athikkayam',
            'Ayiroor, Pathanamthitta',
            'C',
            'Chalappally',
            'Chandanapally, Kerala',
            'Chathanthara',
            'Chathenkary',
            'Chekkulam',
            'Chengara',
            'Chenneerkara',
            'Cherickal',
            'Cherukole',
            'Chethakkal',
            'Chittar, Kerala',
            'Chunkappara',
            'E',
            'Edasserimala',
            'Elanthoor',
            'Elavumthitta',
            'Enadimangalam',
            'Enathu',
            'Erathu',
            'Eraviperoor',
            'Erumakkadu',
            'Ezhamkulam',
            'Ezhumattoor',
            'G',
            'Gavi, Kerala',
            'I',
            'Iravon',
            'K',
            'Kadakkad',
            'Kadammanitta',
            'Kadampanad',
            'Kadapra',
            'Kadapra-Koipuram',
            'Kaipattoor',
            'Kaithaparampu',
            'Kalampala',
            'Kalanjoor',
            'Kallooppara',
            'Kattode',
            'Kattoor, Pathanamthitta',
            'Kaviyoor',
            'Kavumbhagom',
            'Keekozhur',
            'Keezhukara',
            'Keezhuvaipur',
            'Kidangannoor',
            'Kizhakken Muthoor',
            'Kodumon',
            'Kodumthara',
            'Koipuram',
            'Kollamula',
            'Konnithazham',
            'Koodal',
            'Kotta, India',
            'Kottanad',
            'Kottangal',
            'Kottathur',
            'Kozhencherry East',
            'Kozhippalam',
            'Kulanada',
            'Kumbanad',
            'Kumbazha',
            'Kumplampoika',
            'Kunnamthanam',
            'Kurampala',
            'Kurangumala',
            'Kurisumuttom, Pathanamthitta',
            'Kuttappuzha',
            'Kuttimannilbethel',
            'Kuttoor (Thiruvalla)',
            'L',
            'Lahai, Kerala',
            'M',
            'Madamon',
            'Malayalappuzha',
            'Mallappuzhassery',
            'Manakala',
            'Manakkayam',
            'Maniyar, Pathanamthitta',
            'Mankuzhipadi',
            'Mannadi',
            'Maramon',
            'Mathoor',
            'Melukara',
            'Mithrapuram',
            'Mulampuzha',
            'Muttumon',
            'Mylapra',
            'N',
            'Nannoor',
            'Naranammoozhy',
            'Naranganam',
            'Nariyapuram',
            'Nedumpuram',
            'Neervilakom',
            'Nellimukal',
            'Nilakkal',
            'Niranam',
            'O',
            'Omallur',
            'Othera',
            'P',
            'Pallickal Nooranadu',
            'Pallikkal, Adoor',
            'Panayannarkavu',
            'Pandalam Thekkekara',
            'Parakode',
            'Pazhakulam',
            'Pazhavangadi (Pathanamthitta)',
            'Peringanadu',
            'Peringara',
            'Perumkunnil Junction',
            'Perumpetty',
            'Perunad',
            'Plappally',
            'Poovanpara',
            'Pottanmala',
            'Prakkanam',
            'Pramadom',
            'Pullad',
            'Punnavely',
            'Puramattam',
            'S',
            'Seethathodu',
            'T',
            'Thadiyoor',
            'Thannithode',
            'Thattayil',
            'Thekkemala',
            'Thekkummala',
            'Thelliyoor',
            'Thonnalloor',
            'Thottakkonam',
            'Thottamon',
            'Thottapuzhassery',
            'Thulappally',
            'Thumpamon',
            'Thuruthicadu',
            'U',
            'Uthimoodu',
            'V',
            'Vadakkadathukavu',
            'Vadasserikara',
            'Vaipur',
            'Valamchuzhy',
            'Vallamkulam',
            'Vallicode',
            'Vallicode-Kottayam',
            'Vanchimoottil Devi Temple',
            'Vayalathala',
            'Vayyattupuzha',
            'Vazhamuttom',
            'Vechoochira'
          ]
        },
        Alappuzha: {
          subLocations: ['Ambalappuzha', 'Chengannur', 'Cherthala', 'Mavelikkara']
        },
        Kottayam: {
          subLocations: ['Pala', 'Kanjirappally', 'Changanassery', 'Vaikom']
        },
        Idukki: {
          subLocations: ['Munnar', 'Thodupuzha', 'Kattappana', 'Devikulam']
        },
        Ernakulam: {
          subLocations: ['Kochi', 'Aluva', 'Muvattupuzha', 'Perumbavoor']
        },
        Thrissur: {
          subLocations: ['Guruvayur', 'Chalakkudy', 'Kunnamkulam', 'Irinjalakuda']
        },
        Palakkad: {
          subLocations: ['Ottapalam', 'Shornur', 'Palakkad Town', 'Kollengode']
        },
        Malappuram: {
          subLocations: ['Manjeri', 'Tirur', 'Perinthalmanna', 'Nilambur']
        },
        Kozhikode: {
          subLocations: ['Vatakara', 'Kozhikode Town', 'Thamarassery', 'Payyoli']
        },
        Wayanad: {
          subLocations: ['Kalpetta', 'Sulthan Bathery', 'Mananthavady', 'Ambalavayal']
        },
        Kannur: {
          subLocations: ['Thalassery', 'Payyanur', 'Taliparamba', 'Kannur Town']
        },
        Kasaragod: {
          subLocations: ['Nileshwar', 'Kanhangad', 'Bekal', 'Kasargod Town']
        }
      }
    }
  };

  const resetLocationFields = () => {
    setSelectedDistrict('');
    setSelectedSubLocation('');
    setStreetName('');
    onLocationChange('');
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    resetLocationFields();
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedSubLocation('');
    setStreetName('');
    updateLocation(selectedState, district, '', '');
  };

  const handleSubLocationChange = (e) => {
    const subLocation = e.target.value;
    setSelectedSubLocation(subLocation);
    setStreetName('');
    updateLocation(selectedState, selectedDistrict, subLocation, '');
  };

  const handleStreetChange = (e) => {
    const street = e.target.value;
    setStreetName(street);
    updateLocation(selectedState, selectedDistrict, selectedSubLocation, street);
  };

  const updateLocation = (state, district, subLocation, street) => {
    let fullLocation = state;
    if (district) fullLocation += ` > ${district}`;
    if (subLocation) fullLocation += ` > ${subLocation}`;
    if (street) fullLocation += ` > ${street}`;
    onLocationChange(fullLocation);
  };

  const currentDistrict = selectedState ? locations[selectedState]?.districts[selectedDistrict] : null;

  return (
    <div className="location-selector">
      <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Location (Optional)</label>
      <select value={selectedState} onChange={handleStateChange} className="input-field mb-2">
        <option value="">Select State</option>
        <option value="Kerala">Kerala</option>
      </select>

      {selectedState && locations[selectedState] && (
        <select value={selectedDistrict} onChange={handleDistrictChange} className="input-field mb-2">
          <option value="">Select District</option>
          {Object.keys(locations[selectedState].districts).map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      )}

      {selectedDistrict && currentDistrict?.subLocations && (
        <select value={selectedSubLocation} onChange={handleSubLocationChange} className="input-field mb-2">
          <option value="">Select Sub-location</option>
          {currentDistrict.subLocations.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      )}

      {selectedSubLocation && (
        <input
          type="text"
          placeholder="Enter Street Name"
          value={streetName}
          onChange={handleStreetChange}
          className="input-field"
        />
      )}
    </div>
  );
};

export default LocationSelector;