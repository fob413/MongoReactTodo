import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './authentication/Signup';
import PageNotFound from './authentication/PageNotFound';
// import '../style/style.scss';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
