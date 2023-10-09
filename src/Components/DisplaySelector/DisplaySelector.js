import React, { useState, useEffect, useRef } from "react";
import "./displaySelector.css";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SelectorOption from "./SelectorOption";
import { useKanbanContext } from "../../Hooks/useKanbanContext";

const DisplaySelector = () => {
  const { dropdownItems, iconStyle } = useKanbanContext();
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpen(false);
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
    <div className="displaySelector-container" ref={containerRef}>
      <button
        className="displaySelector-button"
        onClick={() => setOpen(!isOpen)}
      >
        <TuneIcon sx={iconStyle} />
        <span className="displaySelector-button-text">Display</span>
        {isOpen ? (
          <ExpandLessIcon sx={iconStyle} />
        ) : (
          <ExpandMoreIcon sx={iconStyle} />
        )}
      </button>
      {isOpen ? (
        <div className="displaySelector-dropdown">
          {dropdownItems.map((item, id) => (
            <SelectorOption
              key={id}
              label={item.label}
              options={item.selectors}
              onSelect={(option) => item.updateFunction(option)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DisplaySelector;
