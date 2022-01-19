import {DOM_ELEMENTS} from "../configurations/config.js";
import renderMarkUp from "../operationals/render.js";


function separateMarkUps(parent, slicedData) {
    if(parent === DOM_ELEMENTS.$tHead) {
        parent.innerHTML = renderMarkUp(Object.keys(slicedData[0]), parent);
        
    } else if(parent === DOM_ELEMENTS.$tBody) {
        parent.innerHTML = slicedData.map(el => renderMarkUp(Object.values(el), parent)).join("");
    }
};


export default separateMarkUps;