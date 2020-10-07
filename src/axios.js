import axios from "axios";

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3"
})

export default instance;
//There can only be one default export in a file but multiple can have multiple simple exports

//if the export is default than we can name the import whatever we want when importing this file
//Like import axios(here we used axios instead of instance without destructuring) from "./axios"

//But if it's not default than we have to use destructuring 
//Like import {instance} from "./axios"