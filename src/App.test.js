import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const data = [
    { song_id: 1, title: 'Era Uma Vez', artist: 'Kell Smith', genre: 'MPB' },
    { song_id: 2, title: 'Lua Cheia', artist: 'Armandinho', genre: 'Reggae' },
    { song_id: 3, title: 'Who Cares', artist: 'Paul McCartney', genre: 'Rock' },
];

export const server = setupServer(
    rest.get(`$BACKEND_URL`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
    }),
);

describe('App', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => render(<App />));
  afterEach(() => server.resetHandlers());

  test('should render first song', async () => {
    await waitFor(() => expect(screen.getByText('Era Uma Vez')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Kell Smith')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('MPB')).toBeInTheDocument());
  });

  test('should render second song', async () => {
    await waitFor(() => expect(screen.getByText('Lua Cheia')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Armandinho')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Reggae')).toBeInTheDocument());
  });

  test('should render third song', async () => {
    await waitFor(() => expect(screen.getByText('Who Cares')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('3')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Paul McCartney')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Rock')).toBeInTheDocument());
  });
});
