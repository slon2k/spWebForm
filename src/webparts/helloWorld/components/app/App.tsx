import * as React from "react";
import { IAppProps } from "./IAppProps";
import styles from "./App.module.scss";
import { SPHttpClient } from "@microsoft/sp-http";

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
    </div>
  );
};

export default App;
