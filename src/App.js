import { KanbanProvider } from "./Hooks/useKanbanContext";
import KanbanBoard from "./Pages/KanbanBoard/KanbanBoard";

const App = () => {
  return (
    <KanbanProvider>
      <KanbanBoard />
    </KanbanProvider>
  );
};

export default App;
