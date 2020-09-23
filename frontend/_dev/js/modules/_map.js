
import L from "leaflet"
class LeafletMap {
    constructor() {
        this.map = null,
            this.issMarker = null,
            this.coordinates = {
                latitude: null,
                longitude: null
            }
    }
    init(iss_latitude, iss_longitude) {
        this.coordinates.latitude = iss_latitude;
        this.coordinates.longitude = iss_longitude
        this.map = L.map('leaflet-map', {
            center: [51.505, -0.09],
            zoom: 13
        });
        this.addTexture();
        this.addIssMarker(iss_latitude, iss_longitude);
        this.map.setMaxBounds([[-90, -180], [90, 180]])
    }

    addTexture() {
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            minZoom: 2,
            maxZoom: 5,
        }).addTo(this.map);
    }

    addIssMarker(iss_latitude, iss_longitude) {
        this.coordinates.latitude = iss_latitude;
        this.coordinates.longitude = iss_longitude
        const issIcon = L.icon({
            iconUrl: '/ressources/images/icons/sattelite.svg',
            shadowUrl: '/ressources/images/icons/sattelite.svg',
            iconSize: [40, 40],
            shadowSize: [40, 40],
            iconAnchor: [40, 40],
            shadowAnchor: [40, 40],
            popupAnchor: [40, 40]
        });

        if (this.issMarker !== null) {
            const deleteOldMarker = new Promise((success) => {
                this.map.removeLayer(this.issMarker);
                this.issMarker = null;
                success(true)
            })
            deleteOldMarker.then(() => {
                this.issMarker = L.marker([iss_latitude, iss_longitude], { icon: issIcon }).addTo(this.map);
            })
        }
        else {
            this.issMarker = L.marker([iss_latitude, iss_longitude], { icon: issIcon }).addTo(this.map);
        }
    }

    animateFlyTo() {
        this.map.flyTo([this.coordinates.latitude, this.coordinates.longitude], 5)
    }
}

export default LeafletMap;