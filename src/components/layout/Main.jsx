import { useEffect, useState } from "react";

import Header from "./Header";
import Card from "../Card";
// Import Style:
import '../../styles/components/Main.scss';
import emptyImg from '../../assets/illustration-empty.svg';

// ==== Helper: Get Payment Due:
const getDueDate = function(date, paymentTerm) {
  const clientInvoiceDate = new Date(date);
  // Check for paymentTerm:
  if(!paymentTerm) return date;
  
  const numOfDays = paymentTerm === '' ? 1 : +paymentTerm;
  const dueDate1 = clientInvoiceDate.setDate(clientInvoiceDate.getDate() + numOfDays);
  const dueDate = new Date(dueDate1);
  const local = navigator.language; 

  const options = {
    year: 'numeric',
    month: 'short',
    day:'2-digit',
  }
  console.log(paymentTerm)
  const formatedDueDate = new Intl.DateTimeFormat(local, options).format(dueDate);
  return formatedDueDate;
}


const Main = () => {
  // ==== States:
  // Fetched Data:
  const [loadedData, setData] = useState([]);

  // ==== Fetch data from Firebase:
  useEffect(() => {
    fetch('https://invoice-app-react-a9ade-default-rtdb.firebaseio.com/inputData.json')
      .then(res => res.json())
      .then(data => {
        let dataArr = [];
    
        for (const key in data) {
          const dataObj = {
            keyFirebase: key,
            // Calculated Payment Due:
            duoDate: getDueDate(data[key].clientInvoiceDate, data[key].clientPaymentTerm),
            ...data[key],
          }
          dataArr.push(dataObj);
        };
        
        // IF array is empty:
        if (dataArr.length === 0) throw new Error('Emtpy, pls add cards. 😉');

        setData(dataArr);
      }).catch(err => {
        console.log(`${err}, 🔥`)
      });
  }, []);



  // Check if there is data:
  if (loadedData.length === 0) {
    return (
      <main className='main'>
        <section className='invoice'>
          <Header totalCards={loadedData.length} />
          <div className='main__empty-container'>  
            <img src={emptyImg} alt="Empty Cards"/>
            <div className='main__empty-content'>
              <h2>There is nothing here</h2>
              <p> Create an invoice by clicking the <br /> New Invoice button and get started</p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className='main'>
      <section className='invoice'>
        <Header totalCards={loadedData.length} />
        <div className="invoice__cards">
          {loadedData.map(data => {
            // Get sum totals:
            const total =  data.liInfoArray ? data.liInfoArray.reduce((acc, curr) => acc += curr.total, 0) : data.liInfoArray = 0;
            
            return (
              <Card 
                loadedData={data} 
                clientId={data.clientId}
                date={data.duoDate}
                clientName={data.clientName}
                total={total}
                key={data.clientId}
              />
            );
          })}
        </div>
      </section>
    </main> 
  )
}

export default Main;






