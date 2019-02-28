import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StartAuctionContainer } from './containers';
import { GetDomainStateContainer } from '../../containers';

class Bid extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <GetDomainStateContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <StartAuctionContainer/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Bid;
