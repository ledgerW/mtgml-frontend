import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Tooltip
} from "shards-react";

export default function TopReferrals({props, deck}) {
  const [show, setShow] = useState(false);
  const [cardTarget, setTarget] = useState("id0");


  function toggleOn(event) {
    event.preventDefault();
    const id = event.target.id;
    setTarget(id);
    setShow(!show);
  }

  function toggleOff(event) {
    setShow(!show);
  }

  return (
    <Card small>
      <CardHeader className="border-bottom">
        <h6 className="m-0">Deck List</h6>
        <div className="block-handle" />
      </CardHeader>

      <div id="#init"></div>
      {cardTarget && (
      <Popover
        placement="right-start"
        open={show}
        target={`#${cardTarget}`}
      >
        <Image src={deck.cards[parseInt(cardTarget.match(/\d+/))].data.image_uris.border_crop} thumbnail />
      </Popover>
      )}

      <CardBody className="p-0">
        <ListGroup small flush className="list-group-small">
          {deck.cards.map((card, idx) => (
              <Button id={`id${idx}`} theme="light" className="d-flex px-3" onMouseOver={toggleOn} onMouseLeave={toggleOff}>
                <span className="text-semibold text-fiord-blue">{`${card.name} (${card.set.toUpperCase()})`}</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  {card.n}
                </span>
              </Button>
          ))}
        </ListGroup>
      </CardBody>

      <CardFooter className="border-top">
      {/*
        <Row>
          <Col>
            <FormSelect
              size="sm"
              value="last-week"
              style={{ maxWidth: "130px" }}
              onChange={() => {}}
            >
              <option value="last-week">Last Week</option>
              <option value="today">Today</option>
              <option value="last-month">Last Month</option>
              <option value="last-year">Last Year</option>
            </FormSelect>
          </Col>

          <Col className="text-right view-report">
            <a href="#">Full report &rarr;</a>
          </Col>
        </Row>
        */}
      </CardFooter>
    </Card>
  );
}
