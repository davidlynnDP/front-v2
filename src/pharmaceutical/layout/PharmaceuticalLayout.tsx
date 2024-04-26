import { FC, ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context";

import styles from './PharmaceuticalLayout.module.css';


interface NavItem {
  path: string;
  text: string;
}

interface PharmaceuticalLayoutProps {
    children: ReactNode;
}

const navItems: NavItem[] = [
  { path: "/", text: "Home" },
  { path: "/products", text: "Products" },
  { path: "/suppliers", text: "Suppliers" },
  { path: "/clients", text: "Clients" },
  { path: "/sales", text: "Sales" },
];

export const PharmaceuticalLayout: FC<PharmaceuticalLayoutProps> = ({ children }) => {

  const navigate = useNavigate();
  const { logout, isLoading } = useContext( AuthContext );

  const handleLogout = () => {
    logout();
    navigate('/auth/sign-in');
  };

  return (
    <>
      <div className={ styles.pharma__container }>
        <nav className={ styles.pharma__nav }>
          <ul className={ styles.nav__ul }>
            {
              navItems.map(({ path, text }) => (
                <li key={ path } className={ styles.nav__ul__opt }>
                  <Link to={ path } className={ styles.nav__ul__link }>{ text }</Link>
                </li>
              ))
            }
            <li className={ styles.container__btn }>
              <button 
                onClick={ handleLogout }
                className={ styles.btn }
                disabled={ isLoading } >
                  Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className={ styles.pharma__content }>
        { children }
      </div>
    </>
  );
}
