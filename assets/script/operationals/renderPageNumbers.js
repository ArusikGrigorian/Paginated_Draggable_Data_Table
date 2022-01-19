function renderPagesNumbers(length, listLength, parent) {
    if(!length) {
        parent.style.display = "none";
    }

    parent.innerHTML = "";
    parent.style.display = "flex";
    let pageNumbers = Math.ceil(length / listLength);

    for(let i = 1; i <= pageNumbers; i++) {
        let numBox = document.createElement("div");
        
        numBox.classList.add("controlPnlBtn");
        numBox.value = i;
        numBox.innerHTML = i;
        parent.append(numBox);
    }
};


export default renderPagesNumbers;