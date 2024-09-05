import React, { useState, useEffect } from 'react'
import { InputGroup } from 'react-bootstrap'
import Cookies from 'js-cookie'

function ControlledDropdown({ options, label, id, updateFormData, setShift }) {

    const [selectedValue, setSelectedValue] = useState()

    useEffect(() => {
        if (setShift === true) {
            const cookieValue = Cookies.get(`shift`)
            if (cookieValue) {
                setSelectedValue(cookieValue)
                updateFormData(id, cookieValue)
            }
        }
    }, [])

    const handleChange = (value) => {
        setSelectedValue(value)
        updateFormData(id, value)

        if (setShift === true) {
            Cookies.set(`shift`, value, { expires: 7 })
        }
    }

    return (
        <div>
            <InputGroup className={`input-group`}> 
                <InputGroup.Text className={`scrap-label`} id="shift">{label}</InputGroup.Text>

                <select id="dropdown-menu" value={selectedValue} onChange={(event) => handleChange(event.target.value)}>
                    <option hidden selected value=""></option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.name}</option>
                    ))}
                </select>

            </InputGroup>
        </div>
    )
}

export default ControlledDropdown
