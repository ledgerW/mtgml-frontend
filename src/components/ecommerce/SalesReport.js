import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  Button
} from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

export default function SalesReport({props, hist, title}) {
  const [isLoading, setIsLoading] = useState(true);
  const legendRef = createRef();
  const canvasRef = createRef();

  console.log(Object.values(hist));

  const chartData = {
    labels: Object.keys(hist).slice(1),
    datasets: [
      {
        label: "All",
        fill: "start",
        data: Object.values(hist).slice(1),
        backgroundColor: "rgba(0, 123, 255, 1)",
        borderColor: "rgba(0, 123, 255, 1)",
        pointBackgroundColor: "#FFFFFF",
        pointHoverBackgroundColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1.5
      }/*,
      {
        label: "Shipping",
        fill: "start",
        data: [
          55,
          30,
          18,
          22,
          19,
          30,
          22
        ],
        backgroundColor: "rgba(72, 160, 255, 1)",
        borderColor: "rgba(72, 160, 255, 1)",
        pointBackgroundColor: "#FFFFFF",
        pointHoverBackgroundColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1.5
      },
      {
        label: "Tax",
        fill: "start",
        data: [
          11,
          18,
          22,
          19,
          33,
          29,
          28
        ],
        backgroundColor: "rgba(153, 202, 255, 1)",
        borderColor: "rgba(153, 202, 255, 1)",
        pointBackgroundColor: "#FFFFFF",
        pointHoverBackgroundColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1.5
      }
    */]
  };

  useEffect(() => {
    const chartOptions = {
        legend: false,
        // Uncomment the next line in order to disable the animations.
        // animation: false,
        tooltips: {
          enabled: false,
          mode: "index",
          position: "nearest"
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: false
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                userCallback(label) {
                  return label > 999 ? `${(label / 1000).toFixed(0)}k` : label;
                }
              }
            }
          ]
        }
      };

    const SalesReportChart = new Chart(canvasRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions
    });

    // Generate the chart labels.
    legendRef.current.innerHTML = SalesReportChart.generateLegend();

    // Hide initially the first and last chart points.
    // They can still be triggered on hover.
    const meta = SalesReportChart.getDatasetMeta(0);
    meta.data[0]._model.radius = 0;
    meta.data[
      chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    SalesReportChart.render();

    setIsLoading(false);
  }, []);

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
        <div className="block-handle" />
      </CardHeader>

      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-light">
          {/* Time Interval */}
          <Col sm="6" className="col d-flex mb-2 mb-sm-0">
            <ButtonGroup>
              <Button theme="white" active>All</Button>
              <Button theme="white">Creatures</Button>
              <Button theme="white">Non-Creatures</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div ref={legendRef} />
        <canvas
          height="120"
          ref={canvasRef}
          style={{ maxWidth: "100% !important" }}
          className="sales-overview-sales-report"
        />
      </CardBody>
    </Card>
  );
}
