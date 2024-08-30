export const discountEmployee = (allProducts, inventory, total, discount)  => {
    //Descuento del producto por su costo
    let total_discount = 0;

      allProducts.forEach(product => {
        //Para los productos compuestos 
        if (product.CompositeProduct === "true") {
            product.productPlan.map(p => {
              let product_inventory = inventory.filter( product_inventory => product_inventory.Productos.ID === p.Productos.ID);
              let costo_discount = 0;

              if (product_inventory.length > 0 ) {
               
                let aprox = parseInt(product_inventory[0].Costo) * 0.10;
                costo_discount = aprox < 1 ? parseInt(product_inventory[0].Costo) + 1 : parseInt(product_inventory[0].Costo) + Math.round(aprox); 
                let price_discount = parseInt(costo_discount * parseInt(p.Cantidad));

                console.log( "Precio con descuento:" + price_discount);
                total_discount += price_discount * product.quantity; 
              }
              
              console.log(p);
              console.log(product_inventory);
              console.log(product);
            });

            console.log(total_discount);
        }else{
        //Para los productos no compuestos

          //Traer el producto del invetario
          let product_inventory = inventory.filter( product_inventory => product_inventory.Productos.ID === product.idProduct);
          console.log(product_inventory);
          if (product_inventory.length > 0 ) {
            
            let costo_discount = 0;
            //Si el costo del producto en el inventario es 0, se aplica el descuento pero al precio normal
            if (product_inventory[0].Costo !== 0 && product_inventory[0].Costo !== null) {
              let aprox = parseInt(product_inventory[0].Costo) * 0.10;
              costo_discount = aprox < 1 ? parseInt(product_inventory[0].Costo) + 1 : parseInt(product_inventory[0].Costo) + Math.round(aprox); 
              console.log("entra1");
            }else{
              costo_discount = parseInt(product.price / product.amount - Math.round( (product.price / product.amount) * (discount[0].Porcentaje / 100) ));
              console.log("entra2");
            }
          
            let price_discount = parseInt(costo_discount * (product.quantity * product.amount));
            total_discount += price_discount; 
            console.log(costo_discount);
          }
  
        }
      });

    

    console.log(parseInt((total_discount) * 100) / total);
    return total_discount !== 0 ? ((total - total_discount) * 100) / total : 0;
}