/* eslint-disable no-undef */
export const getCoopCustomers = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/coop-customers`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Failed to get Ids ${error}`)
    }
}

export const getAllCustomers = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/all-customers`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Failed to get Names ${error}`)
    }
}

export const fetchAdjustmentHistory = async (id) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/getAdjustments?id=${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Failed to get Adjustment History ${error}`)
    }
}

export const fetchCustomerInfo = async (idChecked, input) => {
    try {
        let response
        if (idChecked) {
            response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/customerinfo-byid?id=${input}`)
        } else {
            response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/customerinfo-byname?name=${input}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Failed to get Customer Info ${error}`)
    }
}

export const fetchCoopCustomerInfo = async (idChecked, input) => {
    try {
        let response
        if (idChecked) {
            response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/coop-customerinfo/byid?id=${input}`)
        } else {
            response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/coop-customerinfo/byname?name=${input}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Failed to get COOP Customer Info ${error}`)
    }
}

export const insertAdjustment = async (id, company, amount, user, year, note) => {
    try {
        await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/addAdjustment?id=${id}&company=${company}&amount=${amount}&year=${year}&note=${note}&user=${user}`, { method: `POST` })   
    } catch (error) {
        throw new Error(`Failed to post Adjustment ${error}`)
    }
}

export const updateAdjustment = async(id, amount, year, note, user) => {
    try {
        await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/updateadjustment?id=${id}&adjustment=${amount}&year=${year}&note=${note}&user=${user}`, { method: `PATCH` })    
    } catch (error) {
        throw new Error(`Failed to patch Adjustment ${error}`)
    }
}

export const deleteAdjustment = async(id) => {
    try {
        await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/deleteadjustment?id=${id}`, { method: `DELETE` })     
    } catch (error) {
        throw new Error(`Failed to delete Adjustment ${error}`)
    }
}

export const updateCompanyNotes = async(id, company, notes) => {
    try {
        await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/updateCompanyNotes?id=${id}&company=${company}&notes=${notes}&user=Default`, { method: `PATCH` })    
    } catch (error) {
        throw new Error(`Failed to patch Company Notes ${error}`)
    }
}

export const insertCoopCustomer = async(customerId, customerName, company, notes, user) => {
    try {
        await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/coop/add-coop-customer?customerId=${customerId}&customerName=${customerName}&company=${company}&notes=${notes}&user=${user}`, { method: `POST` })     
    } catch (error) {
        throw new Error(`Failed to add new COOP customer ${error}`)
    }
}