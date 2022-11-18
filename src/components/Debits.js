/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }

  const newDebit = (event) =>{                                                        //event-handler
    event.preventDefault();
    let newDate = new Date().toISOString();                                           //need to capture input
    let newAmount = event.target.amount.value;
    let newDescr = event.target.description.value;
    let newID = Math.floor(Math.random()*1000000000);                                 //random ID
    props.addDebit(newID, newAmount, newDescr, newDate);
  }
  // Render the list of Debit items and a form to input new Debit item                //h2 is to show balance, step for rounding
  return (
    <div>
      <h1>Debits</h1>
      <h2><AccountBalance accountBalance={props.accountBalance}/></h2>               

      {debitsView()}

      <form onSubmit={newDebit}>
        <input type="text" name="description" step=".01"/>                            
        <input type="number" name="amount" step=".01"/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Debits;