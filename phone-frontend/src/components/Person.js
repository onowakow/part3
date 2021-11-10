import React from 'react'

const Person = ({person, handleDelete}) => {
    return (
      <div>
        <p>
          {person.name} {person.number}
          <button value={person.id} onClick={handleDelete}>Delete</button>
        </p>
      </div>
    )
  }

export default Person