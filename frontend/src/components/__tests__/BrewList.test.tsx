import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrewList } from '../BrewList';
import type { SavedBrew } from '../../types/brew';

describe('BrewList Component', () => {
  const mockBrews: SavedBrew[] = [
    {
      id: '1',
      coffee: 'Ethiopia Yirgacheffe',
      roaster: 'Onyx',
      grindSize: 'Medium',
      dose: 18,
      water: 300,
      temp: 94,
      minutes: 2,
      seconds: 30,
      notes: 'Floral and bright',
      createdAt: 1740498820000,
    },
    {
      id: '2',
      coffee: 'Decaf Colombia',
      roaster: 'Local',
      grindSize: 'Fine',
      dose: 15,
      water: 250,
      // Temp, time, and notes are missing here
      createdAt: 1740499180000,
    },
  ];

  it('renders a list of brews', () => {
    render(<BrewList brews={mockBrews} />);
    
    expect(screen.getByText(/Ethiopia Yirgacheffe by Onyx/i)).toBeInTheDocument();
    expect(screen.getByText(/Decaf Colombia by Local/i)).toBeInTheDocument();
  });

  it('calculates and displays dose and water correctly', () => {
    render(<BrewList brews={mockBrews} />);
    
    expect(screen.getByText(/Dose: 18g, Water: 300g/i)).toBeInTheDocument();
  });

  it('renders optional fields when provided', () => {
    render(<BrewList brews={mockBrews} />);
    
    expect(screen.getByText(/Temp: 94°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Time: 2m 30s/i)).toBeInTheDocument();
    expect(screen.getByText(/Notes: Floral and bright/i)).toBeInTheDocument();
  });

  it('does not render labels for missing optional fields', () => {
    render(<BrewList brews={mockBrews} />);
    
    // Check the second brew which has no temp
    const tempLabels = screen.queryAllByText(/Temp:/i);
    expect(tempLabels).toHaveLength(1); // Only the first brew has it
  });

  it('shows a friendly message when the list is empty', () => {
    render(<BrewList brews={[]}/>);
    
    expect(screen.getByText(/No brews recorded yet/i)).toBeInTheDocument();
  });
});