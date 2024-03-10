import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Counter } from '../example-redux/counter/Counter';
import { Apis, Funcs, UI } from "../utils";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [listPost, setListPost] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    Funcs.fun_log('Hello log', 'HomePage.tsx', 11);
    Funcs.fun_get(`${Apis.API_HOST + Apis.API_TAILER.GET_POSTS}?keyWord=&cate=0&sort=0&start=false&heart=false&page=1&limit=10`)
      .then((dataRes) => {
        Funcs.fun_log(dataRes, 'HomePage.tsx', 14);
        if (!dataRes.success) {
          UI.toastError('Unable to load posts');
          return;
        }
        setListPost(dataRes.result);
        setTotal(dataRes.total || 0);
      });
  }, []);

  return (
    <div className='container'>
      <h1>Home Page | {t('hello')}</h1>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
      <hr />
      <Counter />
      <hr />

      <h3>Total Post: {total}</h3>
      {listPost.map((v, k) => {
        return (
          <div className='border p-1 m-2' key={k}>
            <ul>
              <li>{v.title}</li>
              <li>{v.description}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(HomePage);