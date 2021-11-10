import People from './components/People'
import Search from './components/Search'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {

  // State declarations
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  

  // Handler functions
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Check if name exists
    const names = persons.map(person => person.name)
    if (names.indexOf(newName) !== -1) {
      // Is this the best place for this alert function? Should it be in another component?
      const isUpdate = window.confirm(`${newName} is already added to the phonebook. Replace old number with new one?`)

      // Find person's id
      const id = persons.find(person => person.name === newName).id
      console.log(id);

      // Update person at that id
      if (isUpdate) {
        personService
          .update(id, newPerson)
          .then(response => {
            // Replace old person data with updated data
            setPersons(persons
              .map(person => {
                return person.id !== id ? person
                : newPerson
              })
            )
            setMessage(`${newPerson.name} updated.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Person ${newPerson.name} was already deleted.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      // Stop executing parent (addPerson) function.
      return;
    }

    // Create new person.
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewNumber('')
        setNewName('')
        setMessage(`${newPerson.name} added to phonebook`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  const handleDelete = (event) => {
    // value is a string. Must be parsed for strict equality.
    const id = parseInt(event.target.value)
    const name = persons.find(person => person.id === id).name
    const isConfirmDelete = window.confirm(`Are you sure you want to delete ${name}?`)
    if (isConfirmDelete) {
      personService
        .remove(id)
        .then( response => {
          setPersons(persons
            .filter(person => person.id !== id))
          setMessage(`Person ${name} deleted`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setErrorMessage(`Person ${name} was already deleted.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={message} />
      <h3>Filter shown with</h3>
      <Search handleQuery={handleQuery} />
      <h3>Add new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h3>Numbers</h3>
      <People handleDelete={handleDelete} persons={persons} query={query} />
    </div>
  )
}

export default App;
