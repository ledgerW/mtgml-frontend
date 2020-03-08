import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Row, Col, CardFooter, Progress } from "shards-react";
import { API } from "aws-amplify";

export default function UserStats({ smallStats }) {
  const [isLoading, setIsLoading] = useState(true);
  const [numDecks, setNumDecks] = useState(null);
  const [numCreated, setNumCreated] = useState(1);
  const [numLoaded, setNumLoaded] = useState(1);

  useEffect(() => {
    async function onLoad() {
      const decks = await loadDecks();
      setNumDecks(decks.length);
      setNumCreated(1);
      setNumLoaded(1);

      setIsLoading(false);
    }

    onLoad();
  }, []);

  function loadDecks() {
    return API.get("mtgml", "/decks");
  }

  return (
    !isLoading && (
    <Card small className="user-stats mb-4">
      <CardBody>
        <Row>
          <Col sm={{ size: 8, order: 2, offset: 2 }} className="text-center">
            <h4 className="m-0">{numDecks}</h4>
            <span className="text-light text-uppercase">Number of Decks</span>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="py-0">
        <Row>
          <Col sm="12" md="6" className="border-top pb-3 pt-2 border-right">
            <div className="progress-wrapper">
              <div className="progress-label">Created</div>
              <Progress
                className="progress-sm"
                theme="success"
                value={`${(numCreated/numDecks)*100}`}
                striped
              >
                <span className="progress-value">{`${(numCreated/numDecks)*100}%`}</span>
              </Progress>
            </div>
          </Col>
          <Col sm="12" md="6" className="border-top pb-3 pt-2">
            <div className="progress-wrapper">
              <div className="progress-label">Uploaded</div>
              <Progress
                className="progress-sm"
                theme="primary"
                value={`${(numLoaded/numDecks)*100}`}
                striped
              >
                <span className="progress-value">{`${(numLoaded/numDecks)*100}`}</span>
              </Progress>
            </div>
          </Col>
        </Row>
      </CardFooter>
    </Card>
    )
  );
}

UserStats.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

UserStats.defaultProps = {
  smallStats: [
    {
      title: "Tasks",
      value: "1128"
    },
    {
      title: "Completed",
      value: "72.4%"
    }
  ]
};
