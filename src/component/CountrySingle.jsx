import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Image, Spinner, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CountryNews from "./CountryNews";

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setWeatherLoading] = useState(true);

  const navigate = useNavigate();

  // console.log("location", location);
  // console.log("Weather: ", weather);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setWeather(response.data);
        setWeatherLoading(false);
      });
  }, [country.capital]);
  console.log("Weather: ", weather);

  if (isWeatherLoading) {
    return (
      <Col className="text-center-m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Image src={country.flags.svg}
               style={{
                maxWidth: '450px',
                maxHeight: '300px',
                objectFit: 'contain',
                border: '1px solid #ddd',
                padding: '10px',
                backgroundColor: '#f8f9fa',
              }}
          />
        </Col>
        <Col>
          <h2>{country.name.common}</h2>
          <h3>{country.capital}</h3>
          <div>
            <p>
              Right now it is <strong>{parseInt(weather.main.temp)} </strong>
              degrees in {country.capital} and {weather.weather[0].description}
            </p>
            <Image
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          </div>
          <Button variant="success" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <CountryNews country={country} />
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
