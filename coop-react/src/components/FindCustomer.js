const FindCustomer = ({ checkSearchChoice, inputValue, setInputValue, autoComplete, searchCustomer, suggestions, showSuggestions, setShowSuggestions }) => {   

    return (
        <div>
            <div onChange={checkSearchChoice}>
                <label>Company:</label>
                <select name="companies" id="companies" defaultValue={`none`} >
                    <option value="none" disabled hidden>Select an option</option>
                    <option value="SPP">SPP</option>
                    <option value="KFR">KFR</option>
                    <option value="ART">ART</option>
                </select>
                <br/> <br/>
             
                <div id='radioButtons'>
                    <label>Search By Customer: &nbsp;</label>
                    <label htmlFor="customer_id">ID:</label>
                    <input type="radio" id="customer_id" name="search_choice"/>
                    <label htmlFor="customer_name">Name:</label>
                    <input type="radio" id="customer_name" name="search_choice" />  
                </div>  
                <br/>
                <div>
                    <label>Search all customers</label>
                    <input id="search-all-customers" type="checkbox"></input>
                </div>
            </div>
            <br></br>

            <div className="autocomplete">
                <input type="text" id="customer_search_info" placeholder="" value={inputValue} onChange={(input) => { autoComplete(input); setInputValue(input.target.value) }} disabled /> 
               
                {showSuggestions && (     
                    <div className="autocomplete-items">
                        {Array.isArray(suggestions) && suggestions.length === 0 ? (
                            <div className="autocomplete-item">Id/Name does not exist</div>
                        ) : (
                            <>
                                <div className="close-autocomplete" onClick={() => { setShowSuggestions(false) }}>×</div>
                                {suggestions.map((suggestion, index) => (
                                    <div className="autocomplete-item" key={index} onClick={() => { setInputValue(suggestion[0]); setShowSuggestions(false) }}>
                                        {suggestion[0]}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
               
            <div className='popupButtons'>
                <button id="customer_search_submit" type="submit" onClick={searchCustomer}>Submit</button>
            </div>
        </div> 
    )
}

export default FindCustomer