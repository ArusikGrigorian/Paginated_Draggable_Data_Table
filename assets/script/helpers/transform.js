function getTransformed(response, sectionTitles) {

    let transformedData = response.map(el => {
        let crnttTransformedData = {};

        for(let i = 0; i < sectionTitles.length; i++) {
            if(Object.keys(el).includes(sectionTitles[i])) {
                crnttTransformedData[sectionTitles[i]] = el[sectionTitles[i]];
            }
        }  
        return crnttTransformedData;
    })
    
    return transformedData;
};


export default getTransformed;