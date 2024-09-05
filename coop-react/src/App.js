/* eslint-disable id-length */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'

import './App.css'
import * as scripts from './scripts.js'
import AdjustmentHistory from './components/AdjustmentHistory.js'
import CustomerInformation from './components/CustomerInformation.js'
import FindCustomer from './components/FindCustomer.js' 

function App() {
    const [inputValue, setInputValue] = useState()
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const [coopCustomers, setCoopCustomers] = useState()
    const [allCustomers, setAllCustomers] = useState()

    const [customerId, setCustomerId] = useState()
    const [customerName, setCustomerName] = useState()
    const [company, setCompany] = useState()
    const [baseAmount, setBaseAmount] = useState()
    const [adjustments, setAdjustments] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [used, setUsedAmount] = useState()
    const [available, setAvailableAmount] = useState()
    const [notes, setNotes] = useState()

    const [adjustmentId, setAdjustmentId] = useState()
    const [adjustmentPopupId, setAdjustmentPopupId] = useState()
    const [adjustmentPopupAmount, setAdjustmentPopupAmount] = useState()
    const [adjustmentPopupEnteredBy, setAdjustmentPopupEnteredBy] = useState()
    const [adjustmentPopupYear, setAdjustmentPopupYear] = useState()
    const [adjustmentPopupDate, setAdjustmentPopupDate] = useState()
    const [adjustmentPopupNote, setAdjustmentPopupNote] = useState()

    const [showNewAdjustmentPopup, setShowNewAdjustmentPopup] = useState(false)
    const [showEditCompanyNotes, setShowEditCompanyNotes] = useState(false)
    const [showAdjustmentPopup, setShowAdjustmentPopup] = useState(false)
    const [editAdjustmentConfirmationPopup, setEditAdjustmentConfirmationPopup] = useState(false)
    const [deleteAdjustmentConfirmationPopup, setDeleteAdjustmentConfirmationPopup] = useState(false)

    function checkSearchChoice() {
        document.getElementById(`customer_search_info`).disabled = !((document.getElementById(`companies`).value !== `none`) && (document.getElementById(`customer_id`).checked || document.getElementById(`customer_name`).checked))
        document.getElementById(`customer_search_submit`).disabled = !((document.getElementById(`companies`).value !== `none`) && (document.getElementById(`customer_id`).checked || document.getElementById(`customer_name`).checked))
        document.getElementById(`customer_search_info`).placeholder = document.getElementById(`customer_id`).checked ? `Enter Customer ID` : `Enter Customer Name`
    }

    function autoComplete(event) {
        const value = event.target.value
        setInputValue(value)

        const idChecked = document.getElementById(`customer_id`).checked
        const searchAll = document.getElementById(`search-all-customers`).checked       
        const company = document.getElementById(`companies`).value

        const mappedIds = coopCustomers.rows.map(item => [item.customer_id, item.company])
        const mappedNames = coopCustomers.rows.map(item => [item.customer_name, item.company])
        const allIds = allCustomers.rows.map(item=> [item.customer_id, item.company])
        const allNames = allCustomers.rows.map(item=> [item.customer_name, item.company])
        let filteredSuggestions

        if (searchAll) {
            if (idChecked) {
                filteredSuggestions = allIds.filter(id=> id[0].toLowerCase().startsWith(value.toLowerCase()) && id[1] === company)
            } else {
                filteredSuggestions = allNames.filter(name => name[0].toLowerCase().startsWith(value.toLowerCase()) && name[1] === company)
            }
        } else if (idChecked) {
            filteredSuggestions = mappedIds.filter(id=> id[0].toLowerCase().startsWith(value.toLowerCase()) && id[1] === company)
        } else {
            filteredSuggestions = mappedNames.filter(name => name[0].toLowerCase().startsWith(value.toLowerCase()) && name[1] === company)
        }

        setSuggestions(filteredSuggestions)
        setShowSuggestions(true)
    }

    function populateAdjustmentPopup(data) {
        setAdjustmentId(data.id)
        setAdjustmentPopupId(data.cust_id)
        setAdjustmentPopupAmount(data.adjustment)
        setAdjustmentPopupEnteredBy(data.entered_by)
        setAdjustmentPopupYear(data.year)
        setAdjustmentPopupDate(data.adjustment_date ? data.adjustment_date.substring(0, data.adjustment_date.indexOf(`T`)) : `N/A`)
        setAdjustmentPopupNote(data.note)
    }

    async function getAdjustmentHistory(id) {
        const data = await scripts.fetchAdjustmentHistory(id)
  
        const location = document.getElementById(`adjustment-table`)   
        location.innerHTML = ``
        let newElement

        for (let x = data.rows.length - 1; x >= 0; x--) {
            newElement = document.createElement(`tr`)
            newElement.innerHTML = (`<td>${data.rows[x].adjustment} </td> <td>${data.rows[x].year}</td> <td>${data.rows[x].adjustment_date ? data.rows[x].adjustment_date.substring(0, data.rows[x].adjustment_date.indexOf(`T`)) : `N/A`} </td>`)
            newElement.onclick = () => { setShowAdjustmentPopup(true); populateAdjustmentPopup(data.rows[x]) }
            location.appendChild(newElement)
        }
    }

    async function getCustomerInfo(idChecked, input) {
        const searchAll = document.getElementById(`search-all-customers`).checked   
        let data

        if (searchAll) {
            data = await scripts.fetchCustomerInfo(idChecked, input)
        } else {
            data = await scripts.fetchCoopCustomerInfo(idChecked, input)
        }

        setShowSuggestions(false)

        if (data.rows.length > 0) {
            setCustomerId(data.rows[0].customer_id !== null ? data.rows[0].customer_id : `null`)
            setCustomerName(data.rows[0].customer_name !== null ? data.rows[0].customer_name : `null`)
            setCompany(data.rows[0].company !== null ? data.rows[0].company : `null`)
            setBaseAmount(data.rows[0].amount !== null ? data.rows[0].amount : null)
            setAdjustments(data.rows[0].adjustments !== null ? data.rows[0].adjustments : null)
            setTotalAmount(data.rows[0].totalamount !== null ? data.rows[0].totalamount : null)
            setUsedAmount(data.rows[0].used !== null ? data.rows[0].used : null)
            setAvailableAmount(data.rows[0].available !== null ? data.rows[0].available : null)
            setNotes(data.rows[0].notes !== null ? data.rows[0].notes : null)

            getAdjustmentHistory(data.rows[0].customer_id)
        } else {
            setCustomerId(``)
            setBaseAmount(``)
            setAdjustments(``)
            setTotalAmount(``)
            setUsedAmount(``)
            setAvailableAmount(``)
            setNotes(``)
        }     
    }

    function searchCustomer() {
        const idChecked = document.getElementById(`customer_id`).checked
        const input = document.getElementById(`customer_search_info`).value
        getCustomerInfo(idChecked, input)
    }
 
    function createAdjustment() {
        const mappedIds = coopCustomers.rows.map(item => item.customer_id)

        if (!mappedIds.includes(customerId)) {
            scripts.insertCoopCustomer(customerId, customerName, company, notes, `default`)
        }

        const amount = document.getElementById(`adjustment-amount-field`).value
        const user = `default`
        const year = document.getElementById(`adjustment-year-field`).value
        const note = document.getElementById(`adjustment-note-field`).value

        scripts.insertAdjustment(customerId, company, amount, user, year, note)
        searchCustomer()
    }

    function openEditAdjustment() {
        document.getElementById(`editAdjustmentReset`).hidden = false 
        document.getElementById(`editAdjustmentSubmit`).hidden = false 
        document.getElementById(`editAdjustmentDelete`).hidden = true 
        document.getElementById(`editAdjustmentEdit`).hidden = true

        document.getElementById(`adjustmentPopupAmount`).disabled = false
        document.getElementById(`adjustmentPopupYear`).disabled = false
        document.getElementById(`adjustmentPopupNotes`).disabled = false
    }

    function closeEditAdjustment() {
        document.getElementById(`editAdjustmentReset`).hidden = true 
        document.getElementById(`editAdjustmentSubmit`).hidden = true 
        document.getElementById(`editAdjustmentDelete`).hidden = false 
        document.getElementById(`editAdjustmentEdit`).hidden = false

        document.getElementById(`adjustmentPopupAmount`).disabled = true
        document.getElementById(`adjustmentPopupYear`).disabled = true
        document.getElementById(`adjustmentPopupNotes`).disabled = true
    }

    function updateAdjustment() {
        const user = `default`
    
        scripts.updateAdjustment(adjustmentId, adjustmentPopupAmount, adjustmentPopupYear, encodeURIComponent(adjustmentPopupNote), user)
        searchCustomer()
    }

    function deleteAdjustment() {
        scripts.deleteAdjustment(adjustmentId)
        searchCustomer()
    }

    async function updateCompanyNotes() {
        const id = document.getElementById(`customer-id-field`).value
        const company = document.getElementById(`companies`).value
        const notes = encodeURIComponent(document.getElementById(`adjustment-note-field`).value)
         
        await scripts.updateCompanyNotes(id, company, notes)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const coopCustomers = await scripts.getCoopCustomers()
                setCoopCustomers(coopCustomers)
                const allCustomers = await scripts.getAllCustomers()
                setAllCustomers(allCustomers)
                
            } catch (error) {
                throw new Error(`Failed to get data ${error}`)
            }
        }
        fetchData()
    }, [])

    return (   
        <body>
            <br/><br/><br/>
            <div id='everything'>
                <div>
                    <div id='find-customer'>
                        <FindCustomer
                            checkSearchChoice = {checkSearchChoice} 
                            inputValue = {inputValue} 
                            setInputValue = {setInputValue} 
                            autoComplete = {autoComplete} 
                            searchCustomer = {searchCustomer}
                            suggestions = {suggestions}
                            showSuggestions = {showSuggestions}
                            setShowSuggestions = {setShowSuggestions}
                        />
                    </div>

                    <hr></hr>

                    <div className="main-info">

                        <AdjustmentHistory/>

                        <CustomerInformation
                            customer_id={customerId}
                            customer_name={customerName}
                            company={company}
                            base_amount={baseAmount}
                            adjustments={adjustments}
                            total_amount={totalAmount}
                            used={used}
                            available={available}
                            notes={notes}
                        />

                        <div id='actionButtons'>
                            <button className='basic-button' id="NewAdjustmentButton" onClick={() => { setShowNewAdjustmentPopup(true) }}><b>New Adjustment</b></button>
                            <br></br>
                            <button className='basic-button' id="updateCompanyNotesButton" onClick={() => { setShowEditCompanyNotes(true) }}><b>Update Company Notes</b></button>    
                            <br></br>
                            <button className='basic-button' id="ClearButton" onClick={() => { window.location.reload() }}><b>Clear</b></button>
                        </div>

                    </div>

                </div>

                {showNewAdjustmentPopup && (
                    <div className="pop-up-form">
                        <div className="pop-up-form-content">
                            <span className="close-popup-form" onClick={() => { setShowNewAdjustmentPopup(false) }}>&times;</span>
                            <br/><br/> 

                            <label>Adjustment Amount:</label>
                            <input type="text" id="adjustment-amount-field" placeholder="$0.00" />

                            <label>Adjustment Year:</label>
                            <input type="text" id="adjustment-year-field" placeholder="Enter a year" />

                            <label>Note:</label>
                            <input type="text" id="adjustment-note-field" placeholder="(optional)" />
          
                            <div className='popupButtons'>
                                <button onClick={() => { setShowNewAdjustmentPopup(false); setTimeout(() => { setShowNewAdjustmentPopup(true) }, 500) }}>Reset</button>
                                <button onClick={() => { createAdjustment(); setShowNewAdjustmentPopup(false) }}>Submit</button>
                            </div>
                        </div>
                    </div>
          
                )}

                {showEditCompanyNotes && (
                    <div className="pop-up-form">
                        <div className="pop-up-form-content">
                            <span className="close-popup-form" onClick={() => { setShowEditCompanyNotes(false) }}>&times;</span>
                            <br/><br/>

                            <label>Company Notes:</label>
                            <textarea id="adjustment-note-field" value={notes} onChange={(e) => setNotes(e.target.value)} rows="15"></textarea>    
    
                            <div className='popupButtons'>
                                <button onClick={() => { setShowEditCompanyNotes(false); searchCustomer() }}>Reset</button>
                                <button onClick={() => { updateCompanyNotes(); setShowEditCompanyNotes(false) }}>Submit</button>
                            </div>
                        </div>
                    </div>
          
                )}

                {showAdjustmentPopup && (
                    <div className="pop-up-form">
                        <div className="pop-up-form-content">

                            <span className="close-popup-form" onClick={() => { setShowAdjustmentPopup(false) }}>&times;</span>
                            <br/><br/>

                            <label>Customer ID:</label>
                            <input type="text" id="adjustmentPopupCustomerId" value={adjustmentPopupId} disabled/>
  
                            <label>Adjustment Amount:</label>
                            <input type="text" id="adjustmentPopupAmount" value={adjustmentPopupAmount} onChange={(e) => setAdjustmentPopupAmount(e.target.value)} disabled/>
        
                            <label>Entered By:</label>
                            <input type="text" id="adjustmentPopupEnteredBy" value={adjustmentPopupEnteredBy} onChange={(e) => setAdjustmentPopupEnteredBy(e.target.value)} disabled/>

                            <label>Year:</label>
                            <input type="text" id="adjustmentPopupYear" value={adjustmentPopupYear} onChange={(e) => setAdjustmentPopupYear(e.target.value)} disabled/>
     
                            <label>Date:</label>
                            <input type="text" id="adjustmentPopupDate" value={adjustmentPopupDate} onChange={(e) => setAdjustmentPopupDate(e.target.value)} disabled/>
         
                            <label>Note:</label>
                            <textarea id="adjustmentPopupNotes" value={adjustmentPopupNote} onChange={(e) => setAdjustmentPopupNote(e.target.value)} disabled rows="4"></textarea>
            
                            <div className='popupButtons'>
                                <div id='form_buttons'>
                                    <button id='editAdjustmentReset' hidden onClick={() => { closeEditAdjustment(); setShowAdjustmentPopup(false) }}>Reset</button>
                                </div>
                                <div id='form_buttons'>
                                    <button id='editAdjustmentSubmit' hidden onClick={() => { setShowAdjustmentPopup(false); setEditAdjustmentConfirmationPopup(true) }}>Submit</button>
                                </div>

                                <div id='form_buttons'>
                                    <button id='editAdjustmentEdit' onClick={openEditAdjustment}>Edit</button>
                                </div>
                                <div id='form_buttons'>
                                    <button id='editAdjustmentDelete' onClick={() => { setShowAdjustmentPopup(false); setDeleteAdjustmentConfirmationPopup(true) }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>     
                )}
            
                {editAdjustmentConfirmationPopup && (
                    <div className="pop-up-form">
                        <div className="pop-up-form-content">
                            <p>Are you sure you want to edit this adjustment</p>
                            <div className='popupButtons'>
                                <button onClick={() => { setEditAdjustmentConfirmationPopup(false) }}>Cancel</button>
                                <button onClick={() => { updateAdjustment(); setEditAdjustmentConfirmationPopup(false) }}>Confirm</button>
                            </div>  
                        </div>
                    </div>
                )}

                {deleteAdjustmentConfirmationPopup && (
                    <div className="pop-up-form">
                        <div className="pop-up-form-content">
                            <p>Are you sure you want to delete this adjustment</p>
                            <div className='popupButtons'>
                                <button onClick={() => { setDeleteAdjustmentConfirmationPopup(false) }}>Cancel</button>
                                <button onClick={() => { deleteAdjustment(); setDeleteAdjustmentConfirmationPopup(false) }}>Confirm</button>
                            </div>  
                        </div>
                    </div>
                )}
            </div>
        </body> 
    )
}

export default App