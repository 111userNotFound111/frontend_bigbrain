// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Signup from '../../pages/signUp';

// describe('Sign up test', () => {
//   test('sign up test', async () => {
//     render(
//       <MemoryRouter>
//         <Signup />
//       </MemoryRouter>
//     );
//     const name = screen.getByText('Name');
//     fireEvent.change(name, { target: { value: 'test123' } });
//     const email = screen.getByText('Email Address');
//     fireEvent.change(email, { target: { value: 'test123@email.com' } });
//     const password = screen.getByText('Password');
//     fireEvent.change(password, { target: { value: '123' } });
//     const SignupBtn = screen.getByText('Sign Up');
//     fireEvent.click(SignupBtn);
//   });
// })
