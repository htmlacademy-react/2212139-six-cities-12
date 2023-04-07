import clsx from 'clsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/user-process/api-actions';
import styles from './login-form.module.css';
import { getIsLoading } from '../../store/user-process/selectors';

const LOGIN_FIELDS: Record<string, string> = {
  email: 'E-mail',
  password: 'Password',
};

type Field = {
  value: string;
  error: boolean;
  regExp: RegExp;
  errorMessage: string;
  touched: boolean;
};

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);

  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      regExp: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
      errorMessage: 'Incorrect Email address',
      touched: false,
    },
    password: {
      value: '',
      error: false,
      regExp: /([0-9].*[a-z])|([a-z].*[0-9])/,
      errorMessage: 'At least one letter and one number',
      touched: false,
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const isValid = formData[name].regExp.test(value);
    setFormData({
      ...formData,
      [name]: { ...formData[name], error: isValid, touched: true, value },
    });
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      loginAction({
        login: formData.email.value,
        password: formData.password.value,
      })
    );
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>

      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={handleFormSubmit}
      >
        {Object.entries(LOGIN_FIELDS).map(([name, label]) => (
          <div key={name} className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">{label}</label>
            <input
              className={clsx('login__input form__input', {
                [styles.errorLogin]:
                  !formData[name].error && formData[name].touched,
              })}
              type={name}
              name={name}
              placeholder={label}
              onChange={handleInputChange}
              required
            />
            {!formData[name].error && formData[name].touched && (
              <span className={styles.error}>
                {formData[name].errorMessage}
              </span>
            )}
          </div>
        ))}

        <button
          className={clsx('login__submit form__submit button', {
            [styles.button__loading]: isLoading,
          })}
          type="submit"
          disabled={!formData.email.error && !formData.password.error}
        >
          <span className="button__text">Sign in</span>
        </button>
      </form>
    </section>
  );
}
