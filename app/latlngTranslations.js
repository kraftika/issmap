export default function getLatLngOnMap(latlngData) {
    const { iss_position } = latlngData;

    return {
        lat: iss_position.latitude,
        lng: iss_position.longitude
    }
}