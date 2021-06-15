import axios from "axios";
import { expressDevelopmentUrl, expressProductionUrl } from "./api.routes";

const expressApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? expressProductionUrl
      : expressDevelopmentUrl,
});

expressApi.interceptors.response.use(
  (res) => {
    console.log(
      "[RESPONSE INTERCEPTOR]",
      res.request.responseURL,
      res.status,
      res.data
    );
    return res;
  },
  async (error) => {
    console.error(
      "[BACKEND LINK ERROR] Check API call or diagnose server connection."
    );
    return error;
  }
);

export default expressApi;
