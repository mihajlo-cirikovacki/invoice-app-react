
import { useState } from 'react';
import plus from '../assets/icon-plus.svg';

// Import Style:
import '../styles/components/ButtonHeader.scss';
import NewInvoiceModal from './NewInvoiceModal';

const ButtonHeader = () => {
  // === State:
  const [modalIsOpen, setModal] = useState(false);

  // === Functions:
  const getNewInvoiceModal = function() {
    setModal(true)
  }

  const closeNewInvoiceModal = function() {
    setModal(false)
  }

  return (
    <section>
      <button className='btn' onClick={getNewInvoiceModal}>
        <div className="btn__plus-box">
          <img src={plus} alt="plus mark" className="btn__img" />
        </div>
        New Invoice
      </button>
      {modalIsOpen && <NewInvoiceModal closeModal={closeNewInvoiceModal} /> }
    </section>
  );
}

export default ButtonHeader;











