import React, { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useKanbanContext } from "../../Hooks/useKanbanContext";

const SelectorOption = ({ label, options }) => {
  const {
    groupingOption,
    setGroupingOption,
    sortOption,
    setSortOption,
    iconStyle,
  } = useKanbanContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (option) => {
    if (label === "Grouping") {
      setGroupingOption(option);
    } else if (label === "Ordering") {
      setSortOption(option);
    }

    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectedOption = label === "Grouping" ? groupingOption : sortOption;

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="displaySelector-dropdown-option" ref={containerRef}>
      <span className="displaySelector-dropdown-option-label">{label}</span>
      <div className="displaySelector-dropdown-option-button-container">
        <button
          className="displaySelector-dropdown-option-button"
          onClick={toggleDropdown}
        >
          <span className="displaySelector-dropdown-option-button-text">
            {selectedOption}
          </span>
          {isOpen ? (
            <ExpandLessIcon sx={iconStyle} />
          ) : (
            <ExpandMoreIcon sx={iconStyle} />
          )}
        </button>
        {isOpen ? (
          <div className="displaySelector-dropdown-option-selector">
            {options.map((option, id) => {
              return (
                <div
                  className="displaySelector-dropdown-option-selector-text"
                  key={id}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectorOption;
