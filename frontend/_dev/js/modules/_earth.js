import Helpers from "../modules/_helpers";

class Earth {
    constructor() {
        this.currentMarkerIss = null,
            this.viewOptions = {
                a: 30.8011,
                b: 8.2266,
                zoom: 2.5,
                zoomMobile: 0,
            }
    }
    initialize_earth(world3D, iss_coordinates) {
        this.manageZoom(world3D);
        this.addTexture(world3D);
        this.animateEarth(world3D);
        this.updateIssMarker(world3D, iss_coordinates.latitude, iss_coordinates.longitude)
    }

    manageZoom(world3D) {
        const helpers = new Helpers;
        if (!helpers.isMobile()) {
            world3D.setView([this.viewOptions.a, this.viewOptions.b], this.viewOptions.zoom);
        }
        else {
            world3D.setView([this.viewOptions.a, this.viewOptions.b], this.viewOptions.zoomMobile);
        }
    }

    animateEarth(world3D) {
        var before = null;
        requestAnimationFrame(function animate(now) {
            var c = world3D.getPosition();
            var elapsed = before ? now - before : 0;
            before = now;
            world3D.setCenter([c[0], c[1] + 0.1 * (elapsed / 60)]);
            requestAnimationFrame(animate);
        });
    }

    addTexture(world3D) {
        WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
            tileSize: 256,
            bounds: [[-85, -180], [85, 180]],
            minZoom: 0,
            maxZoom: 0,
            tms: true
        }).addTo(world3D);
    }

    updateIssMarker(world3D, latitude, longitude) {
        if (this.currentMarkerIss !== null) {
            const deleteOldMarker = new Promise((success, failed) => {
                this.currentMarkerIss.removeFrom(world3D)
                this.currentMarkerIss = null;
                success(true)
            })
            deleteOldMarker.then(() => {
                let marker = WE.marker([latitude, longitude], '/ressources/images/icons/sattelite.svg', 100, 100).addTo(world3D);
                this.currentMarkerIss = marker
            })
        }
        else {
            let marker = WE.marker([latitude, longitude], '/ressources/images/icons/sattelite.svg', 100, 100).addTo(world3D);
            this.currentMarkerIss = marker
        }
    }

}

export default Earth;