import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { useColorMode } from '@chakra-ui/react';
import theme from '../../theme';
import { Stock } from '../../api/stock/data-types';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

interface ScoreRadarProps {
  score: Stock['score'];
}

const getChartColorByTotalScore = (totalScore: number) => {
  const COLORS = {
    green: theme.colors.green['500'],
    yellow: theme.colors.yellow['500'],
    orange: theme.colors.orange['500'],
    red: theme.colors.red['500'],
  };
  if (totalScore < 10) {
    return COLORS['red'];
  }
  if (totalScore < 13) {
    return COLORS['orange'];
  }
  if (totalScore < 16) {
    return COLORS['yellow'];
  }
  return COLORS['green'];
};

const getDataSetByScore = (score: ScoreRadarProps['score']) => {
  const { value, health, future, past, income, total } = score['data'];
  const chartColor = getChartColorByTotalScore(total);

  return {
    labels: ['value', 'health', 'future', 'past', 'income'],
    datasets: [
      {
        data: [value, health, future, past, income],
        fill: true,
        backgroundColor: `${chartColor}99`,
        borderColor: chartColor,
        pointLabelFontColor: 'red',
      },
    ],
  };
};

const genOptions = (currentTheme: string) => {
  const rColor =
    currentTheme === 'light'
      ? theme.colors.blackAlpha['400']
      : theme.colors.whiteAlpha['700'];

  return {
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    events: [],
    plugins: {
      legend: {
        display: false,
      },
      tooltip: { enabled: false },
      hover: { mode: null },
    },
    scales: {
      r: {
        min: 0,
        max: 7,
        ticks: {
          display: false,
        },
        grid: {
          color: rColor,
        },
        angleLines: {
          color: rColor,
        },
        pointLabels: {
          color: rColor,
          font: {
            size: 14,
          },
        },
      },
    },
  };
};

const ScoreRadarChart: React.FunctionComponent<ScoreRadarProps> = ({
  score,
}) => {
  const { colorMode } = useColorMode();
  const options = genOptions(colorMode);
  const dataset = getDataSetByScore(score);
  return (
    <div style={{ height: 200 }}>
      <Radar data={dataset} options={options} updateMode="resize" />
    </div>
  );
};

export default ScoreRadarChart;
