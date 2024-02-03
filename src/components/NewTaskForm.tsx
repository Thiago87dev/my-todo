import styles from "./NewTaskForm.module.css";
import plus from "../assets/plus.svg";
import { Task } from "./DisplayTask";
import { ChangeEvent, Dispatch, InvalidEvent, SetStateAction } from "react";
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
    // if(newTask.length === 0){
    //   alert('digite uma nova tarefa')
    //   return
    // }
    const newtaskObject = {
      title: newTask,
        done: false,
        id: uuidv4()
    }
    setTasks((prevTasks) => [newtaskObject, ...prevTasks,]);

    setNewTask("")
    setCountTask(countTask + 1)
  }

  function hendleNewCommentChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity("");
    setNewTask(e.target.value);
  }

  function handleNewCommentInvalid(e: InvalidEvent<HTMLInputElement>){
    e.target.setCustomValidity("Digite uma nova tarefa.")
  }

  return (
    <div>
      <form onSubmit={handleNewTask} className={styles.container}>
        <input
          placeholder="Adicione uma nova tarefa"
          className={styles.input}
          type="text"
          value={newTask}
          onChange={hendleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <button className={styles.btn}>
          Criar <img src={plus} alt="plus" />
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
