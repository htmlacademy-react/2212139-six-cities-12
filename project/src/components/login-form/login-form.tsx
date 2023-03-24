import {useState, FormEvent, ChangeEvent, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { upperFirstLetter } from '../../utils';
import './login-form';


export default function LoginForm() {

  type FormData = {
  email: string;
  password: string;
};

  const LOGIN_FIELDS = ['email', 'password'];

  const validateForm = (formField: FormData): boolean => {
    const isEmailCorrect: boolean = (/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/).test(formField.email);
    const isPasswordCorrect: boolean = (/([0-9].*[a-z])|([a-z].*[0-9])/).test(formField.password);
    console.log(222);

    if (!isEmailCorrect) {
      showError('email');
      return false;
    }
    if (!isPasswordCorrect) {
      showError('password');
      return false;
    }

    return true;
  };

  function showError(field: string) {
    console.log(111);

    if(field === 'email') {
      emailRef.current?.classList.add('error__email');
      console.log(emailRef);

    } else {
      passwordRef.current?.classList.add('error__password');
    }
  }


  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const refArray = [emailRef, passwordRef];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
    console.log(value);
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
              ref={refArray[index]}
              className="login__input form__input"
              type={field}
              name={field}
              placeholder={upperFirstLetter(field)}
              onChange={handleInputChange}
              required
            />
            <span className="error hidden"></span>
          </div>
        ))}

        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}


