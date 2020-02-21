import * as React from "react";
import { IAppProps } from "./IAppProps";
import styles from "./App.module.scss";
import { SPHttpClient } from "@microsoft/sp-http";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

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
    const r = await list.items.getAll();
    console.log(r);
  };

  if (loadingItems) {
    return <div>Loading ...</div>;
  }

  console.log("Items: ", items);

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <h1 className={styles.title}>App</h1>
        <p>{currentSiteUrl}</p>
        <ul>
          {items.map(item => (
            <li key={item.Id}>{item.Title}</li>
          ))}
        </ul>
      </div>
      <button onClick={fetchItems}>fetch</button>
    </div>
  );
};

export default App;
