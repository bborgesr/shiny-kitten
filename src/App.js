import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Homepage from './components/Homepage';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';
import Projects from './components/projects/Projects';
import ManageProject from './components/projects/ManageProject';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route
          path='/signup'
          render={(props) => <SignUp {...props} mode={'signup'} />}
        />
        <Route
          path='/signin'
          render={(props) => <SignUp {...props} mode={'signin'} />}
        />
        <Route path='/projects' component={Projects} />
        <Route path='/project/:id' component={ManageProject} />
        <Route path='/project' component={ManageProject} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
