/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './App.css'
import * as scripts from './scripts.js'
import React, { useState, useEffect } from 'react'


function App() {
    const [statusClass, setStatusClass] = useState(`yellow`)

    function displayData(data) {
        const body = document.getElementById(`test`)
        body.innerHTML = (`
            <div id="extstatus">
                <div id="extstatus_top">
                    <input type="button" id="extstatus_refresh" value="Refresh" />
                </div>
                <table id="extstatus_table">
                    <thead>
                        <tr>
                            <td>Line</td>
                            <td>Job</td>
                            <td>Item</td>
                            <td>Time Left (in Hours)</td>
                            <td>Status</td>
                            <td>Lots Remaining</td>
                        </tr>
                    </thead>
                    <tbody id="extstatus_lines"></tbody>
                </table>
            </div>`)
            
        let newElement
        let x = 0
        const table = document.getElementById(`extstatus_lines`)

        for (const line of data.rows) {
            newElement = document.createElement(`tr`)
            newElement.className = `extstatus_line`
            newElement.id = `extstatus_line_${line.line_no}`

            let statusColor = `yellow`
            if (line.description == `Running`) {
                statusColor = `green`
            } else if (line.description == `Shut Down`) {
                statusColor = `red`
            }

            if (!line.batch_hours_remaining || line.batch_hours_remaining.indexOf(`-`) != -1) {
                line.batch_hours_remaining = `0.00`
            }

            if (line.lots_remaining === null) {
                line.lots_remaining = 0
            }

            newElement.innerHTML = (`
                <td className="line_id">${line.line_no}</td>
                <td className="line_batch">${line.batch_no}</td>
                <td className="line_item">${line.inventory_id}</td>
                <td className="line_time">${line.batch_hours_remaining}</td>
                <td className="line_status"><div style="background-color: ${statusColor}">${line.description}</div></td>
                <td className="line_lots">${line.lots_remaining}</td>
            `)

            table.appendChild(newElement)
        }
    }

    async function loadData() {
        const data = await scripts.getLineStatusOverview()
        displayData(data)    
    }

    useEffect(() => {
        loadData()
    })

    return (
        <body id="test">
            
        </body>
    )
}

export default App
