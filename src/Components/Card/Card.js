import React from "react";
import "./card.css";
import profilePic from "../../Assets/profilePic.png";
import { useKanbanContext } from "../../Hooks/useKanbanContext";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import ErrorIcon from "@mui/icons-material/Error";
import RemoveIcon from "@mui/icons-material/Remove";
import ReportIcon from "@mui/icons-material/Report";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";

const Card = ({ data }) => {
  const { iconStyle, iconErrorStyle, iconOngoingStyle } = useKanbanContext();
  const labelParam = data.status;
  const getIconForLabel = (labelParam) => {
    switch (labelParam) {
      case "Todo":
        return <PanoramaFishEyeIcon sx={iconStyle} />;
      case "In progress":
        return <Brightness2Icon sx={iconOngoingStyle} />;
      case "Backlog":
        return <ErrorIcon sx={iconErrorStyle} />;
      default:
        return null;
    }
  };
  const icon = getIconForLabel(labelParam);

  const getIconforPriority = (data) => {
    const priority = data.priority;
    switch (priority) {
      case 0:
        return <RemoveIcon sx={iconStyle} />;
      case 4:
        return <ReportIcon sx={iconErrorStyle} />;
      case 3:
        return <SignalCellularAltIcon sx={iconStyle} />;
      case 2:
        return <SignalCellularAlt2BarIcon sx={iconStyle} />;
      case 1:
        return <SignalCellularAlt1BarIcon sx={iconStyle} />;
      default:
        return null;
    }
  };
  const priorityIcon = getIconforPriority(data);

  return (
    <div className="card-continer">
      <div className="card-top">
        <span className="card-top-text">{data.id}</span>
        <img src={profilePic} alt="user" className="card-top-img" />
      </div>
      <div className="card-middle">
        {icon}
        <div className="card-middle-text">{data.title}</div>
      </div>
      <div className="card-btm-flex">
        <div className="card-btm-priority">{priorityIcon}</div>
        {data.tag.map((tag, id) => {
          return (
            <div className="card-btm" key={id}>
              <div className="radio" />
              <div className="card-btm-text">{tag}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
