import styles from "./NewTaskForm.module.css";
import plus from "../assets/plus.svg";
import { Task } from "./DisplayTask";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

interface NewTaskFormProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  newTask: string;
  setNewTask: Dispatch<SetStateAction<string>>;
  setCountTask: Dispatch<SetStateAction<number>>
  countTask: number
}

const NewTaskForm = ({
  setTasks,
  newTask,
  setNewTask,
  setCountTask,
  countTask,
}: NewTaskFormProps) => {

  function handleNewTask(e: React.FormEvent) {
    e.preventDefault()
    const newtaskObject = {
      title: newTask,
        done: false,
        id: uuidv4()
    }
    setTasks((prevTasks) => [newtaskObject, ...prevTasks,]);

    setNewTask("")
    setCountTask(countTask + 1)
  }

  return (
    <div>
      <form onSubmit={handleNewTask} className={styles.container}>
        <input
          placeholder="Adicione uma nova tarefa"
          className={styles.input}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.btn}>
          Criar <img src={plus} alt="plus" />
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
