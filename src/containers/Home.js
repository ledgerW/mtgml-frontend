import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, Button } from "shards-react";
import { Jumbotron } from "react-bootstrap";
import { LinkContainer, Link } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { Store } from "../flux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge
} from "shards-react";

import PageTitle from "../components/common/PageTitle";


export default function Home(props) {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.authenticated.auth) {
        return;
      }

      try {
        const decks = await loadDecks();
        setDecks(decks);
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.authenticated]);


  function loadDecks() {
    return API.get("mtgml", "/decks");
  }

  function renderDecksList(decks) {
    return (
      <Row>
        {[{}].concat(decks).map((deck, i) =>
          i !== 0 ? (
          <Col lg="3" md="6" sm="12" className="mb-4" key={deck.deckId}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${require("../images/content-management/1.jpeg")})` }}
              >
                <Badge
                  pill
                  className="card-post__category bg-Business"
                >
                  {deck.name}
                </Badge>
                <div className="card-post__author d-flex">
                  <a
                    href="/profile"
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={{ backgroundImage: `url('${props.authenticated.profileURL}')` }}
                  >
                    {props.authenticated.userName}
                  </a>
                </div>
              </div>
              <CardBody>
                <h5 className="card-title">
                  <a href={`/decks/${deck.deckId}`} className="text-fiord-blue">
                    {deck.name ? deck.name.trim().split("\n")[0] : "Untitled Deck"}
                  </a>
                </h5>
                <p className="card-text d-inline-block mb-3"></p>
                <span className="text-muted">{new Date(deck.createdAt).toLocaleString()}</span>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <Col lg="3" md="6" sm="12" className="mb-4" key="new">
            <Card small className="card-post card-post--1">
              <div
                href="/decks/new"
                className="card-post__image"
                style={{ backgroundImage: `url(${require("../images/mstile-150x150.png")})` }}
              >
                <div className="card-post__author d-flex">
                  <a
                    href="/profile"
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={{ backgroundImage: `url('${props.authenticated.profileURL}')` }}
                  >
                    {props.authenticated.userName}
                  </a>
                </div>
              </div>
              <CardBody>
                <h5 className="card-title">
                  <a href="/decks/new" className="text-fiord-blue">
                    Add New Deck
                  </a>
                </h5>
                <p className="card-text d-inline-block mb-3"></p>
              </CardBody>
            </Card>
          </Col>
      ))}
      </Row>
      );
    }


  function renderLander() {
      return (
        <Container fluid className="main-content-container h-100 px-4">
          <Row noGutters className="h-100">
            <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }}>
              <Jumbotron className='text-center'>
                <h1>MagicML</h1>
                <p>Understand your deck.</p>
                <Button size="lg" href="/signup">Sign Up</Button>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      );
    }


  function renderDecks() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="My Decks" subtitle="Decks" className="text-sm-left" />
          </Row>
          {!isLoading && renderDecksList(decks)}
        </Container>
      </div>
    );
  }

  return (
    <div>
      {props.authenticated.auth ? renderDecks() : renderLander()}
    </div>
  );
}
