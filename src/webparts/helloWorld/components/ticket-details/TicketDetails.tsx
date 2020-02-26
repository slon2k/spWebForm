import * as React from 'react'
import { Tickets } from '../../services/api.service';
import TicketHistory from "../ticket-history/TicketHistory";

const TicketDetails = ({ticket}) => {
  console.log("TD", ticket);
  const {Versions} = ticket;
  const currentVersion = Versions[0];
  console.log(currentVersion);

  return (
    <div>
      <h3>{ticket.Title}</h3>
      <TicketHistory versions={Versions}/> 
    </div>
  )
}

export default TicketDetails
