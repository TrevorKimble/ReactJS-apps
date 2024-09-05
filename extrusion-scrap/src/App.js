/* eslint-disable no-undef */
import './App.css'

import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DataTable from 'react-data-table-component'
import dayjs from 'dayjs'

import ControlledDropdown from './ControlledDropdown'
import AutocompleteInput from './AutocompleteInput'

function formDataToQueryString(obj) {
    const params = new URLSearchParams()

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key]
            if (value !== undefined) {
                params.append(key, value)
            }
        }
    }
    return params.toString()
}

function App() {
    const [records, setRecords] = useState([])
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error] = useState(null)

    const [formData, setFormData] = useState([])

    const updateFormData = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const getRecords = () => {
        fetch(`${process.env.REACT_APP_NODE_SERVER_ROUTE}:${process.env.REACT_APP_NODE_SERVER_PORT}/extrusions/scrap`)
            .then(response => response.json())
            .then(data => {
                setRecords(data.rows)
                setLoading(false)
            })
            .catch(error => {
                throw new Error(`Failed to fetch extrusions/scrap \n${error}`)
            })
    }

    const getJobs = () => {
        fetch(`${process.env.REACT_APP_NODE_SERVER_ROUTE}:${process.env.REACT_APP_NODE_SERVER_PORT}/extrusions/jobsList`)
            .then(response => response.json())
            .then(data => {
                setJobs(data.rows)
                setLoading(false)
            })
            .catch(error => {
                throw new Error(`Failed to fetch extrusions/joblist \n${error}`)
            })
    }

    useEffect(() => {
        getRecords()
        getJobs()
    }, []) 

    const handleAmountChange = (input) => {
        const amount = input.target.value
        setFormData({ ...formData, 'amount': amount })
    }

    const validateFormData = () => {
        if (!formData.amount || !formData.shift || !formData.reason || !formData.job) {
            alert(`Please fill all required fields.\r\n (amount, shift, reason, job)`)
            return false
        }

        if (isNaN(formData.amount) || isNaN(formData.shift)) {
            alert(`Amount & shift must be numbers`)
            return false
        }

        if (!parseInt(formData.shift) || !parseInt(formData.job) || formData.shift < 1 || formData.shift > 3 || formData.job < 1 || formData.job > 8) {
            alert(`Please select a valid job and shift`)
            return false
        }

        return true
    }

    const handleSubmit = async (input) => {
        input.preventDefault()

        if (!validateFormData()) {
            return
        }

        try {
            fetch(`${process.env.REACT_APP_NODE_SERVER_ROUTE}:${process.env.REACT_APP_NODE_SERVER_PORT}/extrusions/scrap?${formDataToQueryString(formData)}`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`,
                }
            })
                .then(() => {
                    window.location.reload()
                })
      
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    const columns = [
        {
            name: `Date`,
            selector: row => dayjs(row.created).format(`MM/DD/YYYY`),
            sortable: true,
            reorder: true
        },
        {
            name: `Shift`,
            selector: row => row.shift,
            sortable: true,
            reorder: true,
            width: 88
        },
        {
            name: `Reason`,
            selector: row => row.description,
            sortable: true,
            reorder: true
        },
        {
            name: `Color From`,
            selector: row => row.color_change_from,
        },
        {
            name: `Color To`,
            selector: row => row.color_change_to,
        },
        {
            name: `Pounds`,
            selector: row => row.pounds,
            sortable: true,
            reorder: true,
            width: 88
        },
        {
            name: `Profile`,
            selector: row => row.profile_descr,
            sortable: true,
            reorder: true,
            width: 188
        },
        {
            name: `Job`,
            selector: row => row.job,
            sortable: true,
            reorder: true,
            width: 88
        },
    ]

    const renderDataTable = () => {
        if (loading) {
            return <div>Loading...</div>
        } else if (error) {
            return <div>Error: {error.message}</div>
        } else if (records.length) {
            return (
                <DataTable
                    columns={columns}
                    data={records}
                    pagination
                />
            ) 
        } else {
            return <div>No records found.</div>
        }
    }

    return (
        <div className="App">
            <Navbar>
                <Col>
                    <Navbar.Brand>SPP Extrusion Scrap</Navbar.Brand>
                </Col>
                <Col className="ml-auto">
                    <img
                        alt=""
                        src="/spp.logo.png"
                        width="150"
                        height="100"
                        className="d-inline-block align-top"
                    />{` `}
                </Col>
            </Navbar>
        
            <Form>
                <InputGroup className={`input-group`}> 
                    <InputGroup.Text className={`scrap-label`} id="scrap-amount">Scrap Amount</InputGroup.Text>
                    <Form.Control
                        id="dropdown-menu"
                        placeholder = "(pounds)"
                        aria-label = "Scrap Amount"
                        aria-describedby = "scrap-amount"
                        className = {`wide-value-field`}
                        onChange = {handleAmountChange}
                        initialValue={formData.amount}
                        required={true}
                    />
                </InputGroup>
                <ControlledDropdown
                    options = {[
                        { name: `6am - 2pm`, value: 1 }, 
                        { name: `2pm - 10pm`, value: 2 }, 
                        { name: `10pm - 6am`, value: 3 }]}
                    label = {`Shift`}
                    id = {`shift`}
                    updateFormData={updateFormData}
                    initialValue={formData.shift}
                    required={true}
                    setShift={true}
                />
                <AutocompleteInput
                    options = { jobs || [] }
                    label = {`Job`}
                    id = {`job`}
                    updateFormData={updateFormData}
                    initialValue={formData.job}
                    onChange = {handleAmountChange}
                    required={true}
                />
                <ControlledDropdown
                    options = {[
                        { value: `NONE`, name: `No Code` },
                        { value: `STARTUP`, name: `Machine Setup and Startup` },
                        { value: `SPECKS`, name: `Specks` },
                        { value: `BURNT`, name: `Burnt Material` },
                        { value: `SCRATCH`, name: `Scratches` },
                        { value: `CREASES`, name: `Creases` },
                        { value: `VACUUM`, name: `Vacuum` },
                        { value: `VENT`, name: `Venting Issues` },
                        { value: `PULLER_ISS`, name: `Puller Issues` },
                        { value: `SAW_ISS`, name: `Saw Issues` },
                        { value: `MACH_MALFUNCTION`, name: `Machine Malfunction` },
                        { value: `COLOR_CHANGE`, name: `Color Change` },
                        { value: `BATCHANGE`, name: `Batch Change` },
                        { value: `ENDRUN`, name: `End of Run` },
                        { value: `POWER`, name: `Power Outage` },
                        { value: `SDOWN`, name: `Shutdown` },
                        { value: `ENGINEERING`, name: `Engineering/Testing` },
                        { value: `SPECS`, name: `Specs, Burnt Material, Scratches` }
                    ]}
                    label = {`Reason`}
                    id = {`reason`}
                    updateFormData={updateFormData}
                    initialValue={formData.reason}
                    required={true}
                />
 
                {formData.reason === `COLOR_CHANGE` && (
                    <>
                        <ControlledDropdown
                            options = {[
                                { name: `Almond`, value: `ALMOND` },
                                { name: `Black`, value: `BLACK` },
                                { name: `Clay`, value: `CLAY` },
                                { name: `Tan`, value: `TAN` },
                                { name: `White`, value: `WHITE` }
                            ]}
                            label = {`Color Change - From`}
                            shortLabel = {` Color`} 
                            id = {`colorFrom`}
                            updateFormData={updateFormData}
                            initialValue={formData.colorFrom || ``}
                        />
                        <ControlledDropdown
                            options = {[
                                { name: `Almond`, value: `ALMOND` },
                                { name: `Black`, value: `BLACK` },
                                { name: `Clay`, value: `CLAY` },
                                { name: `Tan`, value: `TAN` },
                                { name: `White`, value: `WHITE` }
                            ]}
                            label = {`Color Change - To`}
                            shortLabel = {`Color`} 
                            id = {`colorTo`}
                            updateFormData={updateFormData}
                            initialValue={formData.colorFrom || ``}
                        />
                    </>
                )}
       
            </Form>

            <Form >
                <Row>
                    <Col xs="auto">
                        <Button variant="danger" type="submit">Clear</Button>
                    </Col>
                    <Col xs="auto">
                        <Button onClick={handleSubmit}>Submit</Button> 
                    </Col>
                </Row>
            </Form>
            <br></br>
            {renderDataTable()}
 
        </div>
    )
}

export default App
