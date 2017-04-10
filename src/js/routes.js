import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import stores from './stores';
import Container from './pages/Container';

useStrict(true);

const routes = (
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route component={Container}>
        <IndexRoute component={Container} />
        <Route path="/" component={Container} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
