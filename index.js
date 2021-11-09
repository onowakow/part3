// As with program wrote in part3-notes, this line is akin to import express from 'express'
const express = require("express");
// express is a function, called here to create an app. The app is stored in app.
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// request is information of http request. Response is how request is responded to 
app.get('/', (request, response) => {
  response.send('<h1>Index</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const personsLength = persons.length
  response.send(
    `
      <p>Phonebook has info for ${personsLength}</p>
      <p>${Date()}</p>
    `
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
