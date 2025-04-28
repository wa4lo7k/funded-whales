import React from 'react';
import { render, screen } from '@testing-library/react';
import { WhyFundedWhales } from '@/components/sections/why-funded-whales';

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

describe('WhyFundedWhales', () => {
  it('renders the section title and description', () => {
    render(<WhyFundedWhales />);

    // Check if the section title is rendered
    expect(screen.getByText('Why Funded Whales?')).toBeInTheDocument();

    // Check if the section description is rendered
    expect(
      screen.getByText('Join the elite community of funded traders and experience the advantages that set us apart in the industry.')
    ).toBeInTheDocument();
  });

  it('renders benefit cards with correct information', () => {
    render(<WhyFundedWhales />);

    // Check if the first 4 benefit titles are rendered
    expect(screen.getByText('No Reward Denial')).toBeInTheDocument();
    expect(screen.getByText('Your Favorite Platform')).toBeInTheDocument();
    expect(screen.getByText('No Hidden Rules')).toBeInTheDocument();
    expect(screen.getByText('Smooth Withdrawals')).toBeInTheDocument();

    // Check if benefit descriptions are rendered
    expect(
      screen.getByText('Trade with full confidence. We ensure that every earned reward is rightfully and promptly given without unnecessary hurdles.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Stay where you trade best. Funded Whales supports MetaTrader 5, cTrader, and Match-Trader for seamless performance.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Transparency at its core. What you see is what you get — no secret clauses, no unfair conditions.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your profits, your pocket. Fast and hassle-free withdrawals so you can enjoy your success without waiting.')
    ).toBeInTheDocument();
  });

  it('renders the statistics section', () => {
    render(<WhyFundedWhales />);

    // Check if the trusted badge is rendered
    expect(screen.getByText('Trusted by professional traders worldwide')).toBeInTheDocument();

    // Check if statistics are rendered
    expect(screen.getByText('$25M+')).toBeInTheDocument();
    expect(screen.getByText('Trading Capital')).toBeInTheDocument();
    expect(screen.getByText('$2.5M+')).toBeInTheDocument();
    expect(screen.getByText('Profit Paid')).toBeInTheDocument();
    expect(screen.getByText('5,000+')).toBeInTheDocument();
    expect(screen.getByText('Funded Traders')).toBeInTheDocument();
  });

  it('renders all required icons', () => {
    render(<WhyFundedWhales />);

    // Count the number of icons rendered
    const icons = document.querySelectorAll('svg');

    // We should have at least 4 benefit icons + 3 statistics icons + 1 badge icon = 8 icons
    expect(icons.length).toBeGreaterThanOrEqual(8);
  });

  it('has responsive design classes', () => {
    const { container } = render(<WhyFundedWhales />);

    // Check for responsive grid classes
    expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:grid-cols-2')).toBeInTheDocument();

    // Check for responsive text classes
    expect(container.querySelector('.text-3xl')).toBeInTheDocument();
    expect(container.querySelector('.md\\:text-4xl')).toBeInTheDocument();
  });
});
