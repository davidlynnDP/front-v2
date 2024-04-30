import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { AuthLayout } from "../layout"
import { AuthContext } from "../../context";

import styles from './RegisterPage.module.css';


export const RegisterPage = () => {

  const { signUp, isLoading } = useContext( AuthContext );
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async( values ) => {
      await signUp({ email: values.email, password: values.password, username: values.username });
      navigate('/');
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username es requerido'),
      email: Yup.string()
        .email('El correo no tiene un formato válido')
        .required('Email es requerido'),
      password: Yup.string()
        .required('Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirma tu contraseña'),
    })
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };
  
  return (
    <AuthLayout>
      <div className={ styles.register__container }>
        <h2 className={ styles.title__page }>Registro</h2>
        <form onSubmit={ handleSubmit } className={ styles.form }>
          <div className={ styles.container__input }>
            <label htmlFor="username" className={ styles.input__name }>Username:</label>
            <input 
              type="text" 
              id="username" 
              className={ styles.input__text } 
              {...getFieldProps('username')} 
            />
            { touched.username && errors.username ? <div className={ styles.input__error }>{ errors.username }</div> : null }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="email" className={ styles.input__name }>Email:</label>
            <input 
              type="email" 
              id="email"  
              className={ styles.input__text }
              {...getFieldProps('email')} 
            />
            { touched.email && errors.email ? <div className={ styles.input__error }>{ errors.email }</div> : null }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="password" className={ styles.input__name }>Password:</label>
            <input 
              type={ showPassword ? "text" : "password" } 
              id="password" 
              className={ styles.input__text }
              {...getFieldProps('password')} 
            />
            <button
              type="button"
              className={ styles.toggle__password__visibility }
              onClick={ togglePasswordVisibility }
            >
              { showPassword ? <FaEyeSlash /> : <FaEye /> }
            </button>
            { touched.password && errors.password ? <div className={ styles.input__error }>{ errors.password }</div> : null }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="confirmPassword" className={ styles.input__name }>Confirmar Password:</label>
            <input 
              type={ showPassword ? "text" : "password" } 
              id="confirmPassword"
              className={ styles.input__text } 
              {...getFieldProps('confirmPassword')}
            />
            <button
              type="button"
              className={ styles.toggle__password__visibility }
              onClick={ togglePasswordVisibility }
            >
              { showPassword ? <FaEyeSlash /> : <FaEye /> }
            </button>
            { touched.confirmPassword && errors.confirmPassword ? <div className={ styles.input__error }>{ errors.confirmPassword }</div> : null }
          </div>
          <div className={ styles.btn__container }>
            <button 
              type="submit" 
              className={ styles.btn }
              disabled={ isLoading } >
              Registrarse
            </button>
            <button 
              className={ styles.btn }
              type="button" 
              onClick={() => resetForm()} 
              disabled={ isLoading } >
                Limpiar
            </button>
          </div>
        </form>
        
        <div className={ styles.link__container }>
          <p className={ styles.paragraph__text }>¿Ya tienes una cuenta? 
            <Link to="/auth/login" className={ styles.paragraph__text__link }>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

