import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App';
import userEvent from '@testing-library/user-event';
test('has correctly rendered major elements', () => {
    render(<App />)
    const searchBar = screen.getAllByPlaceholderText(/Search all the GIFs.../i);
    expect(searchBar[0]).toBeInTheDocument();
    const pagination = screen.getByText(/previous/i);
    expect(pagination).toBeInTheDocument();
  })