import { urlIssAPI as url } from './config';

export default function getPosition() {
    return fetch(url)
        .then(response => 
            response.json());
}