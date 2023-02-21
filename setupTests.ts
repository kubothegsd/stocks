import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';

// No need to render chart to test
jest.mock('react-chartjs-2', () => ({
  Radar: () => null,
}));
