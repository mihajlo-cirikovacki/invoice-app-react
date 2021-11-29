
const InvoiceDetailsLiItem = ({arrNum}) => {

  return (
    <div className="main-details__calculated">
      <div className="main-details__calculated-box-1">
        <p>Item Name</p>
        {arrNum.map(data => <p className="bold-text2">{data.itemName}</p>)}
      </div>
      <div className="main-details__calculated-box-2">
        <p>QTY.</p>
        {arrNum.map(data => <p>{data.qty}</p>)}
      </div>
      <div className="main-details__calculated-box-3">
        <p>Price</p>
        {arrNum.map(data => <p>{data.price}</p>)} 
      </div>
      <div className="main-details__calculated-box-4">
        <p>Total</p>
        {arrNum.map(data => <p className="bold-text2">{data.total}</p>)}
      </div>
    </div>
  )
}

export default InvoiceDetailsLiItem;




















