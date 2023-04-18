import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginComponent from '../../routes/login/index.jsx';

describe('Test Login Logic', () => {
  test('renders the component', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginComponent />
      </MemoryRouter>
    );
    // 模拟用户输入用户名和密码
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // 模拟用户点击登录按钮
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    // 等待异步请求返回并验证登录是否成功
    const successMessage = await screen.findByText('login success');
    expect(successMessage).toBeInTheDocument();
  });
})
