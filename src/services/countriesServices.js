import axios from "axios";
import { getCountries, isLoading } from "../store/countriesSlice";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const initializeCountries = () => {
  return async (dispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const countries = await getAllCountries(); //Awaits countries data.
      dispatch(getCountries(countries)); //dispatch it.
    } catch (error) {
      console.error("error fetching countries:", error);
    } finally {
      dispatch(isLoading(false));
    }
  };
};
export { getAllCountries, initializeCountries };
