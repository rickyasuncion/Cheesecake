import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails';

// Mock the global fetch function
global.fetch = jest.fn();

test('displays loading message while fetching data', () => {
  // Simulate an ongoing fetch request
  fetch.mockImplementation(() => new Promise(() => {}));

  render(
    <MemoryRouter initialEntries={['/movie/1']}>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
    </MemoryRouter>
  );

  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});

test('displays error message if fetching fails', async () => {
  // Simulate a failed fetch request
  fetch.mockImplementation(() => Promise.reject(new Error('Failed to fetch')));

  render(
    <MemoryRouter initialEntries={['/movie/1']}>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/error: an error occurred while fetching movie details./i)).toBeInTheDocument();
  });
});

test('displays movie details when fetch is successful', async () => {
  const mockMovie = {
    title: 'Inception',
    poster_path: '/poster.jpg',
    overview: 'A mind-bending thriller.',
    release_date: '2010-07-16',
    vote_average: 8.8,
    genres: [{ name: 'Action' }, { name: 'Sci-Fi' }]
  };

  // Simulate a successful fetch request
  fetch.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockMovie)
    })
  );

  render(
    <MemoryRouter initialEntries={['/movie/1']}>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/inception/i)).toBeInTheDocument();
    expect(screen.getByAltText(/inception/i)).toBeInTheDocument();
    expect(screen.getByText(/a mind-bending thriller./i)).toBeInTheDocument();
    expect(screen.getByText(/release date: 2010-07-16/i)).toBeInTheDocument();
    expect(screen.getByText(/rating: 8.8\/10/i)).toBeInTheDocument();
    expect(screen.getByText(/genres: action, sci-fi/i)).toBeInTheDocument();
  });
});
