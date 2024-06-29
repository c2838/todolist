import { useState } from 'react';
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { register } from 'api/auth';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!(username.length && email.length && password.length)) {
      return;
    }

    const { sucess, authToken } = await register({ username, email, password });
    if (sucess) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
        position: 'top',
      });
      navigate('/login')
      return;
    }
    Swal.fire({
      title: '註冊失敗',
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
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label={'帳號'}
          placeholder={'請設定帳號'}
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'Email'}
          placeholder={'請設定Email'}
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'密碼'}
          placeholder={'請設定密碼'}
          type={'password'}
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
