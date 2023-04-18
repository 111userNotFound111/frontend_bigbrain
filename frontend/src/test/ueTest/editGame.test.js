import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditGame from '../../pages/editGame';

describe('edit game page test', () => {
  test('edit game test', () => {
    render(
      <MemoryRouter>
        <EditGame />
      </MemoryRouter>
    );
    expect(screen.getByText('Edit Game')).toBeInTheDocument();
    expect(screen.getByText('Game ID')).toBeInTheDocument();
  });
})
