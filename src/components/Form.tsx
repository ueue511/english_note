import React, { useState } from "react"

function Form (props: {addTask:(name: string)=> void}) {
  const { addTask } = props
  const [name, setName] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTask(name || '無記入')
    setName('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        What needs to be done?
      </h2>
      <label htmlFor="new-todo-input" className="label__lg">
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  )
}

export default Form
