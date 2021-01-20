import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
<<<<<<< HEAD

=======
>>>>>>> 427cb0119e90f90cc7bcfffccb6f1989bc90913f
import Logout from './components/Logout';
import Home from './components/Home';
import QuizPage from './components/QuizPage';
import Topscores from './components/TopScores';
import './App.css';
import Register from './components/Register';
import { Component } from 'react';
import Profile from './components/Profile';
import axios from 'axios';

//I changed this to a class component. It is just makes more sense to my brain
class App extends Component {
  //state lives here as blank strings
  state = {
    difficulty: 'easy',
    category: '9',
    data: {},
    name: "Guest",
  };

  componentDidMount() {
    //when the page loads for the first time it sets the state to defauls easy and general knowledge - if you just write them in the state it hard codes them
    // this.setState({ difficulty: 'easy', category: '9' });
    axios.get('/topscores').then((res) => {
      this.setState({
        data: res.data,
      });
      console.log(res.data);
    });
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

  dataHandler = (scoredata)=> {
    let dataObj = this.state.data
    let temp= [...this.state.data.scores]
    temp.push(scoredata)
    dataObj.scores = temp
    this.setState({data: dataObj})
  }

  nameHandler= (namedata) => {
    
    
    this.setState({name: namedata})

    console.log(this.state.name)
  }



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
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  diffHandler={this.diffHandler}
                  catHandler={this.catHandler}
                  state={this.state}
                  category={this.state.category}
                  difficulty={this.state.difficulty}
                  data={this.state.data}
                />
              )}
<<<<<<< HEAD
            /> 
=======
            />
>>>>>>> 427cb0119e90f90cc7bcfffccb6f1989bc90913f
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" render = {(props) => (
            <Register nameHandler={this.nameHandler}/>
            )} />
            <Route exact path="/logout" component={Logout} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route
              exact
              path="/quiz"
              render={(props) => (
                <QuizPage
                  category={this.state.category}
                  difficulty={this.state.difficulty}
                  dataHandler={this.dataHandler}
                />
              )}
            />
            <Route
              exact
              path="/topscores"
              render={(props) => <Topscores data={this.state.data.scores} />}
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
