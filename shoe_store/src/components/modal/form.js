import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartAction';
import './form.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
      .max(20, 'Менше 20 символів я не вірю що твоє імя двадцять символів')
      .matches(/^[a-zA-Z, а-яА-ЯЄєїЇІіґҐ]+$/, 'First name can only contain letters')
      .required('First name is required'),
  lastName: Yup.string()
      .max(20, 'Менше 20 символів я не вірю що твоє прізвище двадцять символів')
      .matches(/^[a-zA-Z, а-яА-ЯЄєїЇІіґҐ]+$/, 'Last name can only contain letters')
      .required('Last name is required'),
  email: Yup.string()
      .email('перемога буде якщо ти введеш правильно пошту')
      .required('введи пошту чи ти можливо не сучасний')
      .matches(
          /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
          'Крапка де і два символа'
      ),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Номер телефону повинен починатися з +380 і містити 12 цифр')
    .required("Номер телефону є обов'язковим, щоб мати можливість вам позвонити"),
  address: Yup.string()
    .max(70, 'Максимальна довжина - 70 символів')
    .required("Адреса є обов'язковою! Щоб знати куди доставляти взуття"),
});


const ErrorText = ({ children }) => (
  <div className="error-message">{children}</div>
);

const StyledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <h2>Форма реєстрації</h2>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', phone: '', address: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {
          dispatch(clearCart());  
          navigate('/success'); 
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="firstName">Ім'я</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" component={ErrorText} />
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Прізвище</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" component={ErrorText} />
            </div>

            <div className="form-field">
              <label htmlFor="email">Електронна пошта</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component={ErrorText} />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Номер телефону</label>
              <Field name="phone" type="text" />
              <ErrorMessage name="phone" component={ErrorText} />
            </div>

            <div className="form-field">
              <label htmlFor="address">Адреса</label>
              <Field name="address" type="text" />
              <ErrorMessage name="address" component={ErrorText} />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              Підтвердити
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StyledForm;
