import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../app-store/hooks";
import { userLogin, userLogout, selectSessionUser } from "../app-reducers/SessionUserReducer";
import LoadingComponent from '../components/common/LoadingComponent';
import { UI } from '../utils';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const sessionUser = useAppSelector(selectSessionUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(userLogin({
        id: 1, userName: 'Evan Joy', fullName: 'Ngo Hong Phuc',
      }));
      UI.toastSuccess('Login success');
    }, 2000);
  }

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(userLogout());
      UI.toastInfo('Logout success');
    }, 2000);
  }

  return (
    <div className='container'>
      <LoadingComponent isLoading={isLoading} />
      <h1>Login Page | {t('hello')}</h1>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
      </ul>
      <hr />

      <h3>User Login Status</h3>
      {sessionUser.id ?
        <ul>
          <li>id: {sessionUser.id}</li>
          <li>userName: {sessionUser.userName}</li>
          <li>fullName: {sessionUser.fullName}</li>
          <li>task:
            <button
              onClick={() => handleLogout()}
            >Logout Now</button>
          </li>
        </ul> :
        <div>
          User Not Login -
          <button
            onClick={() => handleLogin()}
          >Login Now</button>
        </div>
      }
    </div>
  );
};

export default LoginPage;