import Earth from "../modules/_earth";
import Iss from "../modules/_iss";
import LeafletMap from "../modules/_map";
import SpaceChart from "../modules/_SpaceChart";
import Birthday from "../modules/_birthday";

// Dom as ready
document.addEventListener("DOMContentLoaded", () => {
    // create instance
    const earth = new Earth;
    const world3D = new WE.map('earth_container')
    const iss = new Iss;
    const leafletMap = new LeafletMap();
    const spaceChart = new SpaceChart();
    const birthday = new Birthday();

    // init earth and world 3d instance after get data of iss
    iss.data().then((iss_data) => {
        // Earth
        // Init earth
        earth.initialize_earth(world3D, iss_data);

        // document listener of earth
        document.getElementById("find-iss-globe-1").addEventListener("click", () => {
            earth.flyToIss(world3D)
        })
        document.getElementById("find-iss-globe-2").addEventListener("click", () => {
            earth.flyToIss(world3D)
        })
        document.getElementById("find-iss-globe-3").addEventListener("click", () => {
            earth.flyToIss(world3D)
        })
        document.getElementById("find-iss-globe-4").addEventListener("click", () => {
            earth.flyToIss(world3D)
        })

        // Leafletmap
        // init leaflet map
        leafletMap.init(iss_data.latitude, iss_data.longitude)

        // document listener of map
        document.getElementById("road-to-map-1").addEventListener("click", () => {
            leafletMap.animateFlyTo();
        })
        document.getElementById("road-to-map-2").addEventListener("click", () => {
            leafletMap.animateFlyTo();
        })
        document.getElementById("road-to-map-3").addEventListener("click", () => {
            leafletMap.animateFlyTo();
        })

        // Chartjs
        // init space chart
        spaceChart.init(iss_data.timestamp, iss_data.velocity);

        // Update ISS position (10s)
        setInterval(() => {
            iss.data().then((iss_data) => {
                earth.updateIssMarker(world3D, iss_data.latitude, iss_data.longitude)
                spaceChart.spaceGraphData(iss_data.timestamp, iss_data.velocity);
                leafletMap.addIssMarker(iss_data.latitude, iss_data.longitude)
            })
        }, 10000);
    })

    birthday.init();
    birthday.input.addEventListener("change", (input) => {
        birthday.getSign(input.target.valueAsNumber).then((data) => [
        ]);
    })
});