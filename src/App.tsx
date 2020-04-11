import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Homepage from './components/Homepage';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => <Homepage {...props} text={'Shiny Kitten'} />}
        />
        <Route path='/about' component={About} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
