import { useState } from 'react';

// Import Styles:
import '../styles/components/Card.scss';

import InvoiceDetails from './InvoiceDetails';
import StatusButton from './StatusButton';


// ==== Invoices Card:
const Card = ({loadedData, clientId, date, clientName, total}) => {
  // === State:
  const [detailsModal, setDetailsModal] = useState(false);

  const [statusPending, setStatusPaid] = useState(false);

  // === Functions:
  const setDetailsModalOpen = function() {
    setDetailsModal(true)
  }

  const setDetailsModalClose = function() {
    setDetailsModal(false)
  }
  
  // === Status buttons:
  const setPaidButton = function() {
    setStatusPaid(true);
  }
  
  return (
    <section>
      <div className='card'>
        <div className="card__box-1">
          <div>
            <span className="card__id-hashtag">#</span>
            <p className="card__id">{clientId}</p>
          </div>
          <div>
            <p>Due</p>
            <p className="card__date">{date}</p>
          </div>
          <p className="card__name">{clientName}</p>
        </div>
        <div className="card__box-2">
          <div>
            <p className="card__total-currency">£</p>
            <p className="card__total">{total.toFixed(2)}</p>      
          </div>
          {/* {<StatusButton/>} */}
          {statusPending ? <StatusButton setPaid={true}/> : <StatusButton setPaid={false}/>}
          <div className="card__arrow-right" onClick={setDetailsModalOpen}> 
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
          </div>    
        </div>
      </div>
      
      {detailsModal && <InvoiceDetails loadedData={loadedData} total={total} closeModal={setDetailsModalClose} setPaidButton={setPaidButton} setPaid={true} statusPending={statusPending}/>}
    </section>
  );
};

export default Card;








