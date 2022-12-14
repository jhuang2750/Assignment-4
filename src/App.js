/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      debitList: [],
      creditList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    }
  }

  async componentDidMount(){                                                                 //addapted from code shown in lectures
    let debitAPI = 'https://moj-api.herokuapp.com/debits';                                  //access debit API
    try {
      let response = await axios.get(debitAPI);
      console.log(response); 
      this.setState({debitList: response.data});                                            //fill debit array
      //Personal reminder: sum the total 
    } 
    catch (error) {
      if (error.response) {
        console.log(error.response.data);  
        console.log(error.response.status); 
      }    
    }

    let creditAPI = 'https://moj-api.herokuapp.com/credits';                                //access credit API
    try {
      let response = await axios.get(creditAPI);                    
      console.log(response);
      this.setState({creditList: response.data});                                           //fill credit array
      //Personal reminder: sum the total
    }
    catch (error) {
      if (error.response){
        console.log(error.reponse.data);
        console.log(error.reponse.status);
      }
    }

    let tmpBalance = this.state.accountBalance;                                             //should have two populated arrays
    for(let element of this.state.creditList){                                              //+/- until we get "beginning" balance
      tmpBalance += element.amount;
    }
    for(let element of this.state.debitList){
      tmpBalance -= element.amount;
    }
    this.setState({accountBalance: Number(tmpBalance).toFixed(2)});                         //update accountBalance and rounding
  }

  addDebit = (newID, newAmount, newDescr, newDate) =>{
    //console.log("test in debit");
    let tmpDebitList = this.state.debitList;
    tmpDebitList.push({id: newID, amount: newAmount, description: newDescr, date: newDate});          //same as addCredit, just different way of  making object
    this.setState({debitList: tmpDebitList});

    let tmpBalance = this.state.accountBalance;
    tmpBalance -= newAmount;
    this.setState({accountBalance: Number(tmpBalance).toFixed(2)});
  }

  addCredit = (newID, newAmount, newDescr, newDate) =>{
    //console.log("test in credit");
    let tmpCreditList = this.state.creditList;                                  //need a array for setState
    let creditObj = {                                                           //create an object to append to array
      id: newID,
      amount: newAmount,
      description: newDescr,
      date: newDate
    }
    tmpCreditList.push(creditObj);
    this.setState({creditList: tmpCreditList});

    let tmpBalance = this.state.accountBalance;
    //tmpBalance = Number(tmpBalance);
    newAmount = Number(newAmount);                                              //adding numbers were concatenating to the end of balance rather than adding
    tmpBalance = Number(tmpBalance);                                            //I suspect lines 85-89 resulted in some strings instead of numbers, only happens here
    tmpBalance += newAmount;                                                    //converted everything to numbers for a quick fix
    this.setState({accountBalance: tmpBalance.toFixed(2)});                     //rounding
  }
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 
    //Personal reminder: add CreditsComponent later
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>)
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;