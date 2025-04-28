import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/layout/navbar';
import { useAuth } from '@/contexts/auth-context';

// Mock the auth context
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || ''} />;
  },
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock the useAuth hook to return a default value
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    });
  });

  it('renders the navbar with logo and navigation links', () => {
    render(<Navbar />);

    // Check if the logo is rendered
    expect(screen.getByAltText('Funded Whales Logo')).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Why Us')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders login and signup buttons when user is not logged in', () => {
    render(<Navbar />);

    // Check if login and signup buttons are rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders user menu button when user is logged in', () => {
    // Mock the useAuth hook to return a logged-in user
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER',
      },
      logout: jest.fn(),
    });

    render(<Navbar />);

    // Check if the user menu button is rendered with correct initials
    const userMenuButton = screen.getByRole('button', { name: /TU/i });
    expect(userMenuButton).toBeInTheDocument();

    // We're not testing the dropdown content as it's rendered in a portal
    // which is not easily accessible in the test environment
  });

  it('renders admin user menu button', () => {
    // Mock the useAuth hook to return an admin user
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'ADMIN',
      },
      logout: jest.fn(),
    });

    render(<Navbar />);

    // Check if the user menu button is rendered with correct initials
    const userMenuButton = screen.getByRole('button', { name: /AU/i });
    expect(userMenuButton).toBeInTheDocument();

    // We're not testing the dropdown content as it's rendered in a portal
    // which is not easily accessible in the test environment
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Navbar />);

    // Check if the mobile menu button is rendered
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeInTheDocument();

    // Open the mobile menu
    fireEvent.click(menuButton);

    // Check if the close menu button is rendered
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    // Check if the mobile menu links are rendered
    const mobileLinks = screen.getAllByText('Home');
    expect(mobileLinks.length).toBeGreaterThan(1);

    // Close the mobile menu
    fireEvent.click(screen.getByLabelText('Close menu'));

    // Check if the open menu button is rendered again
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('applies scrolled styles when window is scrolled', () => {
    render(<Navbar />);

    // Check if the navbar has the default styles
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('glass');

    // Simulate window scroll
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 20,
    });

    // Trigger the scroll event
    fireEvent.scroll(window);

    // Check if the navbar has the scrolled styles
    expect(header).toHaveClass('glass');
  });
});
