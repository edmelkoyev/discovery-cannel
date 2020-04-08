import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TabDiscovery from './TabDiscovery'
import TabBuilder from './TabBuilder'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/builder">
            <TabBuilder />
          </Route>
          <Route path="/">
            <TabDiscovery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
