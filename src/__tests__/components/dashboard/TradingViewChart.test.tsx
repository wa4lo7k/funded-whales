import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TradingViewChart } from '@/components/dashboard/tradingview-chart';

// Mock the TradingView widget
global.TradingView = {
  widget: jest.fn(),
  MediumWidget: jest.fn(),
};

describe('TradingViewChart', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock createElement and appendChild
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'script') {
        const scriptElement = originalCreateElement(tagName);
        // Mock the script's onload to be called immediately
        setTimeout(() => {
          if (scriptElement.onload) {
            scriptElement.onload();
          }
        }, 0);
        return scriptElement;
      }
      return originalCreateElement(tagName);
    });
    
    jest.spyOn(document.head, 'appendChild').mockImplementation(() => document.head);
  });
  
  afterEach(() => {
    // Restore mocks
    jest.restoreAllMocks();
  });
  
  it('renders the chart component with default props', () => {
    render(<TradingViewChart />);
    
    // Check if the component title is rendered
    expect(screen.getByText('TradingView Chart')).toBeInTheDocument();
    expect(screen.getByText('Real-time market analysis')).toBeInTheDocument();
    
    // Check if the tabs are rendered
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('Simple')).toBeInTheDocument();
    
    // Check if the symbol selector is rendered
    expect(screen.getByText('EUR/USD')).toBeInTheDocument();
    
    // Check if the interval selector is rendered
    expect(screen.getByText('1d')).toBeInTheDocument();
    
    // Check if the fullscreen button is rendered
    expect(screen.getByRole('button', { name: /fullscreen/i })).toBeInTheDocument();
    
    // Check if the TradingView widget was initialized
    expect(global.TradingView.widget).toHaveBeenCalled();
  });
  
  it('switches between advanced and simple chart types', () => {
    render(<TradingViewChart />);
    
    // Initially, the advanced chart should be selected
    expect(global.TradingView.widget).toHaveBeenCalled();
    expect(global.TradingView.MediumWidget).not.toHaveBeenCalled();
    
    // Click on the Simple tab
    fireEvent.click(screen.getByText('Simple'));
    
    // Now the medium widget should be called
    expect(global.TradingView.MediumWidget).toHaveBeenCalled();
  });
  
  it('changes symbol when a new one is selected', () => {
    render(<TradingViewChart />);
    
    // Open the symbol dropdown
    fireEvent.click(screen.getByText('EUR/USD'));
    
    // Select a different symbol
    fireEvent.click(screen.getByText('GBP/USD'));
    
    // The widget should be reinitialized with the new symbol
    expect(global.TradingView.widget).toHaveBeenCalledTimes(2);
    expect(global.TradingView.widget.mock.calls[1][0]).toHaveProperty('symbol', 'GBPUSD');
  });
  
  it('changes interval when a new one is selected', () => {
    render(<TradingViewChart />);
    
    // Open the interval dropdown
    fireEvent.click(screen.getByText('1d'));
    
    // Select a different interval
    fireEvent.click(screen.getByText('1h'));
    
    // The widget should be reinitialized with the new interval
    expect(global.TradingView.widget).toHaveBeenCalledTimes(2);
    expect(global.TradingView.widget.mock.calls[1][0]).toHaveProperty('interval', '60');
  });
  
  it('toggles fullscreen mode when the fullscreen button is clicked', () => {
    render(<TradingViewChart />);
    
    // Initially, the chart should not be in fullscreen mode
    expect(screen.queryByText('fullscreen')).not.toBeInTheDocument();
    
    // Click the fullscreen button
    fireEvent.click(screen.getByRole('button', { name: /fullscreen/i }));
    
    // The chart should now be in fullscreen mode
    expect(screen.getByTestId('tradingview_widget_container').parentElement).toHaveClass('fixed');
    
    // Click the minimize button
    fireEvent.click(screen.getByRole('button', { name: /fullscreen/i }));
    
    // The chart should no longer be in fullscreen mode
    expect(screen.getByTestId('tradingview_widget_container').parentElement).not.toHaveClass('fixed');
  });
  
  it('accepts custom props for symbol, interval, and height', () => {
    render(<TradingViewChart symbol="BTCUSD" interval="60" height={400} />);
    
    // The widget should be initialized with the custom props
    expect(global.TradingView.widget).toHaveBeenCalledWith(
      expect.objectContaining({
        symbol: 'BTCUSD',
        interval: '60',
        height: 400,
      })
    );
    
    // The container should have the custom height
    expect(screen.getByTestId('tradingview_widget_container').style.height).toBe('400px');
  });
});
