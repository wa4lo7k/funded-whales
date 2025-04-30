import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EnhancedPricingCards } from '@/components/pricing/enhanced-pricing-cards';

// Mock the CSS module
jest.mock('@/components/pricing/enhanced-pricing-cards.module.css', () => ({
  sizeSelector: 'mock-sizeSelector',
  sizeButton: 'mock-sizeButton',
  sizeButtonActive: 'mock-sizeButtonActive',
  sizeButtonInactive: 'mock-sizeButtonInactive',
  cardGrid: 'mock-cardGrid',
  card: 'mock-card',
  cardPopular: 'mock-cardPopular',
  popularBadge: 'mock-popularBadge',
  cardHeader: 'mock-cardHeader',
  cardContent: 'mock-cardContent',
  priceContainer: 'mock-priceContainer',
  price: 'mock-price',
  currentPrice: 'mock-currentPrice',
  originalPrice: 'mock-originalPrice',
  discount: 'mock-discount',
  pricingNote: 'mock-pricingNote',
  detailsGrid: 'mock-detailsGrid',
  detailBox: 'mock-detailBox',
  detailLabel: 'mock-detailLabel',
  detailValue: 'mock-detailValue',
  featuresList: 'mock-featuresList',
  featureItem: 'mock-featureItem',
  featureIcon: 'mock-featureIcon',
  buttonContainer: 'mock-buttonContainer',
  button: 'mock-button',
  buttonPrimary: 'mock-buttonPrimary',
  buttonOutline: 'mock-buttonOutline',
}));

describe('EnhancedPricingCards', () => {
  it('renders the component with default selected size', () => {
    render(<EnhancedPricingCards />);

    // Check if the heading is rendered
    expect(screen.getByText('Choose Your Challenge')).toBeInTheDocument();

    // Check if all account size buttons are rendered
    expect(screen.getAllByText('$5,000')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$10,000')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$50,000')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$100,000')[0]).toBeInTheDocument();

    // Check if all three plan types are rendered
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Practitioner')).toBeInTheDocument();
    expect(screen.getByText('Master')).toBeInTheDocument();
  });

  it('changes the displayed challenges when a different account size is selected', () => {
    render(<EnhancedPricingCards />);

    // Click on a different account size
    fireEvent.click(screen.getByText('$25,000'));

    // Check if all three plan types are still rendered
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Practitioner')).toBeInTheDocument();
    expect(screen.getByText('Master')).toBeInTheDocument();

    // Check if the details are updated
    expect(screen.getAllByText('$25,000').length).toBeGreaterThan(1); // Account size appears multiple times
    expect(screen.getAllByText('80%').length).toBeGreaterThan(0); // Payout ratio
  });

  it('displays the "MOST POPULAR" badge on popular challenges', () => {
    render(<EnhancedPricingCards />);

    // The default selected size is $10,000 which has a popular challenge
    // Check if the MOST POPULAR badge is displayed
    expect(screen.getAllByText('MOST POPULAR').length).toBeGreaterThan(0);
  });

  it('shows different prices for different variations of the same challenge', () => {
    render(<EnhancedPricingCards />);

    // The standard, express, and evaluation variations should have different prices
    const priceElements = screen.getAllByText(/\$\d+/);
    const prices = priceElements.map(el => el.textContent);

    // Check that we have different prices (not all the same)
    const uniquePrices = new Set(prices);
    expect(uniquePrices.size).toBeGreaterThan(1);
  });
});
