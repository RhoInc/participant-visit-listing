export default function listingSettings() {
    const exports = ['csv'];
    const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
    if (isBrowser()) {
        if (window !== undefined && window.XLSX) exports.unshift('xlsx');
    }
    return {
        pagination: false, // turn off pagination to view all IDs at the same time
        exports // default exports are to .xlsx and .csv
    };
}
