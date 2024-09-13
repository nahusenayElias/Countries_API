import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  console.log("Countries: ", countries);
  console.log("isLoading: ", isLoading);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Col className="text-center m-5">
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
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="search"
              onChange={(e) => dispatch(search(e.target.value))}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries.map((country) => (
          <Col className="mt-5" key={country.name.official}>
            <Card className="h-100">
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="rounded h-50"
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />
              </LinkContainer>
              <Card.Body className="d-flex flex column">
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">
                  {country.name.official}
                </Card.Subtitle>
                <ListGroup
                  variant="flush"
                  className="flex-grow-1 justify-content-center"
                >
                  <ListGroupItem>
                    <i className="bi bi-people me-2">
                      {country.population.toLocaleString()}
                    </i>
                  </ListGroupItem>

                  <ListGroupItem>
                    <i className="me-2">
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(",") || "No currency"}
                    </i>
                  </ListGroupItem>
                  <ListGroupItem>
                    <i className="me-2">
                      {Object.values(country.languages || {})
                        .map((language) => language)
                        .join(",") || "No language"}
                    </i>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
