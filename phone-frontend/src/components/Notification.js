import React from 'react'

const notificationStyle = {
  backgroundColor: 'lightGray',
  borderStyle: 'solid',
  borderWidth: 4,
  borderColor: 'green',
  fontSize: 20,
  color: 'green',
  borderRadius: 5,
  padding: 10,
  width: '50%'
}


const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  } else {
    return <div style={notificationStyle}>{ message }</div>
  }

}

export default Notification