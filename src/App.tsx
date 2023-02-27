import React, { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'

import FilterButton from "./components/FilterButton"
import Form from "./components/Form"
import Todo from "./components/Todo"


interface Tasks {
  id: string,
  name: string,
  completed: boolean
}

// @todo この書き正しい？
interface FilterMap {
  [key: string]: (task: { completed: boolean }) => boolean,
}

function App(props: { tasks: Tasks[] }) {
  const { tasks } = props
  const [tasksBase, setTasks] = useState(tasks)
  const [filter, setFilter] = useState('All')

  const listHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const tabIndexHeader = -1 

  const FILTER_MAP: FilterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
  }

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((keyName) => (
    <FilterButton
      key={keyName}
      name={keyName}
      isPressed={keyName === filter}
      setFilter={ setFilter }
    />
  ))

  const editTask = (id: string, newName: string): void => {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  // @todo 無名関数を変数に入れるのはどうなのって話？？
  const addTask = (name: string): void => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id: string): void => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const toggleTaskCompleted = (id: string): void => {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasksBase
    .filter(FILTER_MAP[filter])
    .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))
  const tasksNoun: string = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  const usePrevious = (value: boolean | number) => {
    const ref = useRef<boolean | number>()
    useEffect(() => {
      ref.current = value
    });
    return ref.current
  }

  const prevTaskLength: any | undefined = usePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1 && listHeadingRef.current) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={ addTask } />
      <div className="filters btn-group stack-exception">
        { filterList }
      </div>
      <h2 id="list-heading" tabIndex={tabIndexHeader} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        { taskList }
      </ul>
    </div>
  );
}


export default App;
