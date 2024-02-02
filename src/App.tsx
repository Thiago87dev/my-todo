import { useEffect, useState } from "react";
import "./App.css";
import DisplayTask, { Task } from "./components/DisplayTask";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem("tasks") || "[]"));
  const [countTask, setCountTask] = useState(JSON.parse(localStorage.getItem("countTask") || "0"));
  const [countDone, setCountDone] = useState(JSON.parse(localStorage.getItem("countDone") || "0"));

  useEffect(() => {
    
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("countTask", JSON.stringify(countTask));
      localStorage.setItem("countDone", JSON.stringify(countDone));
   
  }, [tasks, countDone, countTask]);

  return (
    <>
      <div className="container">
        <Header />
        <div className="mainContent">
          <NewTaskForm
            setTasks={setTasks}
            newTask={newTask}
            setNewTask={setNewTask}
            countTask={countTask}
            setCountTask={setCountTask}
          />
          <DisplayTask
            countDone={countDone}
            setCountDone={setCountDone}
            setTasks={setTasks}
            tasks={tasks}
            countTask={countTask}
            setCountTask={setCountTask}
          />
        </div>
      </div>
    </>
  );
}

export default App;
