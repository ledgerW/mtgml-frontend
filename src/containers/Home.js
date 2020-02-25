import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, ListGroupItemHeading } from "shards-react";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
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
      console.log('From Home...');
      console.log('Store.isAuthenticated(): ' + Store.isAuthenticated());
      if (!Store.isAuthenticated()) {
        return;
      }

      try {
        const decks = await loadDecks();
        setDecks(decks);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, []);


  function loadDecks() {
    return API.get("decks", "/decks");
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
            <Col lg="3" md="5" className="auth-form mx-auto my-auto">
              <div>
                <h1>MagicML</h1>
                <p>Understand your deck.</p>
                <p>Make it better.</p>
              </div>
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

  console.log('From Home...');
  console.log('Store.isAuthenticated(): ' + Store.isAuthenticated());

  return (
    <div>
      {Store.isAuthenticated() ? renderDecks() : renderLander()}
    </div>
  );
}
