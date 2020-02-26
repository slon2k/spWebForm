import * as React from "react";
import { Link } from "react-router-dom";

const TicketList = ({tickets}) => {
  return (
    <div>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}><Link to={`/ticket/${ticket.Id}`}>{ticket.Title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
