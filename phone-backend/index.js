// As with program wrote in part3-notes, this line is akin to import express from 'express'
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
// express is a function, called here to create an app. The app is stored in app.
const app = express();
// Cross-origin resource sharing. Allows servers to communicate
app.use(cors())

// For post request, data must be parsed as JSON
app.use(express.json())

// morgan middleware
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (!person) {
    response.status(404).end()
  } else {
    response.json(person)
  }
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return parseInt(Math.random()*10000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  // If name is missing, return error
  if (!body.name) {
    return response.status(400).json({
      error: 'entries must have names'
    })
  }

  // If number is missing, return error
  if (!body.number) {
    return response.status(400).json({
      error: 'entries must include phone number'
    })
  }
  
  // Check if name already exists
  const name = request.body.name
  // holds index or undefined if name already exists or does not exist (respectively)
  const check = persons.find(person => person.name === name)
  // If name exists, return error
  if (check !== undefined) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    date: new Date(),
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
