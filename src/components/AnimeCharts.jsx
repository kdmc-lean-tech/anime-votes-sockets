import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const initialState = {
  options: {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: []
    }
  },
  series: [
    {
      name: 'Anime Charts',
      data: []
    }
  ]
};

export const AnimeCharts = ({ animes }) => {
  const [ state, setState ] = useState(initialState);

  const setAnimesInChart = (animes) => {
    const xaxis = [];
    const yaxis = [];
    animes?.forEach(anime => {
      xaxis.push(anime.name);
      yaxis.push(anime.votes);
    });
    const info = {
      options: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: xaxis
        }
      },
      series: [
        {
          name: 'Anime Charts',
          data: yaxis
        }
      ]
    };
    setState(info);
  }

  useEffect(() => {
    setAnimesInChart(animes);
  }, [animes]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={ state?.options }
            series={ state?.series }
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
