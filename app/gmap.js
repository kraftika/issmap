export default class GMap { 
    constructor(initialPosition, mapId) {
        const mapElement = document.getElementById(mapId);

        this.initialize(mapElement, {
            center: new google.maps.LatLng(initialPosition.lat, initialPosition.lng),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        });

        google.maps.event.addDomListener(window, "load", this.initialize);
    }

    initialize(dom, options){
        this.map = new google.maps.Map(dom, options);
    }

    getMap() {
        return this.map;
    }
}