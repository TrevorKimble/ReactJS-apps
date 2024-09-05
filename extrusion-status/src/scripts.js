/* eslint-disable no-undef */
export const getLineStatusOverview = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_API_ENDPOINT}/extrusions/line-status-overview`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Failed to get line status overview \n${error}`)
    }
}