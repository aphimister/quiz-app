import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import QuizPage from './components/QuizPage';
import './App.css';
import Register from './components/Register';
import { Component } from 'react';

//I changed this to a class component. It is just makes more sense to my brain
class App extends Component {
  //state lives here as blank strings
  state = {
    difficulty: '',
    category: '',
    // api: "",
  };

  componentDidMount() {
    //when the page loads for the first time it sets the state to defauls easy and general knowledge - if you just write them in the state it hard codes them
    this.setState({ difficulty: 'easy', category: '9' });
  }

  //This is the difficulty tracker / state handler
  diffHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({ difficulty: value });
  };

  //This is the category tracker / state handler
  catHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({ category: value });
  };

  //Have to use render as it is now a class component
  render() {
    console.log(this.state.difficulty);
    console.log(this.state.category);

    return (
      <>
        <BrowserRouter>
          <Nav />
          <Switch>
            {/* In this setup you have to use this render property to pass props because it is a Route */}
            {/* <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  diffHandler={this.diffHandler}
                  catHandler={this.catHandler}
                  state={this.state}
                  category={this.state.category}
                  difficulty={this.state.difficulty}
                />
              )}
            /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/"
              component={QuizPage}
              render={(props) => (
                <QuizPage
                  category={this.state.category}
                  difficulty={this.state.difficulty}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
