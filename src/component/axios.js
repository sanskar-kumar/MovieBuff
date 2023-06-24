import axios from "axios";
//this is the base url to make the movie requests
const instance =axios.create({
     baseURL:'https://api.themoviedb.org/3',
});
export default instance;