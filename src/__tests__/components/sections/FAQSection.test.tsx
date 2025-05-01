import React from 'react';
import { render, screen } from '@testing-library/react';
import { FAQSection } from '@/components/sections/faq/faq-section';

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

describe('FAQSection', () => {
  it('renders the section title and description', () => {
    render(<FAQSection />);

    // Check if the section title is rendered
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();

    // Check if the section description is rendered
    expect(
      screen.getByText('Find answers to common questions about our trading challenges and funded accounts')
    ).toBeInTheDocument();
  });

  it('renders FAQ cards with correct information', () => {
    render(<FAQSection />);

    // Check if the card titles are rendered
    expect(screen.getByText('Trading Rules')).toBeInTheDocument();
    expect(screen.getByText('Challenge Structure')).toBeInTheDocument();
    expect(screen.getByText('Account Protection')).toBeInTheDocument();
    expect(screen.getByText('Profit Sharing')).toBeInTheDocument();

    // Check if card descriptions are rendered
    expect(
      screen.getByText('Our trading rules are designed to be fair and transparent. We allow all trading styles including scalping, day trading, and swing trading. News trading is permitted with proper risk management.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Our two-phase evaluation process is designed to identify skilled traders. Pass both phases by meeting profit targets while adhering to risk management rules to receive a funded account.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('We prioritize account security with advanced encryption and multi-factor authentication. Your personal and financial information is always protected with industry-leading security measures.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enjoy up to 90% profit sharing with fast, hassle-free withdrawals. Profit splits are paid promptly with no hidden fees or complicated withdrawal processes.')
    ).toBeInTheDocument();
  });

  it('renders the support text', () => {
    render(<FAQSection />);

    // Check if the support text is rendered
    expect(screen.getByText('Need more help? Contact our support team')).toBeInTheDocument();
  });

  it('renders all required icons', () => {
    render(<FAQSection />);

    // Count the number of icons rendered
    const icons = document.querySelectorAll('svg');

    // We should have at least 4 card icons + 1 help icon = 5 icons
    expect(icons.length).toBeGreaterThanOrEqual(5);
  });

  it('has responsive design classes', () => {
    const { container } = render(<FAQSection />);

    // Check for responsive grid classes
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:grid-cols-4')).toBeInTheDocument();

    // Check for responsive text classes
    expect(container.querySelector('.text-3xl')).toBeInTheDocument();
    expect(container.querySelector('.md\\:text-4xl')).toBeInTheDocument();
  });

  it('has blue gradient text for headings', () => {
    const { container } = render(<FAQSection />);

    // Check for gradient text class on headings
    const headings = container.querySelectorAll('.gradient-text-deep-blue-aqua');
    expect(headings.length).toBeGreaterThanOrEqual(5); // Main heading + 4 card headings
  });
});
