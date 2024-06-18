import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [productList, setProductList] = useState({})

    const [makePayment, setMakePayment] = useState();// variable para iniciar el pago y ver la validacion del documento
    const [shipmentData, setShipmentData] = useState(); //variable para poder activar el componenete datos de validación
    const [dataRecord, setDataRecord] = useState(); //variable para poder activar el componenete registro de datos 
    const [document, setDocument]= useState('') //para almacenar la cedula temporalmente
    const [filterProduct, setFilterProduct]= useState([]) //para almacenar los productos filtrados
    const [search, setSearch]= useState([]) //para almacenar los productos filtrados
    /* inicializacion del estado */
    const [allProducts, setAllProducts] = useState(() => {
        /* intenta recuperar los datos de localStorage, o retorna un array vacio si no hay datos */
        const storagedProducts = localStorage.getItem('allProducts');
        return storagedProducts ? JSON.parse(storagedProducts) : [];
    });
    const [total, setTotal] = useState(() => {
        /* intenta recuperar el total de localStorge, o retorna 0 si no hay datos */
        const storedTotal = localStorage.getItem('total');
        return storedTotal ? parseInt(storedTotal) : 0;
    });
    const [countProducts, setCountProducts] = useState(() => {
        /* intenta recuperar el conteo de productos delocalStorage, o retorna 0 si no hay datos */
        const storedCountProducts = localStorage.getItem('countProducts');
        return storedCountProducts ? parseInt(storedCountProducts) : 0;
    });

    /* efecto para actualizar localStorage cuando cambia los estados */
    useEffect(() => {
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
    }, [allProducts]);

    useEffect(() => {
        localStorage.setItem('total', total.toString());
    }, [total]);

    useEffect(() => {
        localStorage.setItem('countProducts', countProducts.toString());
    }, [countProducts]);
    return (
        <CartContext.Provider value={{
            allProducts,
            setAllProducts,
            total,
            setTotal,
            countProducts,
            setCountProducts,
            makePayment,
            setMakePayment,
            shipmentData,
            setShipmentData,
            dataRecord,
            setDataRecord,
            productList,
            setProductList,
            document,
            setDocument,
            filterProduct,
            setFilterProduct,
            search,
            setSearch
            }}>
            {children}
        </CartContext.Provider>
    )
}
