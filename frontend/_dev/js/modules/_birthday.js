import Helpers from "../modules/_helpers";

class Birthday {
    constructor() {
        this.date = null,
            this.input = null
    }

    init() {
        this.input = document.getElementById("birth");
    }

    async getSign(timestamp) {
        let date = new Date(timestamp)
        if (date.getFullYear() > 1998) {
            const helpers = new Helpers;
            let data = await helpers.getFromApi("https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=" + (timestamp / 1000));
            return await this.determineSign(data[0].latitude, data[0].longitude);
        }
        return { sign: "horse", city: null }
    }

    async determineSign(latitude, longitude) {
        const city = await this.determineCity(latitude, longitude);
        const latitude2 = Math.round(latitude);
        const longitude2 = Math.round(longitude);
        if (latitude2 <= 0 && longitude2 <= 0) {
            return { sign: "kangaroo", city: city }
        }
        if (latitude2 >= 0 && longitude2 >= 0) {
            return { sign: "koala", city: city }
        }
        if (latitude2 <= 0 && longitude2 >= 0) {
            return { sign: "lion", city: city }
        }
        if (latitude2 >= 0 && longitude2 <= 0) {
            return { sign: "snake", city: city }
        }
        return { sign: "koala", city: city }
    }

    async determineCity(latitude, longitude) {
        const helpers = new Helpers;
        let data = await helpers.getFromApi("https://api.wheretheiss.at/v1/coordinates/" + latitude + "," + longitude);
        console.log(data)
        return {
            city: data.timezone_id,
            country_code: data.country_code,
            map_url: data.map_url
        }
    }

}

export default Birthday;
