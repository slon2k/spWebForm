import * as React from "react";
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { IAppProps } from "./IAppProps";
import styles from "./App.module.scss";
import HomePage from "./../../pages/HomePage"
import FormPage from "./../../pages/FormPage";
import { SPHttpClient } from "@microsoft/sp-http";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import '@pnp/sp/site-users';


const App: React.FC<IAppProps> = ({ spHttpClient, currentSiteUrl }) => {
  const [items, setItems] = React.useState([]);
  const [loadingItems, setLoadingItems] = React.useState(false);
  const endpoint: string = `${currentSiteUrl}/_api/web/lists/GetByTitle('Helpdesk')/items`;

  React.useEffect(() => {
    setLoadingItems(true);
    spHttpClient
      .get(endpoint, SPHttpClient.configurations.v1)
      .then(res => res.json())
      .then(res => setItems(res.value))
      .then(() => setLoadingItems(false))
      .catch(e => console.error(e));
  }, []);

  const fetchItems = async () => {
    const list = sp.web.lists.getByTitle("Helpdesk");
    const r = await list.items.select("Id", "Title", "Author/Id", "Author/Title").expand("Author/Id").getAll();
    console.log(r);
  };

  const fetchItem = async () => {
    const list = sp.web.lists.getByTitle("Helpdesk");
    const r = await list.items.getById(2).select('Comments', 'Status', 'Editor/Id', 'Versions').expand('Versions').get();
    console.log(r);
  };

  const fetchUser = async () => {
    const user = await sp.web.currentUser.get();
    console.log(user);
  }

  const fetchList = async () => {
    const list = await sp.web.lists.getByTitle("Helpdesk").get();
    console.log(list);
  }

  const addItem = async () => {
    const result = await sp.web.lists.getByTitle("Helpdesk").items.add({ Title: "Next item" });
    result.item.get().then(r => console.log(r));
  }

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
            <Route path="/form"><FormPage /></Route>
            <Route path="/" exact ><HomePage /></Route>
          </Switch>
          <p>{currentSiteUrl}</p>
          <ul>
            {items.map(item => (
              <li key={item.Id}>{item.Title}</li>
            ))}
          </ul>
        </div>
        <button onClick={fetchItems}>fetch items</button>
        <button onClick={fetchItem}>fetch item</button>
        <button onClick={fetchUser}>fetch user</button>
        <button onClick={fetchList}>fetch list</button>
        <button onClick={addItem}>add item</button>
      </div>
    </Router>
  );
};

export default App;
