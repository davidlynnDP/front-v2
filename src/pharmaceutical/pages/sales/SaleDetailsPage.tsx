import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Sale, SaleDetail } from "../../../domain/models";
import { PharmaceuticalLayout } from "../../layout"
import { InformationContext } from "../../../context";
import { useDetailsPage, useJsPDF } from "../../../hooks";

import styles from './SaleDetailsPage.module.css';


const SaleNotFound = () => {
  return <div className={ styles.not__found }>Sale not found!</div>;
};

export const SaleDetailsPage = () => {

  const { saleId } = useParams<{ saleId: string }>();
  const { sales } = useContext( InformationContext );
  const sale = useDetailsPage<Sale>({ objArr: sales, param: saleId });
  const { generatePDF, isGenerating } = useJsPDF( sale );

  const calculateTotalSingleSale = (saleDetails: SaleDetail[]): number => {
    let total = 0;
    saleDetails.forEach((detail) => {
      total += detail.total;
    });
    return total;
  };

  if ( !sale ) {
    return <SaleNotFound />;
  }

  return (
    <PharmaceuticalLayout>
      <div className={ styles.sale__details__container }>
        <h2 className={ styles.title__page }>Sale Details</h2>
        <div className={ styles.cont__det }>
          <strong className={ styles.det__sale }>Sale ID:</strong> { sale.id }
        </div>
        <div className={ styles.cont__det }>
          <strong className={ styles.det__sale }>Sale Date:</strong> { sale.saleDate }
        </div>
        <div className={ styles.cont__det }>
          <strong className={ styles.det__sale }>Client:</strong> { sale.client.name } ({ sale.client.email })
        </div>
        <h3 className={ styles.title__sale__det }>Products:</h3>
        {
          sale.saleDetails.map((detail) => (
            <div key={ detail.id } className={ styles.card }>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Product ID:</strong> { detail.product.id }
              </div>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Product Name:</strong> { detail.product.name }
              </div>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Description:</strong> { detail.product.description }
              </div>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Stocks:</strong> { detail.product.stocks }
              </div>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Price:</strong> ${ detail.product.price }
              </div>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Quantity:</strong> { detail.quantity }
              </div>
              <div className={ styles.cont__det__card }>
                <strong className={ styles.cont__det__info }>Total:</strong> ${ detail.total }
              </div>
            </div>
          ))
        }
        <div className={ styles.total__cont }>
          <h3 className={ styles.total__amount_title }>Total Sale Amount:</h3>
          <div className={ styles.total__amount_cont }>
            <strong className={ styles.total__amount }>Total: </strong>
            <p className={ styles.total__amount__p }>  ${ calculateTotalSingleSale( sale.saleDetails ) }</p>
          </div>
        </div>
        <div className={ styles.generate__container }>
          <button 
            onClick={ generatePDF } 
            className={ styles.btn__generate }
            disabled={ isGenerating }>
              {
                isGenerating ? 'Generating PDF...' : 'Export PDF'
              }
          </button>
        </div>
        <Link to="/sales" className={ styles.btn__back_sale }>
          Back to Sales
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

