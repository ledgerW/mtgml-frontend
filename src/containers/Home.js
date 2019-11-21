import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
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
  }, [props.isAuthenticated]);

  function loadDecks() {
    return API.get("decks", "/decks");
  }

  function renderDecksList(decks) {
    return [{}].concat(decks).map((deck, i) =>
      i !== 0 ? (
        <LinkContainer key={deck.deckId} to={`/decks/${deck.deckId}`}>
          <ListGroupItem header={deck.content.trim().split("\n")[0]}>
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
        <div className="lander">
          <h1>MTGML</h1>
          <p>Understand your deck.</p>
          <p>Make it better.</p>
        </div>
      );
    }

  function renderDecks() {
    return (
      <div className="decks">
        <PageHeader>Your Decks</PageHeader>
        <ListGroup>
          {!isLoading && renderDecksList(decks)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderDecks() : renderLander()}
    </div>
  );
}
