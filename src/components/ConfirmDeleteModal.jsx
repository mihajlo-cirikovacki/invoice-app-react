
// Import Styles:
import '../styles/components/ConfirmDeleteModal.scss';

const ConfirmDeleteModal = function({clientId, closeModal, deleteInvoice}) {
  return (
    <section className="delete">
      <div className="delete__info"> 
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete invoice #{clientId}? This action cannot be undone.</p>
        <div className="delete__buttons">
          <button className="delete__buttons--cancel" onClick={closeModal}>Cancel</button>
          <button className="delete__buttons--delete" onClick={deleteInvoice}>Delete</button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmDeleteModal;

















