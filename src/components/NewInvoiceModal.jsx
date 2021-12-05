
import { useEffect, useReducer, useState } from 'react';
// Import Style:
import '../styles/components/NewInvoiceModal.scss';
import NewInvoiceModalLiItem from './NewInvoiceModalLiItem';

// ==== Helper: Generate random ID:
const words ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const num = '0123456789';

function generateString(length, characters) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  };
  return result;
};

// === Initial State:
const initialState = {
  // Bill From:
  addressFrom: '',
  cityFrom: '',
  postCodeFrom: '',
  countryFrom: '',
  // Bill To:
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  clientCity: '',
  clientPostCode: '',
  clientCountry: '',
  clientInvoiceDate: '',
  clientPaymentTerm: '',
  clientDescription: '',
}

const reducer = function(state, action) {  
  return (
    {...state, [action.input] : action.value }
  );
}

const NewInvoiceModal = ({closeModal}) => {
  // === State:
  const [liPriceItem, setLiPriceItem] = useState([]);
  
  // === Reducer:
  const [inputObj, dispatch] = useReducer(reducer, initialState);
  //  console.log(inputObj, 'Reducer obj'); //🔥 Ceo inputObj saljem

  // === Li items Inf.
  const [liInfoArray, setLiInfoArray] = useState([]);
  // console.log(liInfoArray, 'Array za slanje')

  // === Status:
  const [status, setDraft] = useState('pending');

  // === Functons:
  const setLiInfoArrayHandler = function(data) {
    if (Object.values(data).every(value => value !== '' && value !== 0)) {
      setLiInfoArray(prevArray => [...prevArray, data]);
    } 
  }

  const onChange = function(e) {
    const action = {
      input: e.target.name,
      value: e.target.value,
    }

    dispatch(action);
  }

  // === Validate state:
  const validateState = function() {
    const values = Object.values(inputObj);
    // console.log(inputObj)
    // Check inputs and PriceItem Arr:
    if (values.includes('') || liPriceItem.length === 0 ) return true
      else return false;
  }

  // Render Price list:
  const addPriceLiItem = function() {
    setLiPriceItem(liPriceItem.concat(<NewInvoiceModalLiItem deleteItem={deleteItem} id={liPriceItem.length} key={liPriceItem.length} onChange={onChange} setLiInfoArrayHandler={setLiInfoArrayHandler}/>));
  };

  // Delete Price List:  
  const deleteItem = function(e) {
    const liEl = e.target.closest('li');
    const id = liEl.dataset.id;
    setLiPriceItem(prevLi => prevLi.filter(liItem => liItem.key !== id));
  }

  const sendDraftToFirebase = function() {
    setDraft('draft');
    sendDataToFirebase(); 
  }
  
  // ===== Post data on Firebase:
  function sendDataToFirebase() {
    fetch(
      'https://invoice-app-react-a9ade-default-rtdb.firebaseio.com/inputData.json',
      {
        method: 'POST',
        body: JSON.stringify({...inputObj, liInfoArray, clientId: `${generateString(2, words)}${generateString(4, num)}`, status: status,}),
        headers: {
          'Content-type': 'application/json'
        }
      }
    ).then(() => {
      closeModal();
    })
  }

  return (
    <div className="new-invoice">
      <div className="new-invoice__modal">
        <h2 className="new-invoice__heading">New Invoice</h2>
        <section className="new-invoice__container">
          <h4 className="new-invoice__heading-4">Bill From</h4>
          <div className="new-invoice__input-box">
            <div className="flex-column">
              <label htmlFor="address" className="new-invoice__label">Street Address</label>
              <input type="text" id="address" name="addressFrom" className="new-invoice__input" onChange={onChange}/>
            </div>
          </div>
          <div className="new-invoice__input-box new-invoice__input-box--horizontal">
            <div className="flex-column">
              <label htmlFor="city" className="new-invoice__label">City</label>
              <input type="text" id="city" name="cityFrom" className="new-invoice__input new-invoice__input--small" onChange={onChange} />
            </div>
            <div className="flex-column">
              <label htmlFor="post-code" className="new-invoice__label">Post Code</label>
              <input type="text" id="post-code" name="postCodeFrom" className="new-invoice__input new-invoice__input--small" onChange={onChange} />
            </div>
            <div className="flex-column">
              <label htmlFor="country" className="new-invoice__label">Country</label>
              <input type="text" id="country" name="countryFrom" className="new-invoice__input new-invoice__input--small" onChange={onChange} />
            </div>
          </div>
        </section>
        <section className="new-invoice__container">
          <h4 className="new-invoice__heading-4">Bill To</h4>
          <div className="new-invoice__input-box"> 
            <div className="flex-column">
              <label htmlFor="client-name" className="new-invoice__label">Client’s Name</label>
              <input type="text" id="client-name" name="clientName" className="new-invoice__input" onChange={onChange} />
            </div>
            <div className="flex-column"> 
              <label htmlFor="client-email" className="new-invoice__label">Client’s Email</label>
              <input type="text" id="client-email" name="clientEmail" className="new-invoice__input" onChange={onChange} />
            </div>
            <div className="flex-column"> 
              <label htmlFor="client-address" className="new-invoice__label">Street Address</label>
              <input type="text" id="client-address" name="clientAddress" className="new-invoice__input" onChange={onChange} />
            </div>
          </div>
          <div className="new-invoice__input-box new-invoice__input-box--horizontal">
            <div className="flex-column">
              <label htmlFor="city" className="new-invoice__label">City</label>
              <input type="text" id="city" name="clientCity" className="new-invoice__input new-invoice__input--small" onChange={onChange} />
            </div>
            <div className="flex-column">
              <label htmlFor="post-code" className="new-invoice__label">Post Code</label>
              <input type="text" id="post-code" name="clientPostCode" className="new-invoice__input new-invoice__input--small" onChange={onChange} />
            </div>
            <div className="flex-column">
              <label htmlFor="country" className="new-invoice__label">Country</label>
              <input type="text" id="country" name="clientCountry" className="new-invoice__input new-invoice__input--small" onChange={onChange} />
            </div>
          </div>
        </section>
        <section className="new-invoice__container">
          <div className="new-invoice__input-box new-invoice__input-box--horizontal">
            <div className="flex-column">
              <label htmlFor="date" className="new-invoice__label">Invoice Date</label>
              <input type="date" id="date" name="clientInvoiceDate" className="new-invoice__input new-invoice__input--medium" onChange={onChange} />
            </div>
            <div className="flex-column">
              <p className="new-invoice__label">Payment Terms</p>
              <select className="new-invoice__select" name="clientPaymentTerm" onChange={onChange}>
                <option value="1">Net 1 Days</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>
          <div className="new-invoice__input-box"> 
            <div className="flex-column">
              <label htmlFor="description" className="new-invoice__label">Project Description</label>
              <input type="text" id="description" name="clientDescription" className="new-invoice__input new-invoice__input--description" placeholder="e.g. Graphic Design Service" onChange={onChange} /> 
            </div>
          </div>
        </section>
        <section className="new-invoice__container new-invoice__container--item-list-section">
          <h3 className="new-invoice__heading-3">Item List</h3>
          <div className="new-invoice__titles new-invoice__label">
            <p>Item Name</p>
            <p>Qty.</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <ul className="new-invoice__price-list">
            {liPriceItem}
          </ul>
          <button className="new-invoice__add-item-btn"  onClick={addPriceLiItem}>+ Add New Item</button>
          {/* Message */}
          {validateState() ? <div className="message-request"><p>- All fields must be added</p><p>- An item must be added</p></div> : ''}
        </section>
        <section className="new-invoice__btns-container">
          <button className="new-invoice__btn-submit new-invoice__btn-submit--discard" onClick={closeModal}>Discard</button>
          <div>
            <button className="new-invoice__btn-submit new-invoice__btn-submit--draft" onClick={sendDraftToFirebase}>Save as Draft</button>
            {/* Check inputs: */}
            <button className={validateState() ? "new-invoice__btn-submit new-invoice__btn-submit--send disabled" 
              : "new-invoice__btn-submit new-invoice__btn-submit--send"} onClick={validateState() ? null : sendDataToFirebase}>
              Save & Send
            </button> 
            {/* <button className= "new-invoice__btn-submit new-invoice__btn-submit--send" onClick={sendDataToFirebase}>
              Save & Send
            </button>  */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default NewInvoiceModal;








