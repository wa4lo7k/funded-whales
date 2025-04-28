import React from 'react';
import { render, screen } from '@testing-library/react';
import { HftNeoPricingCard } from '@/components/pricing/hft-neo-card';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('HftNeoPricingCard', () => {
  it('renders the component with correct content', () => {
    render(<HftNeoPricingCard />);
    
    // Check if the title is rendered
    expect(screen.getByText('HFT NEO')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('For elite traders seeking maximum performance')).toBeInTheDocument();
    
    // Check if the badge is rendered
    expect(screen.getByText('Limited Time Offer')).toBeInTheDocument();
    
    // Check if the price information is rendered
    expect(screen.getByText('$23')).toBeInTheDocument(); // Original price
    expect(screen.getByText('$15')).toBeInTheDocument(); // Discounted price
    expect(screen.getByText('30% OFF')).toBeInTheDocument(); // Discount percentage
    expect(screen.getByText('Save $8')).toBeInTheDocument(); // Savings amount
    
    // Check if all metrics are rendered
    expect(screen.getByText('Profit Target')).toBeInTheDocument();
    expect(screen.getByText('8%')).toBeInTheDocument();
    expect(screen.getByText('Daily Drawdown')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('Max Drawdown')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('Profit Split')).toBeInTheDocument();
    expect(screen.getByText('Up to 90%')).toBeInTheDocument();
    expect(screen.getByText('Min Trading Days')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Leverage')).toBeInTheDocument();
    expect(screen.getByText('1:100')).toBeInTheDocument();
    
    // Check if the button is rendered
    expect(screen.getByText('Get Started →')).toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    const { container } = render(<HftNeoPricingCard className="custom-class" />);
    
    // Check if the custom class is applied to the root element
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
