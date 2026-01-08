import { FormEvent, MouseEvent, useCallback, useMemo, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Paths } from '../../const';
import { CITY_LIST_OPTIONS } from '../../const/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/reducers/city-slice';
import { getIsAuth } from '../../store/selectors/user-selectors';

export function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useAppSelector(getIsAuth);

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (emailRef.current && passwordRef.current) {
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value.trim();

        if (passwordValue.length > 0) {
          dispatch(
            loginAction({
              email: emailValue,
              password: passwordValue,
            })
          ).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              navigate(Paths.Main);
            }
          });
        }
      }
    },
    [dispatch, navigate]
  );

  const randomCity = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * CITY_LIST_OPTIONS.length);
    return CITY_LIST_OPTIONS[randomIndex];
  }, []);

  const handleCityClick = useCallback(
    (evt: MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(changeCity(randomCity));
      navigate(Paths.Main);
    },
    [dispatch, navigate, randomCity]
  );

  if (isAuth) {
    return <Navigate to={Paths.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={Paths.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={handleCityClick}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
