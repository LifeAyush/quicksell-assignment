import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

const KanbanContext = createContext();

const useKanbanContext = () => useContext(KanbanContext);

const KanbanProvider = ({ children }) => {
  const initialGroupingOption =
    localStorage.getItem("groupingOption") || "Status";
  const initialSortOption = localStorage.getItem("sortOption") || "Priority";

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(initialGroupingOption);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [groupedTickets, setGroupedTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Grouping Functions
  const groupTicketsByStatus = useCallback((tickets) => {
    const groupedTickets = [];

    tickets.forEach((ticket) => {
      const status = ticket.status;

      const existingGroup = groupedTickets.find(
        (group) => group.label === status
      );

      if (existingGroup) {
        existingGroup.tickets.push(ticket);
      } else {
        groupedTickets.push({
          label: status,
          tickets: [ticket],
        });
      }
    });

    return groupedTickets;
  }, []);

  const groupTicketsByUser = useCallback((tickets, users) => {
    const groupedTickets = [];

    tickets.forEach((ticket) => {
      const assignedUser = ticket.userId;
      const assignedUserData = users.find((user) => user.id === assignedUser);

      const existingGroup = groupedTickets.find(
        (group) => group.label === assignedUserData.name
      );

      if (existingGroup) {
        existingGroup.tickets.push(ticket);
      } else {
        groupedTickets.push({
          label: assignedUserData.name,
          user: assignedUserData,
          tickets: [ticket],
        });
      }
    });

    return groupedTickets;
  }, []);

  const groupTicketsByPriority = useCallback(
    (tickets) => {
      const groupedTickets = [];

      tickets.forEach((ticket) => {
        const priorityNum = ticket.priority;
        const priority = priorityMap.find(
          (item) => item.id === priorityNum
        ).title;

        const existingGroup = groupedTickets.find(
          (group) => group.label === priority
        );

        if (existingGroup) {
          existingGroup.tickets.push(ticket);
        } else {
          groupedTickets.push({
            label: priority,
            tickets: [ticket],
          });
        }
      });

      groupedTickets.sort((groupA, groupB) => {
        const idA =
          priorityMap.find((item) => item.title === groupA.label)?.id || 0;
        const idB =
          priorityMap.find((item) => item.title === groupB.label)?.id || 0;
        return idB - idA;
      });

      return groupedTickets;
    },
    []
  );

  const computeGroupedTickets = useCallback(() => {
    let groupedTickets = [];

    switch (groupingOption) {
      case "Status":
        groupedTickets = groupTicketsByStatus(tickets);
        break;
      case "User":
        groupedTickets = groupTicketsByUser(tickets, users);
        break;
      case "Priority":
        groupedTickets = groupTicketsByPriority(tickets);
        break;
      default:
        console.error("Invalid grouping option");
    }

    groupedTickets.forEach((group) => {
      group.tickets.sort((a, b) => {
        switch (sortOption) {
          case "Priority":
            return b.priority - a.priority;
          case "Title":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    });

    setGroupedTickets(groupedTickets);
  }, [
    tickets,
    users,
    groupingOption,
    sortOption,
    groupTicketsByPriority,
    groupTicketsByStatus,
    groupTicketsByUser
  ]);

  // Running on each update of groupingOption and sortOption
  useEffect(() => {
    computeGroupedTickets();
  }, [tickets, users, groupingOption, sortOption, computeGroupedTickets]);

  useEffect(() => {
    computeGroupedTickets();
    localStorage.setItem("groupingOption", groupingOption);
    localStorage.setItem("sortOption", sortOption);
  }, [groupingOption, sortOption, computeGroupedTickets]);

  //Styling for Icons
  const iconStyle = { color: "#4C5159", fontSize: "16px" };
  const iconOngoingStyle = { color: "#f1cb4f", fontSize: "16px" };
  const iconErrorStyle = { color: "#fc7941", fontSize: "16px" };
  const iconClickableStyle = {
    color: "#4C5159",
    fontSize: "16px",
    cursor: "pointer",
  };

  const dropdownItems = [
    {
      label: "Grouping",
      selectors: ["Status", "User", "Priority"],
      updateFunction: setGroupingOption,
    },
    {
      label: "Ordering",
      selectors: ["Priority", "Title"],
      updateFunction: setSortOption,
    },
  ];

  const priorityMap = [
    { id: 4, title: "Urgent" },
    { id: 3, title: "High" },
    { id: 2, title: "Medium" },
    { id: 1, title: "Low" },
    { id: 0, title: "No priority" },
  ];

  const contextValue = {
    tickets,
    users,
    groupingOption,
    setGroupingOption,
    sortOption,
    setSortOption,
    dropdownItems,
    iconStyle,
    groupedTickets,
    iconOngoingStyle,
    iconErrorStyle,
    iconClickableStyle,
  };

  return (
    <KanbanContext.Provider value={contextValue}>
      {children}
    </KanbanContext.Provider>
  );
};

export { KanbanProvider, useKanbanContext };
