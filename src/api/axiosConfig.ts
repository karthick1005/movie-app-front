import axios from "axios";
export default axios.create({
  baseURL: "https://movieappbackend-9sjn.onrender.com",
  headers: { "skip-browser-warning": "true" },
});
