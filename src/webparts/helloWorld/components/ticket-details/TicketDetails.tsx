import * as React from 'react'

const TicketDetails = ({ticket}) => {
  console.log("TicketDetails", ticket);
  return (
    <div>
      <h3>{ticket.Title}</h3>
    </div>
  )
}

export default TicketDetails
