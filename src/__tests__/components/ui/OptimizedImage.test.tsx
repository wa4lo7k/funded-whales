import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Simulate the image load or error based on the src
    setTimeout(() => {
      if (props.src === 'error.jpg') {
        if (props.onError) props.onError();
      } else {
        if (props.onLoad) props.onLoad();
      }
    }, 0);
    
    return <img {...props} data-testid="next-image" />;
  },
}));

describe('OptimizedImage', () => {
  it('renders the image with correct props', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test Image"
        width={300}
        height={200}
        priority={true}
      />
    );
    
    // Check if the next/image component is rendered with correct props
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
    expect(image).toHaveAttribute('width', '300');
    expect(image).toHaveAttribute('height', '200');
    expect(image).toHaveAttribute('priority', 'true');
  });
  
  it('shows loading indicator while image is loading', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test Image"
        width={300}
        height={200}
      />
    );
    
    // Check if the loading indicator is rendered
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  
  it('shows the image after it has loaded', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test Image"
        width={300}
        height={200}
      />
    );
    
    // Wait for the image to load
    await screen.findByTestId('next-image');
    
    // Check if the loading indicator is no longer visible
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    
    // Check if the image has the loaded class
    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('opacity-100');
    expect(image).not.toHaveClass('opacity-0');
  });
  
  it('shows fallback when image fails to load', async () => {
    render(
      <OptimizedImage
        src="error.jpg"
        alt="Error Image"
        width={300}
        height={200}
      />
    );
    
    // Wait for the error to be triggered
    await screen.findByText('Error Image');
    
    // Check if the fallback is rendered
    expect(screen.getByText('Error Image')).toBeInTheDocument();
    
    // Check if the next/image component is not rendered
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
  });
  
  it('applies fill prop correctly', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test Image"
        width={300}
        height={200}
        fill={true}
      />
    );
    
    // Check if the next/image component has the fill attribute
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('fill', 'true');
    expect(image).not.toHaveAttribute('width');
    expect(image).not.toHaveAttribute('height');
  });
  
  it('applies custom className', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test Image"
        width={300}
        height={200}
        className="custom-class"
      />
    );
    
    // Check if the container has the custom class
    const container = screen.getByTestId('next-image').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
