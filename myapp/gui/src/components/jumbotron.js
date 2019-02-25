import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
} from 'reactstrap';

export default class Jumpotron extends Component {
  

  render() {
    return (
      <Router>
        <div>
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <h1 className="display-3">Καλώς ήλθες στα Ανομολόγητα</h1>
                  <p className="lead">
                      Φτίαξε και εσύ πρόφιλ για να μπορείς να συμμετέχεις 
                  </p>
                  <hr className="my-2" /> 
                  <p>
                      <Button
                      tag="a"
                      color="info"
                      size="large"
                      
                      target="_blank"
                    >
                      Εγγραφή
                    </Button>
                  </p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
          
        </div>
      </Router>
    );
  }
}