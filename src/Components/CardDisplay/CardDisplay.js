import React from "react";
import "./cardDisplay.css";
import Card from "../Card/Card";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useKanbanContext } from "../../Hooks/useKanbanContext";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import ErrorIcon from "@mui/icons-material/Error";
import RemoveIcon from "@mui/icons-material/Remove";
import ReportIcon from "@mui/icons-material/Report";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import profilePic from "../../Assets/profilePic.png";

const CardDisplay = ({ labelParam, tickets }) => {
  const {
    iconStyle,
    iconErrorStyle,
    iconOngoingStyle,
    iconClickableStyle,
    groupingOption,
  } = useKanbanContext();
  const getIconForLabel = (labelParam, groupingOption) => {
    if (groupingOption === "User") {
      return <img src={profilePic} alt="PM" className="card-top-img" />;
    }
    switch (labelParam) {
      case "Todo":
        return <PanoramaFishEyeIcon sx={iconStyle} />;
      case "In progress":
        return <Brightness2Icon sx={iconOngoingStyle} />;
      case "Backlog":
        return <ErrorIcon sx={iconErrorStyle} />;
      case "No priority":
        return <RemoveIcon sx={iconStyle} />;
      case "Urgent":
        return <ReportIcon sx={iconErrorStyle} />;
      case "High":
        return <SignalCellularAltIcon sx={iconStyle} />;
      case "Medium":
        return <SignalCellularAlt2BarIcon sx={iconStyle} />;
      case "Low":
        return <SignalCellularAlt1BarIcon sx={iconStyle} />;
      default:
        return null;
    }
  };

  const icon = getIconForLabel(labelParam, groupingOption);

  return (
    <div className="card-display-continer">
      <div className="card-display-title-block">
        <div className="card-display-title">
          {icon}
          <span className="card-display-title-text">{labelParam}</span>
          <span className="card-display-title-num">{tickets.length}</span>
        </div>
        <div className="card-display-actions">
          <AddIcon sx={iconClickableStyle} />
          <MoreHorizIcon sx={iconClickableStyle} />
        </div>
      </div>
      <div className="card-flex">
        {tickets.map((ticket) => {
          return <Card data={ticket} key={ticket.id} />;
        })}
      </div>
    </div>
  );
};

export default CardDisplay;
