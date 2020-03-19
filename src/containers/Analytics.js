import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import SmallStats from "../components/common/SmallStats";
import TopReferrals from "../components/common/TopReferrals";
import CountryReports from "../components/common/CountryReports";
import Sessions from "../components/analytics/Sessions";
import UsersByDevice from "../components/analytics/UsersByDevice";
import GoalsOverview from "../components/analytics/GoalsOverview/GoalsOverview";

import colors from "../utils/colors";

export default function Analytics(props) {
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadDeck(analyze=false) {
      let httpInit = {
        queryStringParameters: {
            analyze: analyze
        }
      };

      return API.get("mtgml", `/decks/${props.match.params.id}`, httpInit);
    }

    async function onLoad() {
      try {
        const deck = await loadDeck(true);
        //cards.sort((a, b) => (a.cardId > b.cardId) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
        deck.cards = deck.cards.sort((a, b) => (a.cardId > b.cardId) ? 1 : -1);
        deck.cards_data = deck.cards_data.sort((a, b) => (a.cardId.S > b.cardId.S) ? 1 : -1);
        console.log(deck.cards);
        console.log(deck.cards_data);
        const { name, cards, cards_data } = deck;

        //console.log(cards_data[0]);
        //console.log(cards_data[0].image_uris.M.small.S);

        setDeck(deck);
      } catch (e) {
        alert(e);
      }

      setIsLoading(true);
    }

    onLoad();
  }, [props.match.params.id]);

  return (
    <div>
    {isLoading && (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        {/* Page Header :: Title */}
        <PageTitle title="Analyze" subtitle="Decks" className="text-sm-left mb-3" />

        {/* Page Header :: Actions */}
        <Col xs="12" sm="4" className="col d-flex align-items-center">
          <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
            <Button theme="white" tag={NavLink} to="/analytics">
              Traffic
            </Button>
            <Button theme="white" tag={NavLink} to="/ecommerce">
              Sales
            </Button>
          </ButtonGroup>
        </Col>

        {/* Page Header :: Datepicker */}
        <Col sm="4" className="d-flex">
          <RangeDatePicker className="justify-content-end" />
        </Col>
      </Row>

      <Row>
        <Col lg="3" md="6" sm="12" className="mb-4">
          <TopReferrals props={props} deck={deck}/>
        </Col>

        <Col className="mb-4">
          <Row>
            {smallStats.map((stats, idx) => (
              <Col key={idx} className="mb-4">
                <SmallStats
                  id={`small-stats-${idx}`}
                  chartData={stats.datasets}
                  chartLabels={stats.chartLabels}
                  label={stats.label}
                  value={stats.value}
                  percentage={stats.percentage}
                  increase={stats.increase}
                  decrease={stats.decrease}
                />
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="mb-4">
              <Sessions />
            </Col>
          </Row>

          <Row>
            <Col className="mb-4">
              <UsersByDevice />
            </Col>

            <Col className="mb-4">
              <GoalsOverview />
            </Col>
          </Row>

          {/*
          <Row>
            <Col lg="8" className="mb-4">
              <CountryReports />
            </Col>
          </Row>
          */}

        </Col>
      </Row>
    </Container>
    )}
    </div>
  );
}


const smallStats = [
  {
    label: "Users",
    value: "2,390",
    percentage: "12.4%",
    increase: true,
    chartLabels: [null, null, null, null, null],
    decrease: false,
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: colors.primary.toRGBA(0.1),
        borderColor: colors.primary.toRGBA(),
        data: [9, 3, 3, 9, 9]
      }
    ]
  },
  {
    label: "Sessions",
    value: "8,391",
    percentage: "7.21%",
    increase: false,
    chartLabels: [null, null, null, null, null],
    decrease: true,
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: colors.success.toRGBA(0.1),
        borderColor: colors.success.toRGBA(),
        data: [3.9, 4, 4, 9, 4]
      }
    ]
  },
  {
    label: "Pageviews",
    value: "21,293",
    percentage: "3.71%",
    increase: true,
    chartLabels: [null, null, null, null, null],
    decrease: false,
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: colors.warning.toRGBA(0.1),
        borderColor: colors.warning.toRGBA(),
        data: [6, 6, 9, 3, 3]
      }
    ]
  },
  {
    label: "Pages/Session",
    value: "6.43",
    percentage: "2.71%",
    increase: false,
    chartLabels: [null, null, null, null, null],
    decrease: true,
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: colors.salmon.toRGBA(0.1),
        borderColor: colors.salmon.toRGBA(),
        data: [0, 9, 3, 3, 3]
      }
    ]
  }
]

/*
Analytics.propTypes = {
  /**
  /* The small stats data.

  smallStats: PropTypes.array
};

Analytics.defaultProps = {
  smallStats: [
    {
      label: "Users",
      value: "2,390",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: "Sessions",
      value: "8,391",
      percentage: "7.21%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    },
    {
      label: "Pageviews",
      value: "21,293",
      percentage: "3.71%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.warning.toRGBA(0.1),
          borderColor: colors.warning.toRGBA(),
          data: [6, 6, 9, 3, 3]
        }
      ]
    },
    {
      label: "Pages/Session",
      value: "6.43",
      percentage: "2.71%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.salmon.toRGBA(0.1),
          borderColor: colors.salmon.toRGBA(),
          data: [0, 9, 3, 3, 3]
        }
      ]
    }
  ]
};
*/
