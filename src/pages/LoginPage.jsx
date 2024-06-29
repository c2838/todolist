import { useState } from 'react';
import { login } from 'api/auth';
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    if (!(username.length && password.length)) {
      return
    }
    const { sucess, authToken } = await login({ username, password })
    if (sucess) {
      localStorage.setItem('authToken', authToken)
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
        position: 'top'
      })
      return
    }
    Swal.fire({
      title: '登入失敗',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false,
      position: 'top',
    });
  }
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label={'帳號'}
          placeholder={'請輸入帳號'}
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'密碼'}
          placeholder={'請輸入密碼'}
          value={password}
          type={'password'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
