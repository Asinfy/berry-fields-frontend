export const discountCoupon = (allProducts, data_discount, total)  => {
    let total_discount = 0;
    console.log(allProducts);

    allProducts.forEach(product => {         
    
        let costo_discount = Math.round(product.price / product.amount - Math.round( (product.price / product.amount) * (data_discount[0].Porcentaje / 100) ));
        let price_discount = (costo_discount * product.amount);
        total_discount += price_discount * product.quantity; 
        console.log("Total discount uno por uno: " + total_discount);
        console.log("costo: " + costo_discount);
        console.log("price_discount: " + price_discount);
    });
    
    console.log(data_discount);
    console.log("Total: " + total);
    console.log("Total discount: " + total_discount)
    console.log( `Descuento: ${total - total_discount}` );
    return total_discount !== 0 ? total_discount : 0;

}