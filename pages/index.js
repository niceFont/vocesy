import { Jumbotron, Row, Col, Container, Button } from "react-bootstrap";
import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          height: "90vh",
          background: "url('/static/background1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Row>
          <Col sm="8" md="8" lg="6" xs="10">
            <Jumbotron
              style={{
                margin: "35% 0 0 10%",
                width: "100%",
                color: "black",
              }}
            >
              <h1>Welcome to Vocesy!</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation
              </p>
              <Link href="/decks">
                <Button size="lg" variant="dark">
                  Get Started
                </Button>
              </Link>
            </Jumbotron>
          </Col>
        </Row>
      </div>
      <Container
        style={{
          backgroundColor: "white",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          marginTop: 20,
          minHeight: "90vh",
        }}
      >
        <Row>
          <Col>
            <p>
              Create new Cards and start learning about things you're interested
              in.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Index;
