import {useState, FormEvent, ChangeEvent, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { upperFirstLetter } from '../../utils';
import './login-form.css';


export default function LoginForm() {

  type FormData = {
  email: string;
  password: string;
};

  const LOGIN_FIELDS = ['email', 'password'];

  const validateForm = (formField: FormData): boolean => {
    const isEmailCorrect: boolean = (/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/).test(formField.email);
    const isPasswordCorrect: boolean = (/([0-9].*[a-z])|([a-z].*[0-9])/).test(formField.password);

    showError(isEmailCorrect, isPasswordCorrect);

    if (!isEmailCorrect) {
      return false;
    }
    if (!isPasswordCorrect) {
      return false;
    }
    return true;
  };

  function showError(isEmail: boolean, isPassword: boolean) {
    if(!isEmail) {
      emailRef.current?.classList.add('error__email');
      emailSpanRef.current?.classList.remove('span__hidden');
    } else {
      emailRef.current?.classList.remove('error__email');
      emailSpanRef.current?.classList.add('span__hidden');
    }
    if(!isPassword) {
      passwordRef.current?.classList.add('error__password');
      passwordSpanRef.current?.classList.remove('span__hidden');
    } else {
      passwordRef.current?.classList.remove('error__password');
      passwordSpanRef.current?.classList.add('span__hidden');
    }
  }

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const refInputs = [emailRef, passwordRef];
  const emailSpanRef = useRef<HTMLInputElement | null>(null);
  const passwordSpanRef = useRef<HTMLInputElement | null>(null);
  const refSpans = [emailSpanRef, passwordSpanRef];
  const spanTexts = [
    'Incorrect Email address',
    'At least one letter and one number',
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (validateForm(formData)) {
      dispatch(loginAction({
        login: formData.email,
        password: formData.password
      }));

      setFormData({
        email: '',
        password: ''
      });

      navigate(AppRoute.Root);
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>

      <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
        {LOGIN_FIELDS.map((field, index) => (
          <div key={field} className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">{upperFirstLetter(field)}</label>
            <input
              ref={refInputs[index]}
              className="login__input form__input"
              type='text' //{field}
              name={field}
              placeholder={upperFirstLetter(field)}
              onChange={handleInputChange}
              required
            />
            <span
              className="span__error span__hidden"
              ref={refSpans[index]}
            >
              {`${spanTexts[index]}`}
            </span>
          </div>
        ))}

        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}


