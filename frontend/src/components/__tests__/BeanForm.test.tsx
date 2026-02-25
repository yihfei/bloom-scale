import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BeanForm } from '../BeanForm';
import type { BeanData } from '../../types/bean';

describe('BeanForm Component', () => {
  const mockSubmit = vi.fn();

  it('renders all required fields', () => {
    render(<BeanForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/roaster/i)).toBeInTheDocument();
  });

  it('submits correctly with compulsory fields', async () => {
    render(<BeanForm onSubmit={mockSubmit} />);

    // Fill compulsory fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ethiopia' } });
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Home Roast' } });

    fireEvent.click(screen.getByRole('button', { name: /save bean/i }));

    const expectedPayload: BeanData = {
      name: 'Ethiopia',
      roaster: 'Home Roast',
      origin: undefined,
      variety: undefined,
      process: undefined,
      price: undefined,
      tastingNotes: undefined
    };

    expect(mockSubmit).toHaveBeenCalledWith(expectedPayload);
  });

    it('includes optional fields in submission if provided', () => {
    render(<BeanForm onSubmit={mockSubmit} />);

    // Fill compulsory
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ethiopia' } });
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Home Roast' } });
    
    // Fill optional
    fireEvent.change(screen.getByLabelText(/origin/i), { target: { value: 'Sidamo' } });
    fireEvent.change(screen.getByLabelText(/variety/i), { target: { value: 'Heirloom' } });
    fireEvent.change(screen.getByLabelText(/process/i), { target: { value: 'Washed' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '15.5' } });
    fireEvent.change(screen.getByLabelText(/notes/i), { target: { value: 'Fruity and floral' } });

    fireEvent.click(screen.getByRole('button', { name: /save bean/i }));

    const expectedPayload: BeanData = {
      name: 'Ethiopia',
      roaster: 'Home Roast',
      origin: 'Sidamo',
      variety: 'Heirloom',
      process: 'Washed',
      price: 15.5,
      tastingNotes: 'Fruity and floral'
    };
    expect(mockSubmit).toHaveBeenCalledWith(expectedPayload);
    });  
});

describe('BeanForm Component - Negative Cases', () => {
  const mockSubmit = vi.fn();

  it('does not submit if required fields are missing', () => {
    render(<BeanForm onSubmit={mockSubmit} />);

    // Fill out everything except name
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Home Roast' } });
    fireEvent.click(screen.getByRole('button', { name: /save bean/i }));
    expect(mockSubmit).not.toHaveBeenCalled();

    // Fill out everything except roaster
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ethiopia' } });
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /save bean/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('handles non-numeric input gracefully', () => {
    render(<BeanForm onSubmit={mockSubmit} />);

    // Fill compulsory fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ethiopia' } });
    fireEvent.change(screen.getByLabelText(/roaster/i), { target: { value: 'Home Roast' } });
    
    // Fill price with invalid value
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /save bean/i }));
    
    // The form should still submit, but price should be undefined due to NaN conversion
    const expectedPayload: BeanData = {
      name: 'Ethiopia',
      roaster: 'Home Roast',
      origin: undefined,
      variety: undefined,
      process: undefined,
      price: undefined, // invalid number should result in undefined
      tastingNotes: undefined
    };
    expect(mockSubmit).toHaveBeenCalledWith(expectedPayload);
  });
});

