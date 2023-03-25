import clsx from 'clsx';
import {useState, ChangeEvent, FormEvent} from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import './login-form.css';

const LOGIN_FIELDS: Record<string, string> = {
  email: 'E-mail',
  password: 'Password'
};

type Field = {
  value: string;
  error: boolean;
  regExp: RegExp;
  errorMessage: string;
};

export default function LoginForm(): JSX.Element {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      regExp: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
      errorMessage: 'Incorrect Email address',
    },
    password: {
      value: '',
      error: false,
      regExp: /([0-9].*[a-z])|([a-z].*[0-9])/,
      errorMessage:  'At least one letter and one number'
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    const isCorrectField = (formData[name].regExp).test(value);
    setFormData({...formData, [name]: {...formData[name], error: isCorrectField, value }});
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formData.email.error && formData.password.error) {
      dispatch(loginAction({
        login: formData.email.value,
        password: formData.password.value
      }));
    }
  };


  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>

      <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
        {Object.entries(LOGIN_FIELDS).map(([name, label]) => (
          <div key={name} className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">{label}</label>
            <input
              className={clsx( 'login__input form__input', {
                'error-login': !formData[name].error
              })}
              type={name}
              name={name}
              placeholder={label}
              onChange={handleInputChange}
              required
            />
            {!formData[name].error && (
              <span className="error">
                {formData[name].errorMessage}
              </span>)}
          </div>
        ))}

        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}


