import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './authentication/Home';
import PageNotFound from './authentication/PageNotFound';
import DashBoard from './dashBoard/DashBoard';
import '../style/style.scss';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={DashBoard} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
