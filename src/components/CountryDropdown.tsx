import React, { useState } from 'react';

const CountryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    // Handle the selected option here
  };

  return (
    <div className="dropdown">
      <button onClick={handleButtonClick}>Select a country</button>
      {isOpen && (
        <ul>
          <li onClick={() => handleOptionClick('Option 1')}>Option 1</li>
          <li onClick={() => handleOptionClick('Option 2')}>Option 2</li>
          <li onClick={() => handleOptionClick('Option 3')}>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default CountryDropdown;
