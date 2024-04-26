import { useEffect, useState } from "react";
import { Client, Product, Sale, Supplier } from "../domain/models";

type DetailType = Supplier | Sale | Product | Client;

interface DetailsPageOptions<T> {
    objArr: T[];
    param: string | undefined;
}

export const useDetailsPage = <T extends DetailType>({ objArr, param }: DetailsPageOptions<T>): T | undefined => {

    const [ data, setData ] = useState<T | undefined>(undefined);
  
    useEffect(() => {
      if ( !param ) {
        setData( undefined );
        return;
      }

      const obj = objArr.find( obj => obj.id === param );
      if ( obj ) {
        setData( obj );
      } else {
        setData( undefined );
      }
    }, [ param, objArr ]);

    return data;
}

