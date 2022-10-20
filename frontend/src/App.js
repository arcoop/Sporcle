import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import QuizCreation from './components/QuizCreateComponent';
import QuizForm from './components/QuizCreateFormComponent';
import QuizEditForm from './components/QuizEditFormComponent';
import QuizIndex from './components/QuizIndexComponent';
import QuizShow from './components/QuizShowComponent';
import UserShow from './components/UserShowComponent';
import Footer from './components/Navigation/Footer';
import QuizByCategory from './components/QuizByCategoryIndexComponent';
import CategoriesIndex from './components/CategoryIndexComponent';

function App() {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Navigation />
        </Route>
        <Route exact path={"/quizzes"}>
          <Navigation/>
          <QuizIndex />
        </Route>

        <Route path={"/users/:id"}>
          <UserShow />
        </Route>

        <Route exact path={"/create"}>
          <Navigation />
          <QuizCreation />
        </Route>

        <Route path="/create/new">
          <QuizForm />
        </Route>

        <Route path="/create/edit/:quizId">
          <Navigation />
          <QuizEditForm/>
        </Route>

        <Route path="/quizzes/:quizId">
          <Navigation />
          <QuizShow />
        </Route>

        <Route exact path='/categories'>
          <Navigation />
          <CategoriesIndex />
        </Route>

        <Route exact path="/categories/:categoryId/">
          <Navigation />
          <QuizByCategory />
        </Route>

        <Route>
          <h1>path not found</h1>
        </Route>
        
      </Switch>

    </>
  );
}

export default App;
