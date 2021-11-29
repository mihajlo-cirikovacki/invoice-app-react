
import { useEffect, useReducer, useState } from 'react';
// Import Style:
import '../styles/components/NewInvoiceModal.scss';

// ==== Helper: Generate random ID:
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  };
  return result;
};


// Da prebacim u drugi file i importujem.
const LiPriceItem = ({deleteItem, id, setLiInfoArrayHandler}) => {
  // ==== State:
  const [data, setData] = useState({
    itemName: '',
    qty: '',
    price: '',
    total: '',
  });

  // ==== Functions:

  // OnChange handler:
  function onChange(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  }

  // Set TotaL:
  useEffect(() => {
    const qtyNum = +data.qty;
    const priceNum = +data.price;
    const totalNum = qtyNum * priceNum;
    // Set total:
    setData({...data, total: totalNum})
    // Set data:
  },[data.qty, data.price])

 
  // Send data object if is full:
  useEffect(() => {
    setLiInfoArrayHandler(data);
  },[Object.values(data).every(value => value !== '' && value !== 0)]);
  

  return (
    <li className="new-invoice__price-item" data-id={id}>
      <input type="text" name="itemName" className="new-invoice__input" onChange={onChange} />
      <input type="number" name="qty" min="0" className="new-invoice__input new-invoice__input--num new-invoice__input--num-qty" onChange={onChange} />
      <input type="number" name="price" min="0" className="new-invoice__input new-invoice__input--num new-invoice__input--num-price" onChange={onChange}/>
      {/* <p className="new-invoice__total" name="total">156.00</p> */}
      <input type="text" name="total" className="new-invoice__input new-invoice__input--total" value={data.total + ''} />
      <div onClick={deleteItem}>
          <svg className="new-invoice__icon-delete" width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fill-rule="nonzero"/></svg>
      </div>
    </li>
  )
}


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
  const validateState = function(inputObj) {
    console.log(inputObj)
    const values = Object.values(inputObj); 

    if (values.some(value => value === '')) return true
       else return false;
  }

  // Render Price list:
  const addPriceLiItem = function() {
    setLiPriceItem(liPriceItem.concat(<LiPriceItem deleteItem={deleteItem} id={liPriceItem.length} key={liPriceItem.length} onChange={onChange} setLiInfoArrayHandler={setLiInfoArrayHandler}/>));
  };

  // Delete Price List:  
  const deleteItem = function(e) {
    const liEl = e.target.closest('li');
    const id = liEl.dataset.id;
    setLiPriceItem(prevLi => prevLi.filter(liItem => liItem.key !== id));
  }
  
  // ===== Post data on Firebase:
  const sendDataToFirebase = function() {

    fetch(
      'https://invoice-app-react-a9ade-default-rtdb.firebaseio.com/inputData.json',
      {
        method: 'POST',
        body: JSON.stringify({...inputObj, liInfoArray: liInfoArray || null, clientId: generateString(6)}),
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
        </section>
        <section className="new-invoice__btns-container">
          <button className="new-invoice__btn-submit new-invoice__btn-submit--discard" onClick={closeModal}>Discard</button>
          <div>
            <button className="new-invoice__btn-submit new-invoice__btn-submit--draft">Save as Draft</button>
            {/* Check inputs: */}
            <button className={validateState(inputObj) ? "new-invoice__btn-submit new-invoice__btn-submit--send disabled" : "new-invoice__btn-submit new-invoice__btn-submit--send"} onClick={validateState(inputObj) ? null : sendDataToFirebase}>
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








