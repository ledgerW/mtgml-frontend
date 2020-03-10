import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading, Button } from "shards-react";
import { Jumbotron } from "react-bootstrap";
import { LinkContainer, Link } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { isAuthenticated } from "../libs/sessionLib";
import { Store } from "../flux";
import {
  Container,
  Row,
  Col
} from "shards-react";


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
    return [{}].concat(decks).map((deck, i) =>
      i !== 0 ? (
        <LinkContainer key={deck.deckId} to={`/decks/${deck.deckId}`}>
          <ListGroupItem>
            <ListGroupItemHeading>{deck.content.trim().split("\n")[0]}</ListGroupItemHeading>
            {"Created: " + new Date(deck.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/decks/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Add a new deck
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
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
        <h1>Your Decks</h1>
        <ListGroup>
          {!isLoading && renderDecksList(decks)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div>
      {props.authenticated.auth ? renderDecks() : renderLander()}
    </div>
  );
}
