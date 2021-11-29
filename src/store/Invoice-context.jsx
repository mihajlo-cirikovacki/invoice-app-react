import {useState, createContext} from 'react';


// Invoice Context:
const InvoiceContext = createContext({
  invoices: [],
  totalInvoicesCards: 0,

  // Functions, for better auto-complete:
  addInvoice: (invoice) => {},
  removeInvoice: (invoiceId) => {},
  checkInvoiceIsThere: (invoiceId) => {},
})

// Context Provider:
export const InvoiceContextProvider = (props) => {
  // ===== State:
  const [invoices, setInvoice] = useState([]);
  console.log(invoices, 'Unutar Context-a');
  // ===== Functions:

  // Add Invoice:
  const addInvoice = function(invoice) {
    setInvoice(prevInvoice => prevInvoice.concat(invoice));
  }

  // Remove Invoice:
  const removeInvoice = function(invoiceId) {
    setInvoice(prevInvoice => prevInvoice.filter(invoice => invoice.id !== invoiceId))
  }

  // Check Invoice:
  const checkInvoiceIsThere = (invoiceId) => invoices.some(invoice => invoice.id === invoiceId);
  
  const context = {
    invoices: invoices,
    totalInvoicesCards: invoices.length,
    // Functions:
    addInvoice: addInvoice,
    removeInvoice: removeInvoice,
    checkInvoiceIsThere: checkInvoiceIsThere,
  }

  return (
    <InvoiceContext.Provider value={context}>
      {props.children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;








