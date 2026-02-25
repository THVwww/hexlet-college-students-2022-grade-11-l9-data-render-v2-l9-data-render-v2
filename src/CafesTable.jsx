import React, { useEffect, useState } from 'react';
import FilterCafes from './FilterCafes';

const placeholderImage = 'https://via.placeholder.com/150';

export default function CafesTable() {
  const [cafes, setCafes] = useState([]);
  const [selectedSubway, setSelectedSubway] = useState('All');

  
  useEffect(() => {
    fetch('/cafes')
      .then((response) => response.json())
      .then((data) => setCafes(data))
      .catch((error) => console.error('Error fetching cafes:', error));
  }, []);

  
  const filteredCafes = selectedSubway === 'All'
    ? cafes
    : cafes.filter((cafe) => cafe.subway === selectedSubway);

  return (
    <div id="container" className="container m-3">
      <div className="cafesTable">
       
        <FilterCafes 
          selectedSubway={selectedSubway} 
          onSubwayChange={setSelectedSubway} 
        />
        
        
        <ul className="cardsList">
          {filteredCafes.map((cafe) => (
            <li key={cafe.id} className="card">
              <img 
                src={cafe.image || placeholderImage} 
                alt={cafe.name} 
              />
              <h2>{cafe.name}</h2>
              <p>{cafe.description}</p>
              <p>{cafe.address}</p>
              <p>Subway: {cafe.subway}</p>
              <p>{cafe.hours}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
