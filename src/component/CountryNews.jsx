import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, ListGroup, Button } from 'react-bootstrap';

const CountryNews = ({ country }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${country.name.common}&pageSize=10&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );


        const sortedNews = response.data.articles.sort((a, b) => a.title.localeCompare(b.title));
        setNews(sortedNews);
      } catch (err) {
        setError('Error fetching news.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [country.name.common]);

  if (isLoading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Latest News in {country.name.common}</h3>
      <ListGroup>
        {news.map((article, index) => (
          <ListGroup.Item key={index}>
            <strong>{article.title}</strong>
            <p>{article.description}</p>
            <Button variant="link" href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CountryNews;
