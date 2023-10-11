import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
describe("testing",()=>{
  it('renders learn react link', () => {
    render(<App title="ProjectList"/>);
    const linkElement = screen.getByText(/ProjectList/i);
    expect(linkElement).toBeInTheDocument();
  });
})

