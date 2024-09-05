import React, { useState } from 'react'
import { InputGroup } from 'react-bootstrap'

function AutocompleteInput({ options, label, id, updateFormData }) {

    const [selectedValue, setSelectedValue] = useState()
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleChange = (value) => {
        updateFormData(id, value)
    }

    function autoComplete(event) {
        const value = event.target.value
        setSelectedValue(value)

        const mappedOptions = options.map(item => [item.epicor_job, item.value])
        const filteredSuggestions = mappedOptions.filter(job=> job[0].toLowerCase().startsWith(value.toLowerCase()))
 
        setSuggestions(filteredSuggestions)
        setShowSuggestions(true)
    }

    return (
        <div>
            <InputGroup className={`input-group`}>
                <InputGroup.Text className={`scrap-label`} id="shift">{label}</InputGroup.Text>
                <div className="autocomplete">
                    <input type="text" id="customer_search_info" value={selectedValue} onChange={(input) => { autoComplete(input); setSelectedValue(input.target.value) }} /> 
                
                    {showSuggestions && (                        
                        <div className="autocomplete-items" id='autocomplete-items'>
                            {Array.isArray(suggestions) && suggestions.length > 0 && (
                                <>
                                    <div className="close-popup-form" onClick={() => { setShowSuggestions(false) }}>×</div>
                                    {suggestions.map((suggestion, index) => (
                                        <div className="autocomplete-item" key={index} onClick={() => { setSelectedValue(suggestion[0]); setShowSuggestions(false); handleChange(suggestion[1]) }}>
                                            {suggestion[0]}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </InputGroup>
        </div>
    )
}

export default AutocompleteInput