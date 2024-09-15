import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CountrySingle = () => {
  const location = useLocation();
  const country = location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setWeatherLoading] = useState(true);
  const navigate = useNavigate();
  console.log("location", location);
  console.log("Weather: ", weather);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .catch((error) => console.log(error))
      .then((response) => {
        setWeather(response.data);
        setWeatherLoading(false);
      });
  }, [country.capital]);
  if (isWeatherLoading) {


return(

    <Container fluid>
        <Row>
            <Col className="mt-5 d-flex justify-content-center">
                <Img src={country.flags.png}
                    alt={country.name.common}
                    style={{width: "18rem"}}
                    />
            </Col>
        </Row>
    </Container>
        )
    return <div>loading weather ...</div>;
  }
  return <div>CountrySingle is here</div>;
};

export default CountrySingle;
