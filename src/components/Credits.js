/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  let creditsView = () => {
    const {credits} = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    })
  }

const newCredit = (event) =>{
  let newDate = new Date().toISOString();
  let newAmount = event.target.amount.value;
  let newDescr = event.target.description.value;
  let newID = newDate;
  this.props.addCredit(newID, newAmount, newDescr, newDate);
}
  return (
    <div>
      <h1>Credits</h1>
      {creditsView()}
      <br/>
      <form onSubmit={newCredit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">AddCredit</button>
      </form>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;