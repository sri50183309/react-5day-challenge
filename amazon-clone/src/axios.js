import axios from "axios"

const instance = axios.create({
    //baseURL: "http://localhost:5001/challenge-3fe5b/us-central1/api" //baseurl is advantage of axios API URL (cloud function url)
    baseURL: "https://us-central1-challenge-3fe5b.cloudfunctions.net/api"

    //create back end to support 
});

export default instance;