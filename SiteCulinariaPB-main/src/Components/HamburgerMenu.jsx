import React, { useState } from 'react';

const HamburgerMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hamburger-menu">
      <button
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isOpen && (
        <div className="menu-items">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="menu-item"
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
            >
              {item.icon} {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
