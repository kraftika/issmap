import GMap from './gmap';
import getPosition from './iss';
import getLatLngOnMap from './latlngTranslations';
import { iconMap } from './config';

const css = require('./app.scss');

let map = null;
let markers = [];

let counter = 0;
let interval = null;

const cleanUp = (map, markers) => markers.map(map => map.setMap(null));

const displayPosition = () => {
    getPosition()
        .then(data => {
            if (interval && counter > 5) {
                clearInterval(interval);
            }
            const pos = getLatLngOnMap(data);
            const position = new google.maps.LatLng(pos.lat, pos.lng);

            map = !map ? new GMap(pos, 'google-map') : map; 

            const displayedMap = map.getMap();
            cleanUp(map, markers);

            const marker = new google.maps.Marker({
                icon: iconMap(),
                position,
                map: displayedMap,
                title: 'ISS station'
            });
            markers.push(marker);
            counter++;
        })
        .catch(error => 
            console.log(error)
        );
}

function startFollowingISS() {
    interval = setInterval(() => displayPosition(), 2000);
}

startFollowingISS();