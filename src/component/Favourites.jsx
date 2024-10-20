import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountrySingle from "./CountrySingle";
import { Button, Form, Col, Row, Spinner, Container } from "react-bootstrap";
import CountryCard from "./CountryCard";

const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const countriesLoading = useSelector((state) => state.countries.isLoading);

  console.log("favouritesList: ", favouritesList);
  console.log("countriesList inside favourites: ", countriesList);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (countriesLoading || favouritesLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border" role="status" className="center">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Container fluid>
      <Row>
        <Col mt-5 d-flex justify-content-center>
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              arial-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>

      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => {
            return country.name.official
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>
      <br />
      <Row xs={2} md={3} lg={4} className="g-3">
        <Button onClick={() => dispatch(clearFavourites())}>
          Clear Favourites
        </Button>
      </Row>
    </Container>
  );
};
export default Favourites;
