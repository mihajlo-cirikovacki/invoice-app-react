import { useEffect, useState } from 'react';
// Import Style:
import '../styles/components/NewInvoiceModal.scss';


const NewInvoiceModalLiItem = ({deleteItem, id, setLiInfoArrayHandler}) => {
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

export default NewInvoiceModalLiItem;