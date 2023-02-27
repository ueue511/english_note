import React from "react"

interface FilterButtonProps {
  name: string,
  isPressed: boolean,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

function FilterButton(props: FilterButtonProps) {
  const { name, isPressed, setFilter } = props
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={(): void => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

export default FilterButton
