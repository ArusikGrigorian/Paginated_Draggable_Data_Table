// -------------------------------------------> imports

import {INITIAL_DATA, DOM_ELEMENTS} from "./configurations/config.js";
import generalData from "./api/fetch.js";
import getTransformed from "./helpers/transform.js";
import renderPagesNumbers from "./operationals/renderPageNumbers.js";
import getPaginated from "./operationals/paginating.js";
import getDataValue from "./helpers/getDataValue.js";
import filterFromData from "./extensions/search.js";
import getSorted from "./extensions/sort.js";
import getDropTarget from "./helpers/getDropTarget.js";

// -------------------------------------------> event listeners

DOM_ELEMENTS.$questBtnWrapper.addEventListener("click", questForData);
DOM_ELEMENTS.$cntrlPanel.addEventListener("click", changePage);
DOM_ELEMENTS.$searchInput.addEventListener("input", searchForData);

// -------------------------------------------> event handlers
// 1. general getter & render passer

function questForData(event) {

    if(event.target.closest(".quest-button")) {
        let listLength = parseInt(event.target.value);

        event.target.dataset.value = listLength;
        DOM_ELEMENTS.$questWrapper.style.display = "none";
        DOM_ELEMENTS.$loader.style.display = "block";
        getDataList(listLength);
    }
};

async function getDataList(listLength, limitLength, requiredData, searchValue, sortBy, sortType) {
    let searchedData;
    let response;

    if(requiredData) {
        response = requiredData;
    } else {
        response = await generalData.getGenData();
    }

    if(limitLength) {
        INITIAL_DATA.innerCounter = limitLength;
    } else {
        INITIAL_DATA.innerCounter = INITIAL_DATA.innerCounter;
    }

    setTimeout(() => {
        if(!response) {
            DOM_ELEMENTS.$loader.style.display = "none";
            DOM_ELEMENTS.$errorPage.style.display = "block";
            DOM_ELEMENTS.$generalWrapper.style.background = "white";

            return;
        }
    }, 500); 
    
    DOM_ELEMENTS.$loader.style.display = "none";
    DOM_ELEMENTS.$tableWrapper.style.display = "flex";
    INITIAL_DATA.transformedData = getTransformed(response, generalData.sectionTitles);
    
    
    if(INITIAL_DATA.transformedData) {
        if(sortBy && sortType) {
            INITIAL_DATA.transformedData = getSorted(sortBy, INITIAL_DATA.transformedData, sortType);
        }

        getPaginated(listLength, INITIAL_DATA.innerCounter, INITIAL_DATA.transformedData, DOM_ELEMENTS.$tHead, DOM_ELEMENTS.$tBody);
        renderPagesNumbers(INITIAL_DATA.transformedData.length, listLength, DOM_ELEMENTS.$cntrlPanel, INITIAL_DATA.innerCounter);
    }

    if(searchValue) {
         searchedData = filterFromData(searchValue, INITIAL_DATA.transformedData);
        
        if(!searchedData) {
            getPaginated(listLength, INITIAL_DATA.innerCounter, searchedData, DOM_ELEMENTS.$tHead, DOM_ELEMENTS.$tBody);
            renderPagesNumbers(false, listLength, DOM_ELEMENTS.$cntrlPanel);

            return;

        } else {
            INITIAL_DATA.innerCounter = 1;
            getPaginated(listLength, INITIAL_DATA.innerCounter, searchedData, DOM_ELEMENTS.$tHead, DOM_ELEMENTS.$tBody);
            renderPagesNumbers(searchedData.length, listLength, DOM_ELEMENTS.$cntrlPanel, INITIAL_DATA.innerCounter);
        }
    }
    
    DOM_ELEMENTS.$cntrBtn = Array.from(document.getElementsByClassName("controlPnlBtn"));
    DOM_ELEMENTS.$cntrBtn[INITIAL_DATA.innerCounter - 1].classList.add("active");
    DOM_ELEMENTS.$theadTr = document.getElementById("thead-tr");
    DOM_ELEMENTS.$theadTr.addEventListener("click", sortData);
    DOM_ELEMENTS.$tbodyTr = Array.from(document.getElementsByClassName("draggable"));
    DOM_ELEMENTS.$tbodyTr.forEach((tr, i) => tr.dataset.id = i);
    addDragEvents(listLength, INITIAL_DATA.innerCounter, DOM_ELEMENTS.$tbodyTr, DOM_ELEMENTS.$tBody);
};


// 2. page change event

function changePage(event) {
    let clickedQuestBtn = getDataValue(DOM_ELEMENTS.$questBtnWrapper, "data-value");

    if(event.target.closest(".controlPnlBtn")) {
        event.target.dataset.number = event.target.value;
        getDataList(clickedQuestBtn, Number(event.target.dataset.number), INITIAL_DATA.transformedData);
    }
};


// 3. search input event

function searchForData(event) {
    let searchValue = event.target.value;
    let clickedQuestBtn = getDataValue(DOM_ELEMENTS.$questBtnWrapper, "data-value");

    getDataList(clickedQuestBtn, undefined, INITIAL_DATA.transformedData, searchValue);
};

// 4. sort data event

function sortData(event) {
    let clickedQuestBtn = getDataValue(DOM_ELEMENTS.$questBtnWrapper, "data-value");
    let sortBy;
    let type;
    
    if(event.target.closest(".fa-sort-up")) {
        sortBy = event.target.parentNode.previousSibling.innerHTML;
        type = "up";
    }

    if(event.target.closest(".fa-sort-down")) {
        sortBy = event.target.parentNode.previousSibling.innerHTML;
        type = "down";
    }

    getDataList(clickedQuestBtn, undefined, INITIAL_DATA.transformedData, undefined, sortBy, type);
};


// 5. drag data event

function addDragEvents(listLength, limitLength, trs, tbody) {
    let movedId;

    trs.forEach(tr => {
        tr.addEventListener("dragstart", function () {
            this.classList.add("mover");
        });

        tr.addEventListener("dragend", function () {
            this.classList.remove("mover");
            let moverId = Number(this.getAttribute('data-id'));
            let moverIndex = (limitLength - 1) * listLength + moverId;
            let movedIndex = (limitLength - 1) * listLength + movedId;
            let tempId;

            if(moverId > movedId) {
                tempId = INITIAL_DATA.transformedData[movedIndex];
                INITIAL_DATA.transformedData[movedIndex] = INITIAL_DATA.transformedData[moverIndex];
                INITIAL_DATA.transformedData[moverIndex] = tempId;
                getDataList(listLength, undefined, INITIAL_DATA.transformedData);
            }

            if(moverId < movedId) {
                tempId = INITIAL_DATA.transformedData[movedIndex - 1];
                INITIAL_DATA.transformedData[movedIndex - 1] = INITIAL_DATA.transformedData[moverIndex];
                INITIAL_DATA.transformedData[moverIndex] = tempId;
                getDataList(listLength, undefined, INITIAL_DATA.transformedData);
            }
        })
    });

    tbody.addEventListener("dragover", function (event) {
        event.preventDefault();
        let mover = document.querySelector(".mover");
        let dropByTr = getDropTarget(tbody, event.clientY);

        if(!dropByTr) {
            this.append(mover);
            movedId = listLength;
        } else {
            this.insertBefore(mover, dropByTr);
            movedId = Number(dropByTr.getAttribute('data-id'));
        }
    });
};
