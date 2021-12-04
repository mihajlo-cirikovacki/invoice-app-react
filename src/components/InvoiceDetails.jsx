import { useState } from 'react';
import {db, ref, remove} from '../db';
// Import Styles:
import '../styles/components/InvoiceDetails.scss';

import InvoiceDetailsLiItem from './InvoiceDetailsLiItem';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import StatusButton from './StatusButton';

// ===== Helper funck.
const formatDate = function(date) {
  const dateForFormat = new Date(date);

  const options = {
    year: 'numeric',
    month: 'short',
    day:'2-digit',
  }
  const local = navigator.language; 
  const formatedDueDate = new Intl.DateTimeFormat(local, options).format(dateForFormat);
  return formatedDueDate;
}


// Invoice Details Page:
const InvoiceDetails = ({closeModal, loadedData, total, setPaidButton, statusPending}) => {
  // === State:
  const [deleteModalOpen, setDeleteModal] = useState(false);
 
  //  === Delete Modal:
  const openDeleteModal = function() {
    setDeleteModal(true)
  }
  
  const closeDeleteModal = function() {
    setDeleteModal(false);
  }

  // === Delete invoice:
  const deleteInvoice = function() {
    // Remove from Firebase:
    remove(ref(db, `inputData/${loadedData.keyFirebase}`)).then(() => closeModal());
  }

  return (
    <section>
    <section className='invoice-modal'>
      <section className='invoice-container'>
        <div className="invoice-details">
          <nav className="nav" >
            <div onClick={closeModal}>
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
              <button className="nav__button-back">Go back</button>
            </div>
          </nav>
          <header className="header">
            <div className="header__box-1">
              <p>Status</p>
                {/* {statusPending ? <StatusButton setPaid={true}/> : <StatusButton setPaid={false} />} */}
                {loadedData.status === 'pending' && statusPending ? <StatusButton setPaid={true}/> : <StatusButton setPaid={false}/>}

            </div>
            <div className="header__box-2">
              <button className="header__button-edit">Edit</button>
              <button className="header__button-delete" onClick={openDeleteModal}>Delete</button>
              <button className="header__button-paid" onClick={setPaidButton}>Mark as Paid</button>
            </div>
          </header>
          <main className="main-details">
            <div className="main-details__info">
                <div className="main-details__info-box-1">
                    <div className="flex-horizontal">
                      <span className="main-details__info-hastag">#</span>
                      <p className="main-details__info-client-id">{loadedData.clientId}</p>
                    </div>
                    <p className="main-details__info-description ">Graphic Design</p>
                </div>
                <div className="main-details__info-box-2">
                  <div className="main-details__info-address-from">
                    <p>{loadedData.addressFrom}</p>
                    <p>{loadedData.cityFrom}</p>
                    <p>{loadedData.postCodeFrom}</p>
                    <p>{loadedData.countryFrom}</p>
                  </div>
                </div> 
                <div className="main-details__info-box-3">
                  <div>
                    <p>Invoice Date</p>
                    <p className="main-details__info-inv-date bold-text">{formatDate(loadedData.clientInvoiceDate)}</p>
                  </div>
                  <div className="margin-top32">
                    <p>Payment Due</p>
                    <p className="main-details__info-pay-date bold-text">{loadedData.duoDate}</p>
                  </div>
                </div>
                <div className="main-details__info-box-4">
                  <p>Bill To</p>
                  <p className="main-details__info-client-name bold-text">{loadedData.clientName}</p>
                  <div className="main-details__info-client-address margin-top8">
                    <p>{loadedData.clientAddress}</p>
                    <p>{loadedData.clientCity}</p>
                    <p>{loadedData.clientPostCode}</p>
                    <p>{loadedData.clientCountry}</p>
                  </div>
                </div>
                <div className="main-details__info-send-to main-details__info-box-5">
                  <p>Sent to</p>
                  <p className="main-details__info-mail bold-text ">{loadedData.clientEmail}</p>
                </div>
            </div>

            {<InvoiceDetailsLiItem arrNum={loadedData.liInfoArray} /> }
            <div className="main-details__amount-due">
              <p>Amount Due</p>
              <p className="main-details__amount-due-total">{total}</p>
            </div>
          </main>
        </div>
      </section>
    </section>
      {deleteModalOpen && <ConfirmDeleteModal clientId={loadedData.clientId} closeModal={closeDeleteModal} deleteInvoice={deleteInvoice} />}
    </section>
  );
}


export default InvoiceDetails;











