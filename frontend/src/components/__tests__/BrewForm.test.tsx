import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
// We import the component even though it doesn't exist yet. 
// Your IDE will show a red squiggly line—this is normal in TDD!
import { BrewForm } from '../BrewForm';

describe('BrewForm Component', () => {
  const mockSubmit = vi.fn();

  it('renders all required fields', () => {
    render(<BrewForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/coffee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/roaster/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/grind size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/water/i)).toBeInTheDocument();
  });

  it('submits correctly with compulsory fields', async () => {
    render(<BrewForm onSubmit={mockSubmit} />);

    // Fill compulsory fields
    fireEvent.change(screen.getByLabelText(/coffee/i), { target: { value: 'Ethiopia' } });
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Home Roast' } });
    fireEvent.change(screen.getByLabelText(/grind size/i), { target: { value: '24 clicks' } });
    fireEvent.change(screen.getByLabelText(/dose/i), { target: { value: '18' } });
    fireEvent.change(screen.getByLabelText(/water/i), { target: { value: '300' } });

    fireEvent.click(screen.getByRole('button', { name: /save brew/i }));

    // Verify the data structure sent to the parent
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      coffee: 'Ethiopia',
      roaster: 'Home Roast',
      grindSize: '24 clicks',
      dose: 18,   // Should be a number
      water: 300  // Should be a number
    }));
  });

  it('includes optional fields in submission if provided', () => {
    render(<BrewForm onSubmit={mockSubmit} />);

    // Fill compulsory
    fireEvent.change(screen.getByLabelText(/coffee/i), { target: { value: 'Decaf' } });
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Local' } });
    fireEvent.change(screen.getByLabelText(/grind size/i), { target: { value: 'Fine' } });
    fireEvent.change(screen.getByLabelText(/dose/i), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText(/water/i), { target: { value: '250' } });
    
    // Fill optional
    fireEvent.change(screen.getByLabelText(/temp/i), { target: { value: '94' } });
    fireEvent.change(screen.getByPlaceholderText(/min/i), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText(/sec/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/notes/i), { target: { value: 'Blueberry and chocolate' } });

    fireEvent.click(screen.getByRole('button', { name: /save brew/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      coffee: 'Decaf',
      roaster: 'Local',
      grindSize: 'Fine',
      dose: 15,
      water: 250,
      temp: 94,
      minutes: 2,
      seconds: 30,
      notes: 'Blueberry and chocolate'
    });
  });
});

describe('BrewForm Component - Negative Cases', () => {
  const mockSubmit = vi.fn();

  it('prevents submission if a compulsory field (Coffee) is missing', () => {
    render(<BrewForm onSubmit={mockSubmit} />);

    // Fill out everything EXCEPT coffee
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Onyx' } });
    fireEvent.change(screen.getByLabelText(/dose/i), { target: { value: '18' } });
    fireEvent.change(screen.getByLabelText(/water/i), { target: { value: '300' } });

    fireEvent.click(screen.getByRole('button', { name: /save brew/i }));

    // The spy should NOT have been called
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('does not submit if numeric fields contain non-numeric strings', () => {
    render(<BrewForm onSubmit={mockSubmit} />);

    // Fill out compulsory fields, but put "abc" in the Dose
    fireEvent.change(screen.getByLabelText(/coffee/i), { target: { value: 'Ethiopia' } });
    fireEvent.change(screen.getByLabelText(/dose/i), { target: { value: 'abc' } });

    fireEvent.click(screen.getByRole('button', { name: /save brew/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});