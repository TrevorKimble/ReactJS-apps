const AdjustmentHistory = () => {  

    return (
        <div id="history_section">
            <div className="section_title_div">
                <h3 className="section_title">Adjustment History</h3>
            </div>
            <table id="adjustment_history">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Year</th>
                        <th>Adjustment Date</th>
                    </tr>
                </thead>
                <tbody id='adjustment-table'>

                </tbody>
            </table> 
        </div>
    )
}

export default AdjustmentHistory