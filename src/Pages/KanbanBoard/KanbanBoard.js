import React from "react";
import "./kanbanBoard.css";
import Navbar from "../../Components/Navbar/Navbar";
import CardDisplay from "../../Components/CardDisplay/CardDisplay";
import { useKanbanContext } from "../../Hooks/useKanbanContext";

const KanbanBoard = () => {
  const { groupedTickets } = useKanbanContext();

  return (
    <div className="home-container">
      <Navbar />
      <div className="card-display-flex">
        {groupedTickets.map((group, id) => {
          return (
            <CardDisplay
              key={id}
              labelParam={group.label}
              tickets={group.tickets}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
