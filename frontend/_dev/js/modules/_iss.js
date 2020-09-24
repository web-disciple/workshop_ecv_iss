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
}

export default Iss;