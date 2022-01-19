import {API_DATA} from "../configurations/config.js";
import checkedForError from "../helpers/error.js";

class GeneralData {
    
    constructor(url, endpoint = undefined, sectionTitles) {
        this.url = `${url}${endpoint}`;
        this.sectionTitles = sectionTitles;
    }

    async getGenData() {
        try {
            const response = await fetch(this.url);
            return checkedForError(response) ? await response.json() : checkedForError(response);
            
        } catch(error) {
            console.log(error);
        }
    }
};

const generalData = new GeneralData(API_DATA.BASE_URL, API_DATA.ENDPOINT, API_DATA.SECTION_TITLES);


export default generalData;