import React, { useEffect, useRef, useState } from "react"

interface TodoProps {
  name: string,
  completed: boolean,
  id: string,
  toggleTaskCompleted: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string, newName: string) => void
}



function Todo(props: TodoProps) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const { name, completed, id, toggleTaskCompleted, deleteTask, editTask } = props

  const editFieldRef = useRef<HTMLInputElement | null>(null)
  const editButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const usePrevious = (value: boolean) => {
    const ref = useRef<boolean>()
    useEffect(() => {
      ref.current = value
    });
    return ref.current;
  }

  const wasEditing = usePrevious(isEditing)

  useEffect(() => {
    if (!wasEditing && isEditing) {
      if (editFieldRef.current) {
        editFieldRef.current.focus()
      }
    } else if (wasEditing && editButtonRef.current) {
        editButtonRef.current.focus();
      }
  }, [wasEditing, isEditing]);

  const editingTemplate = (
    <form
      className="stack-small"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={ editFieldRef }
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={(): void => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={():void => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={(): void => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={():void => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );


  return (
    < li className="todo stack-small" >
      {isEditing ? editingTemplate : viewTemplate}
    </li >
  )
}
export default Todo
