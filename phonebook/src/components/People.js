import React from "react";
import Person from './Person'


const People = ({ persons, query, handleDelete}) => {
    const filteredPersons = persons.filter(person => (
        person.name
        .toLowerCase()
        .includes(query.toLowerCase())
    ))
  return filteredPersons.map((person) => <Person handleDelete={handleDelete} key={person.name} person={person} />);
};

export default People;
