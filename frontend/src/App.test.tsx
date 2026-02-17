import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// basic test for setup
describe('App Component', () => {
  it('should render the Bloom Scale title', () => {
    render(<App />);
    const title = screen.getByText(/bloom/i);
    expect(title).toBeInTheDocument();
  });
});