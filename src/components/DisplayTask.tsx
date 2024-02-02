import styles from "./DisplayTask.module.css";
import empty from "../assets/empty.svg";
import notDone from "../assets/notDone.svg";
import dump from "../assets/dump.svg";
import done from "../assets/done.svg";

import { Dispatch, SetStateAction } from "react";

export interface Task {
  title: string;
  done: boolean;
  id: string;
}

interface DisplayTaskPros {
  tasks: Task[];
  countTask: number;
  countDone: number
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setCountTask: Dispatch<SetStateAction<number>>
  setCountDone: Dispatch<SetStateAction<number>>
}

const DisplayTask = ({ tasks, countTask, countDone, setTasks, setCountTask, setCountDone }: DisplayTaskPros) => {

  function handleDoneTask(taskId: string) {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
    const taskToMarkDone = tasks.find((task) => task.id === taskId);
    if (taskToMarkDone) {
      setTasks((prevState) => [
        ...prevState,
        { ...taskToMarkDone, done: true },
      ]);
    }
    setCountDone(countDone + 1)
  }

  function handleUndo(taskId: string) {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
    const taskToUndo = tasks.find((task) => task.id === taskId);
    if (taskToUndo) {
      setTasks((prevState) => [{ ...taskToUndo, done: false }, ...prevState]);
    }
    setCountDone(countDone - 1)
  }

  function handleDelete(taskId: string, done: boolean) {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
    setCountTask(countTask - 1)
    if(done === true) setCountDone(countDone - 1)
  }
  return (
    <div className={styles.displayContainer}>
      <div className={styles.headerDisplayContainer}>
        <div className={styles.createdTasks}>
          <p className={styles.textCreatedTasks}>Tarefas criadas</p>
          <div className={styles.countCreatedTasks}>{countTask}</div>
        </div>
        <div className={styles.completedTasks}>
          <p className={styles.textCompletedTasks}>Concluidas</p>
          <div className={styles.countCompletedTasks}>{countDone} de {countTask}</div>
        </div>
      </div>
      <div className={styles.listTasks}>
        {tasks.length === 0 ? (
          <div className={styles.empty}>
            <img src={empty} alt="empty" />
            <p className={styles.bold}>
              Você ainda não tem tarefas cadastradas
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          tasks.map((task) =>
            task.done === false ? (
              <div key={task.id} className={styles.tasks}>
                <img
                  onClick={() => handleDoneTask(task.id)}
                  src={notDone}
                  alt="notDone"
                />
                <p className={styles.titleTask}>{task.title}</p>
                <img
                  src={dump}
                  alt="dump"
                  onClick={() => handleDelete(task.id, task.done)}
                />
              </div>
            ) : (
              <div key={task.id} className={styles.tasks}>
                <img
                  onClick={() => handleUndo(task.id)}
                  src={done}
                  alt="done"
                />
                <p className={styles.titleTaskDone}>{task.title}</p>
                <img
                  src={dump}
                  alt="dump"
                  onClick={() => handleDelete(task.id, task.done)}
                />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default DisplayTask;
