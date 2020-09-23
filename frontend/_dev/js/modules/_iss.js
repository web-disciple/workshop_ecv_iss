import Helpers from "../modules/_helpers";

class Iss {
    async data() {
        const helpers = new Helpers;
        let data = await helpers.getFromApi("https://api.wheretheiss.at/v1/satellites/25544");
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            velocity: data.velocity,
            timestamp: data.timestamp
        }
    }
    async dataByDate(user_date) {
        const helpers = new Helpers;
        const today_timestamp = Date.now();
        // let data = await helpers.postFromApi('https://www.isstracker.com/ajax/fetchTLE.php');
        // console.log(today_timestamp, data)
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            velocity: data.velocity,
            timestamp: data.timestamp
        }
    }
}

export default Iss;