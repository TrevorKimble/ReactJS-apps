const CustomerInformation = ({ customer_id: customerId, customer_name: customerName, company, base_amount: baseAmount, adjustments, total_amount: totalAmount, used, available, notes }) => {   
  
    return (
        <div className='customer-info'>
            <div className='section_title_div'>
                <h3 className='section_title'>Customer Information</h3>
            </div>
            <hr></hr>
        
            <label>Customer ID:</label>
            <input type="text" disabled id="customer-id-field" value={customerId} />
        
            <label>Customer Name:</label>
            <input type="text" disabled id="customer-name-field" value={customerName} />

            <label>Company:</label>
            <input type="text" disabled id="customer-name-field" value={company} />
            
            <label>Base Amount:</label>
            <input type="text" disabled id="base-amount-field" value={baseAmount} />
        
            <label>Adjustments:</label>
            <input type="text" disabled id="adjustments-field" value={adjustments} />
        
            <label>Total Amount:</label>
            <input type="text" disabled id="total-amount-field" value={totalAmount} />
        
            <label>Used:</label>
            <input type="text" disabled id="used-field" value={used} />
        
            <label>Available:</label>
            <input type="text" id="available-field" value={available} disabled/>
        
            <label htmlFor="available-field" className="col-sm-3 col-form-label">Company Notes:</label>
            <textarea disabled className="form-control" id="main-notes" value={notes} rows="8"></textarea>  
        </div>
    )
}

export default CustomerInformation