// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  redirect: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { ...props, alt: props.alt || '' });
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MockDiv(props: any) { return React.createElement('div', props); },
    span: function MockSpan(props: any) { return React.createElement('span', props); },
    button: function MockButton(props: any) { return React.createElement('button', props); },
    a: function MockA(props: any) { return React.createElement('a', props); },
    ul: function MockUl(props: any) { return React.createElement('ul', props); },
    li: function MockLi(props: any) { return React.createElement('li', props); },
    p: function MockP(props: any) { return React.createElement('p', props); },
    h1: function MockH1(props: any) { return React.createElement('h1', props); },
    h2: function MockH2(props: any) { return React.createElement('h2', props); },
    h3: function MockH3(props: any) { return React.createElement('h3', props); },
    h4: function MockH4(props: any) { return React.createElement('h4', props); },
    h5: function MockH5(props: any) { return React.createElement('h5', props); },
    h6: function MockH6(props: any) { return React.createElement('h6', props); },
    svg: function MockSvg(props: any) { return React.createElement('svg', props); },
    path: function MockPath(props: any) { return React.createElement('path', props); },
  },
  AnimatePresence: function MockAnimatePresence({ children }: { children: React.ReactNode }) {
    return React.createElement(React.Fragment, null, children);
  },
  useAnimation: () => ({ start: jest.fn() }),
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { onChange: jest.fn(), get: () => 0 } }),
}));

// Mock recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: function MockResponsiveContainer({ children }: { children: React.ReactNode }) {
    return React.createElement('div', null, children);
  },
  LineChart: function MockLineChart({ children }: { children: React.ReactNode }) {
    return React.createElement('div', null, children);
  },
  Line: function MockLine() { return React.createElement('div'); },
  XAxis: function MockXAxis() { return React.createElement('div'); },
  YAxis: function MockYAxis() { return React.createElement('div'); },
  CartesianGrid: function MockCartesianGrid() { return React.createElement('div'); },
  Tooltip: function MockTooltip() { return React.createElement('div'); },
  Legend: function MockLegend() { return React.createElement('div'); },
  AreaChart: function MockAreaChart({ children }: { children: React.ReactNode }) {
    return React.createElement('div', null, children);
  },
  Area: function MockArea() { return React.createElement('div'); },
  BarChart: function MockBarChart({ children }: { children: React.ReactNode }) {
    return React.createElement('div', null, children);
  },
  Bar: function MockBar() { return React.createElement('div'); },
  Cell: function MockCell() { return React.createElement('div'); },
  PieChart: function MockPieChart({ children }: { children: React.ReactNode }) {
    return React.createElement('div', null, children);
  },
  Pie: function MockPie() { return React.createElement('div'); },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});
