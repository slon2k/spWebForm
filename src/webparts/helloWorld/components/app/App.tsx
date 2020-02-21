import * as React from "react";
import { IAppProps } from "./IAppProps";
import styles from "./App.module.scss";

const App: React.FC<IAppProps> = props => {
  React.useEffect(() => {
    console.log("Effect", props);
  }, []);
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <h1 className={styles.title}>App</h1>
        <p>{props.currentSiteUrl}</p>
      </div>
    </div>
  );
};

export default App;
