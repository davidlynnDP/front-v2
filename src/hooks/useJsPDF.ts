import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable'

import { Sale, SaleDetail } from '../domain/models';


export const useJsPDF = (sale: Sale | undefined) => {

    const [ isGenerating, setIsGenerating ] = useState(false);

    const calculateTotalSingleSale = (saleDetails: SaleDetail[]): number => {
      let total = 0;
      saleDetails.forEach((detail) => {
        total += detail.total;
      });
      return total;
    };

    const generatePDF = () => {
      if (!sale) return;
    
      setIsGenerating(true);
    
      const doc = new jsPDF();
      let yPos = 10;
    
      // Configurar estilos de texto y colores
      doc.setTextColor(0, 0, 0); // Color negro
    
      // Establecer estilos de texto para el encabezado
      doc.setFontSize(18);
      doc.text("Detalles de la Venta", 10, yPos);
    
      // Establecer estilos de texto para los datos de la venta
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50); // Color gris oscuro
    
      // Agregar detalles de la venta
      doc.setFontSize(12);
      doc.text(`ID de Venta: ${sale.id}`, 10, yPos += 20);
      doc.text(`Fecha de Venta: ${sale.saleDate}`, 10, yPos += 10);
      doc.text(`Cliente: ${sale.client.name}`, 10, yPos += 10);
      doc.text(`Email: ${sale.client.email}`, 10, yPos += 10);
      doc.text(`Teléfono: ${sale.client.phone}`, 10, yPos += 10);
    
      yPos += 20; // Espacio adicional antes de la tabla
    
      // Configurar estilos de la tabla
      const tableStyles: UserOptions = {
        theme: "grid",
        styles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0]
        },
        headStyles: {
          fillColor: [200, 200, 200]
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      };

      const headers = ["Product Name", "Description", "Price", "Quantity", "Total"];
      const data = sale.saleDetails.map(detail => [
          detail.product.name,
          detail.product.description,
          `$${detail.product.price}`,
          detail.quantity.toString(),
          `$${detail.total}`
      ]);
    
      // Generar la tabla con los estilos configurados
      autoTable(doc, {
        startY: yPos,
        head: [headers],
        body: data,
        ...tableStyles
      });
    
      const finalY = yPos + (sale.saleDetails.length + 1) * 15; // Ajusta el espaciado de acuerdo al tamaño de fuente y contenido
    
      // Agregar total de la venta
      doc.setFontSize(14);
      doc.text(`Total de la Venta: $${calculateTotalSingleSale(sale.saleDetails)}`, 10, finalY);
    
      // Guardar y finalizar
      doc.save(`sale_${ sale.id }.pdf`);
      setIsGenerating(false);
    };
    
  
  return { 
    generatePDF, 
    isGenerating 
  };

}