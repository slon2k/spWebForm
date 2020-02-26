import * as React from "react";
import TicketList from "../components/ticket-list/TicketList";

const HomePage = ({ tickets, loading }) => {
  console.log("HomePage");
  console.log(tickets, loading);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <TicketList tickets={tickets} />
    </div>
  );
};

export default HomePage;
