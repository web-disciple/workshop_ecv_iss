import Earth from "../modules/_earth";
import Iss from "../modules/_iss";
import LeafletMap from "../modules/_map";
import SpaceChart from "../modules/_SpaceChart";

// Dom as ready
document.addEventListener("DOMContentLoaded", () => {
    // create instance
    const earth = new Earth;
    const world3D = new WE.map('earth_container')
    const iss = new Iss;
    const leafletMap = new LeafletMap();
    const spaceChart = new SpaceChart();

    iss.dataByDate().then((iss_data_by_date) => {
        console.log("iss_data_by_date :", iss_data_by_date)
    })

    // init earth and world 3d instance after get data of iss
    iss.data().then((iss_data) => {
        // Earth
        // Init earth
        earth.initialize_earth(world3D, iss_data);

        // document listener of earth
        document.getElementById("earth_container").addEventListener("wheel", () => {
            earth.manageZoom(world3D);
        });

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
});
