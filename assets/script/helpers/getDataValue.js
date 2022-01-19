function getDataValue(parent, dataType) {
    let clickedBtn = Array.from(parent.children).find(el => el.hasAttribute(dataType));
    let clickedBtnDataValue = clickedBtn.getAttribute(dataType);

    return Number(clickedBtnDataValue);
};


export default getDataValue;