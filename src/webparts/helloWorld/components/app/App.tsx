import * as React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IAppProps } from "./IAppProps";
import styles from "./App.module.scss";
import HomePage from "./../../pages/HomePage";
import FormPage from "./../../pages/FormPage";
import { User, Tickets } from "../../services/api.service";

const App: React.FC<IAppProps> = ({}) => {
  const [items, setItems] = React.useState([]);
  const [loadingItems, setLoadingItems] = React.useState(false);

  React.useEffect(() => {
    setLoadingItems(true);
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoadingItems(true);
    Tickets.getList()
      .then(items => setItems(items))
      .then(() => setLoadingItems(false))
      .catch(e => {
        console.error(e);
      });
  };

  const fetchItem = async (id: number) => {
    Tickets.getItem(id)
      .then(item => console.log(item))
      .catch(e => console.error(e));
  };

  const fetchUser = async () => {
    const user = await User.getCurrentUser();
    console.log(user);
  };

  const fetchList = async () => {
    const list = await Tickets.getList();
    console.log(list);
  };

  const addItem = async (form) => {
    Tickets.addItem(form)
      .then(r => console.log(r))
      .then(fetchItems)
      .catch(e => console.error(e));
  };

  if (loadingItems) {
    return <div>Loading ...</div>;
  }

  console.log("Items: ", items);

  return (
    <Router>
      <div className={styles.App}>
        <div className={styles.container}>
          <h1 className={styles.title}>App</h1>
          <div>
            <h2>Links:</h2>
            <Link to="/">Home</Link>
            <Link to="/form">Form</Link>
          </div>
          <Switch>
            <Route path="/form">
              <FormPage addItem={addItem}/>
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
          </Switch>
          <ul>
            {items.map(item => (
              <li key={item.Id}>{item.Title}</li>
            ))}
          </ul>
        </div>
        <button onClick={fetchItems}>fetch items</button>
        <button onClick={() => fetchItem(2)}>fetch item</button>
        <button
          onClick={() => Tickets.getListForAuthor(11).then(r => console.log(r))}
        >
          list for author
        </button>
        <button onClick={fetchUser}>fetch user</button>
        <button onClick={fetchList}>fetch list</button>
      </div>
    </Router>
  );
};

export default App;
