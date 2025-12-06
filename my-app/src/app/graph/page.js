'use client';

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function GraphPage() {
  const [chartData, setChartData] = useState(null);

  // Load graph data
  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/salesgraph");
      const result = await response.json();

      const dates = Object.keys(result.data);
      const totals = Object.values(result.data);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Total Orders per Day",
            data: totals,
            borderColor: "purple",
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            borderWidth: 2,
          },
        ],
      });
    }

    loadData();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper style={{ marginTop: 30, padding: 20 }}>
        <Typography variant="h4" align="center" style={{ marginBottom: 20 }}>
          Sales Graph
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => (window.location.href = "/manager")}
          style={{ marginBottom: 20 }}
        >
          Back to Manager Dashboard
        </Button>

        {!chartData ? (
          <p>Loading graph...</p>
        ) : (
          <Line data={chartData} />
        )}
      </Paper>
    </Container>
  );
}
