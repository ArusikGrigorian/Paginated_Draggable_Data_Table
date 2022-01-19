import separateMarkUps from "../helpers/preRender.js";

function getPaginated(listLength, innerCounter, data, $tHead, $tBody) { 
    if(!data) {
        $tBody.innerHTML = "Oops, no result :(";
        $tBody.classList.add("absence");
        $tBody.style.overflowY = "hidden";

        return;
    }
    
    let start = (innerCounter - 1) * listLength;
    let end = listLength + start;
    let sliced = data.slice(start, end);

    if(sliced.length !== 0) {
        $tBody.classList.remove("absence");
        $tBody.style.overflowY = "scroll";
        separateMarkUps($tHead, sliced);
        separateMarkUps($tBody, sliced);
    }
};


export default getPaginated;