import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Tickets } from "../services/api.service";
import TicketDetails from "../components/ticket-details/TicketDetails";

interface IParams {
  id: string;
}

const DetailsPage: React.FC<RouteComponentProps<IParams>> = ({ match }) => {
  const { id } = match.params;
  const [loading, setLoading] = React.useState(false);
  const [ticket, setTicket] = React.useState({});

  const fetchItem = async () => {
    setLoading(true);
    Tickets.getItem(parseInt(id))
      .then(item => {
        setLoading(false);
        setTicket(item);
      })
      .catch(e => console.error(e));
  };

  React.useEffect(() => {
    fetchItem();
  }, []);

  if (loading) {
    return <div>Loading ticket ...</div>;
  } else {
    return <TicketDetails ticket={ticket}/>;
  }

};

export default DetailsPage;
