import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChallengeCard, ChallengeFeature } from '@/components/ui/challenge-card';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

describe('ChallengeCard', () => {
  // Sample challenge features
  const features: ChallengeFeature[] = [
    { name: 'Unlimited trading time', included: true },
    { name: 'One-time fee', included: true },
    { name: 'Forex & Indices', included: true },
    { name: 'Weekend holding allowed', included: true },
    { name: 'Priority support', included: false },
  ];
  
  // Default props
  const defaultProps = {
    type: 'whale-hunter' as const,
    name: 'Whale Hunter',
    description: 'Entry level challenge for new traders',
    originalPrice: 149,
    discountedPrice: 99,
    accountSize: '$10,000',
    profitTarget: '8%',
    maxDrawdown: '5%',
    profitShare: '80%',
    features,
  };
  
  it('renders the challenge card with correct information', () => {
    render(<ChallengeCard {...defaultProps} />);
    
    // Check if the challenge name and description are rendered
    expect(screen.getByText('Whale Hunter')).toBeInTheDocument();
    expect(screen.getByText('Entry level challenge for new traders')).toBeInTheDocument();
    
    // Check if the price information is rendered
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    expect(screen.getByText('Save 34%')).toBeInTheDocument();
    
    // Check if the challenge details are rendered
    expect(screen.getByText('Account Size')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
    expect(screen.getByText('Profit Share')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('Profit Target')).toBeInTheDocument();
    expect(screen.getByText('8%')).toBeInTheDocument();
    expect(screen.getByText('Max Drawdown')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    
    // Check if the features are rendered
    expect(screen.getByText('Challenge Features')).toBeInTheDocument();
    expect(screen.getByText('Unlimited trading time')).toBeInTheDocument();
    expect(screen.getByText('Priority support')).toBeInTheDocument();
    
    // Check if the button is rendered
    expect(screen.getByText('Start Challenge')).toBeInTheDocument();
  });
  
  it('displays the popular badge when popular prop is true', () => {
    render(<ChallengeCard {...defaultProps} popular={true} />);
    
    // Check if the popular badge is rendered
    expect(screen.getByText('MOST POPULAR')).toBeInTheDocument();
  });
  
  it('does not display the popular badge when popular prop is false', () => {
    render(<ChallengeCard {...defaultProps} popular={false} />);
    
    // Check if the popular badge is not rendered
    expect(screen.queryByText('MOST POPULAR')).not.toBeInTheDocument();
  });
  
  it('renders different challenge types with correct styling', () => {
    const { rerender } = render(<ChallengeCard {...defaultProps} />);
    
    // Check if the whale hunter icon is rendered
    expect(document.querySelector('svg')).toBeInTheDocument();
    
    // Rerender with deep ocean type
    rerender(
      <ChallengeCard
        {...defaultProps}
        type="deep-ocean"
        name="Deep Ocean"
        description="Intermediate challenge for experienced traders"
      />
    );
    
    // Check if the deep ocean name is rendered
    expect(screen.getByText('Deep Ocean')).toBeInTheDocument();
    expect(screen.getByText('Intermediate challenge for experienced traders')).toBeInTheDocument();
    
    // Rerender with blue whale type
    rerender(
      <ChallengeCard
        {...defaultProps}
        type="blue-whale"
        name="Blue Whale"
        description="Advanced challenge for professional traders"
      />
    );
    
    // Check if the blue whale name is rendered
    expect(screen.getByText('Blue Whale')).toBeInTheDocument();
    expect(screen.getByText('Advanced challenge for professional traders')).toBeInTheDocument();
  });
  
  it('renders features with correct icons based on included status', () => {
    render(<ChallengeCard {...defaultProps} />);
    
    // Get all check icons (for included features)
    const checkIcons = document.querySelectorAll('.text-green-500');
    expect(checkIcons.length).toBe(4); // 4 included features
    
    // Get all X icons (for not included features)
    const xIcons = document.querySelectorAll('.text-red-500');
    expect(xIcons.length).toBe(1); // 1 not included feature
  });
  
  it('applies custom className when provided', () => {
    render(<ChallengeCard {...defaultProps} className="custom-class" />);
    
    // Check if the custom class is applied
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });
});
