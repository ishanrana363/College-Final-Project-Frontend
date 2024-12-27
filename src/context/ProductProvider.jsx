


import React, { createContext, useState } from 'react'

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [searchTearm, setSearchTerm] = useState("")

    return (
        <>
            <ProductContext.Provider value={{ searchTearm, setSearchTerm }}>
                {children}
            </ProductContext.Provider>

        </>
    )
}

export default ProductProvider
