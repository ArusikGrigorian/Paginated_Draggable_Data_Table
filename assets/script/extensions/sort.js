function getSorted(key, data, sortType) {
        
    let sorted = data.sort((el_1, el_2) => {
        if(isNaN(Number(el_1[key])) && isNaN(Number(el_2[key]))) {
            return el_1[key].localeCompare(el_2[key]);

        } else {
            return parseInt(el_1[key]) - parseInt(el_2[key]);
        }
    });
    
    if(sortType === "up") {
        return sorted;
        
    } else if(sortType === "down") {
        return sorted = sorted.reverse();
    }
};


export default getSorted;