import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";

const App = (props) => {
  const history = useHistory();

  return (
    <Layout className="pageLayout">
      <Router history={history}>
        <Route component={Navigation} />
      </Router>
    </Layout>
  );
};

export default App;
