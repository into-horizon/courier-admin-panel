import React, { useState, useEffect } from 'react';


const Test = props => {
    // const [stores, setStore] = useState([])
    
    const getStoreProduct = store =>{
        getSellerProductsHandler(store)

    }
    const deleteSellerProducts = e => {
        deleteSellerProducts(e.id)

    }
    // useEffect(() =>{
    //      getSellerProductsHandler(stores[length-1])
    // }, [stores])
    return (
        <>
        </>
    )
}

