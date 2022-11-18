/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {                                                              //adapted from the given Debits code
  let creditsView = () => {
    const {credits} = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    })
  }

const newCredit = (event) =>{                                                             //event-handler, same as the Debit version
  event.preventDefault();
  let newDate = new Date().toISOString();
  let newAmount = event.target.amount.value;
  let newDescr = event.target.description.value;
  let newID = Math.floor(Math.random()*1000000000);
  props.addCredit(newID, newAmount, newDescr, newDate);
}
  return (
    <div>
      <h1>Credits</h1>
      <h2><AccountBalance accountBalance={props.accountBalance}/></h2>
      {creditsView()}
      <br/>
      <form onSubmit={newCredit}>
        <input type="text" name="description" step=".01"/>                                 
        <input type="number" name="amount" step=".01"/>
        <button type="submit">AddCredit</button>
      </form>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;