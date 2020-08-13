import React, { useState, useEffect, createRef, useRef } from "react";
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

export default function HistogramCard({props, hists, title}) {
  const [isLoading, setIsLoading] = useState(true);
  const [buttonVal, setButtonVal] = useState(Object.keys(hists)[0]);
  const legendRef = useRef();
  const canvasRef = useRef();

  const bgColor = ["rgba(153, 202, 255, 1)", "rgba(72, 160, 255, 1)", "rgba(0, 123, 255, 1)"]
  const boColor = ["rgba(153, 202, 255, 1)", "rgba(72, 160, 255, 1)", "rgba(0, 123, 255, 1)"]


  useEffect(() => {
    const labels = Object.keys(hists[Object.keys(hists)[0]]).slice(1);
    const datasets = [
      {
        label: buttonVal,
        fill: "start",
        data: Object.values(hists[buttonVal]).slice(1),
        backgroundColor: bgColor.pop(),
        borderColor: boColor.pop(),
        pointBackgroundColor: "#FFFFFF",
        pointHoverBackgroundColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1.5
      }];

    const chartData = {
      labels: labels,
      datasets: datasets
    };

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
  }, [buttonVal]);

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
        <div className="block-handle" />
      </CardHeader>

      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-light">
          <Col sm="6" className="col d-flex mb-2 mb-sm-0">
            <ButtonGroup value={buttonVal} onClick={e => setButtonVal(e.target.value)}>
              {Object.keys(hists).map((key) => (
                <Button type="radio" theme="white" value={key}>{key}</Button>
              ))}
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
