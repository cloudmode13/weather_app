import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../Styles/Current.css';

function Current({ city, current }) {
  return (
    <div className="current-cont">
      <b className="weather-heading">{city} Weather</b>
      <Row xs={1} md={4}>
        <Col>
          <Card>
            <div className="flexicontext">
              <Card.Img src={current.condition.icon} alt="" className="icon" />
              <Card.Text>{current.condition.text}</Card.Text>
            </div>
            <Card.Body>
              <Card.Text>
                Temp <span>:</span> <p>{current.temp_c}&deg;C</p>
              </Card.Text>
              <Card.Text>
                Feelslike : <p>{current.feelslike_c}&deg;C</p>
              </Card.Text>
              <Card.Text>
                Wind Speed : <p>{current.wind_kph} km/h</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Current;
