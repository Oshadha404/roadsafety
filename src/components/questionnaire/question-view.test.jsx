import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './question-view';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '?zone=zone01' }),
}));

describe('Quiz trivia popup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              question: 'Question 1',
              answers: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
              correct_answer: 'A',
            },
            {
              question: 'Question 2',
              answers: { A: 'Option 1', B: 'Option 2', C: 'Option 3', D: 'Option 4' },
              correct_answer: 'B',
            },
          ]),
      })
    );
  });

  test('shows a trivia popup between questions and lets the user skip it', async () => {
    render(<Quiz />);

    expect(await screen.findByText('Question 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Option A/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    expect(await screen.findByText(/Did You Know/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Skip/i }));

    await waitFor(() => {
      expect(screen.getByText('Question 2')).toBeInTheDocument();
    });
  });
});
