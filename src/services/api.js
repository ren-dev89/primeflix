import axios from "axios";

const api = {
  instance: axios.create({ baseURL: "https://api.themoviedb.org/3/" }),
  key: "5501d698c15bac114e90d57977c7cc69",
};

export default api;
