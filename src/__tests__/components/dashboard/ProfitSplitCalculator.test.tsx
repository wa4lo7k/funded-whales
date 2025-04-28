import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfitSplitCalculator } from '@/components/dashboard/profit-split-calculator';

// Mock the recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe('ProfitSplitCalculator', () => {
  it('renders the calculator with default values', () => {
    render(<ProfitSplitCalculator />);
    
    // Check if the component title is rendered
    expect(screen.getByText('Profit Split Calculator')).toBeInTheDocument();
    
    // Check if the default challenge type is selected
    expect(screen.getByText(/Whale Hunter/)).toBeInTheDocument();
    
    // Check if the account size input is rendered with default value
    const accountSizeInput = screen.getByLabelText('Account Size ($)') as HTMLInputElement;
    expect(accountSizeInput).toBeInTheDocument();
    expect(accountSizeInput.value).toBe('10000');
    
    // Check if the profit percentage input is rendered with default value
    const profitPercentageInput = screen.getByLabelText('Profit Percentage (%)') as HTMLInputElement;
    expect(profitPercentageInput).toBeInTheDocument();
    expect(profitPercentageInput.value).toBe('8');
    
    // Check if the chart is rendered
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });
  
  it('updates calculations when inputs change', async () => {
    render(<ProfitSplitCalculator />);
    
    // Get the input elements
    const accountSizeInput = screen.getByLabelText('Account Size ($)') as HTMLInputElement;
    const profitPercentageInput = screen.getByLabelText('Profit Percentage (%)') as HTMLInputElement;
    
    // Change account size to 20000
    fireEvent.change(accountSizeInput, { target: { value: '20000' } });
    
    // Change profit percentage to 10
    fireEvent.change(profitPercentageInput, { target: { value: '10' } });
    
    // Wait for the calculations to update
    await waitFor(() => {
      // Check if the total profit is updated (20000 * 10% = 2000)
      expect(screen.getByText('$2,000.00')).toBeInTheDocument();
      
      // Check if the trader's share is updated (2000 * 80% = 1600)
      expect(screen.getByText('$1,600.00')).toBeInTheDocument();
      
      // Check if the platform's share is updated (2000 - 1600 = 400)
      expect(screen.getByText('$400.00')).toBeInTheDocument();
    });
  });
  
  it('changes challenge type and updates account size and profit share', async () => {
    render(<ProfitSplitCalculator />);
    
    // Open the select dropdown
    const selectButton = screen.getByRole('combobox');
    fireEvent.click(selectButton);
    
    // Select "Deep Ocean" challenge type
    const deepOceanOption = screen.getByText(/Deep Ocean/);
    fireEvent.click(deepOceanOption);
    
    // Wait for the account size to update
    await waitFor(() => {
      const accountSizeInput = screen.getByLabelText('Account Size ($)') as HTMLInputElement;
      expect(accountSizeInput.value).toBe('25000');
      
      // Check if the profit share percentage is updated to 85%
      expect(screen.getByText(/Your Share \(85%\)/)).toBeInTheDocument();
    });
  });
  
  it('is responsive and accessible', () => {
    const { container } = render(<ProfitSplitCalculator />);
    
    // Check if the component has responsive classes
    expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
    
    // Check for accessibility attributes
    const inputs = screen.getAllByRole('spinbutton');
    inputs.forEach(input => {
      expect(input).toHaveAttribute('id');
      expect(document.querySelector(`label[for="${input.id}"]`)).toBeInTheDocument();
    });
  });
});
