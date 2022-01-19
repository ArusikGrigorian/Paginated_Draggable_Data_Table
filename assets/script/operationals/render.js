import {DOM_ELEMENTS} from "../configurations/config.js";


function renderMarkUp(array, parent) { 
    let stringTd = ``;

    if(parent ===  DOM_ELEMENTS.$tHead) {

        for(let i = 0; i < array.length; i++) {
            stringTd += `<td class="thead-td"><span>${array[i]}</span><div class="fa-icons"><i class="fa fa-sort-up"></i><i class="fa fa-sort-down"></i></div></td>`;
        }
        return `<tr id="thead-tr">${stringTd}</tr>`;

    } else {

        for(let i = 0; i < array.length; i++) {
            stringTd += `<td>${array[i]}</td>`;
        }
        return `<tr class="draggable" draggable="true">${stringTd}</tr>`;
    }
};


export default renderMarkUp;