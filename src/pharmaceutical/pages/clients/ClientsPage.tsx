import { useContext } from "react";
import { Link } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { InformationContext } from "../../../context";

import styles from './ClientsPage.module.css';


export const ClientsPage = () => {

  const { clients } = useContext( InformationContext );

  return (
    <PharmaceuticalLayout>
        <div className={ styles.clients__container }>
          <h2 className={ styles.title__page }>Clients Page</h2>
          <div className={ styles.cards__container }>
            <div className={ styles.container__link }>
                <Link to="/clients/new" className={ styles.btn__new }>
                  Create New Client
                </Link>
            </div>
            <div className={ styles.cards__client }>
              {
                clients.map(({ id, name, phone, email, registrationDate }, index) => (
                  <div key={`${ id }-${ index }`} className={ styles.card }>
                    <h3 className={ styles.name__client }>{ name }</h3>
                    <p className={ styles.id__client }>ID: { id }</p>
                    <p className={ styles.phone__client }>Phone: { phone }</p>
                    <p className={ styles.email__client }>Email: { email }</p>
                    <p className={ styles.date__client }>Registration Date: { registrationDate }</p>
                    <Link to={`/clients/${ id }`} className={ styles.btn__edit }>
                      Edit Client
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
      </div>
    </PharmaceuticalLayout>
  )
}

