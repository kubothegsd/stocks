import React, { useState } from 'react';

const MarketCapSortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    // Handle the selected option here
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={handleButtonClick}>Select market cap</button>
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

export default MarketCapSortDropdown;
