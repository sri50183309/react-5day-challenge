import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5001/challenge-3fe5b/us-central1/api" //baseurl is advantage of axios API URL (cloud function url)
    //create back end to support 
});

export default instance;