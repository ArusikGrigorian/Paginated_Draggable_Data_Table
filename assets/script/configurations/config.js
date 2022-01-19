const API_DATA = {
    BASE_URL : "https://ghibliapi.herokuapp.com/", // "https://api.spacexdata.com/v3/",
    ENDPOINT : "films/", // "launchpads", // "cores",
    SECTION_TITLES : ["rt_score", "title", "director", "producer", "release_date", "running_time"], // ["id", "status", "site_name_long"], // ["core_serial", "status", "original_launch", "details"],
};


const INITIAL_DATA = {
    innerCounter : 1,
    transformedData : null,
};


const DOM_ELEMENTS = {
    $generalWrapper : document.querySelector(".general-wrapper"),
    $questWrapper : document.querySelector(".quest-wrapper"),
    $questBtnWrapper : document.querySelector(".quest-btn-wrapper"),
    $tableWrapper : document.querySelector(".table-wrapper"),
    $errorPage : document.querySelector(".error-wrapper"),
    $tHead : document.querySelector(".t-head"),
    $tBody : document.querySelector(".t-body"),
    $cntrlPanel : document.querySelector(".controlPanel"),
    $cntrBtn : null,
    $loader : document.querySelector(".loader"),
    $currentPageNumber : document.querySelector(".current"),
    $searchInput : document.querySelector(".search"),
    $theadTr : null,
    $tbodyTr : null,
};


export {API_DATA, INITIAL_DATA, DOM_ELEMENTS};