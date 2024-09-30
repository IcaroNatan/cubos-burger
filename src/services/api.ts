import axios from "axios";

export default axios.create({
  baseURL: "https://my-json-server.typicode.com/IcaroNatan/cubos-burger/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
