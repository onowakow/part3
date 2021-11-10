import React from 'react'

const errorStyle = {
  backgroundColor: 'lightGray',
  borderStyle: 'solid',
  borderWidth: 4,
  borderColor: 'red',
  fontSize: 20,
  color: 'red',
  borderRadius: 5,
  padding: 10,
  width: '50%'
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  } else {
    return <div style={errorStyle}>{ message }</div>
  }
}

export default ErrorNotification