function filterFromData(value, data) {

    let filteredData = data.filter(el => {
        let values = Object.values(el);
        let existing;

        existing = values.find(innerEl => {
            if (innerEl.toString().toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
        })
    
        if(existing) {
            return el;
        }
    })

    return filteredData.length ? filteredData : undefined;
};


export default filterFromData;