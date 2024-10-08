import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./UserAccount.css";
import axios from "axios";

export const UserAccount = () => {
  const [responseData, setResponseData] = useState([]);
  //se cargan la variables globales para controlar los productos
  const {
    allProducts,
    shipmentData,
    total,
    setAllProducts,
    setTotal,
    discount,
    discountDefault,
    setCountProducts,
    inventory,
    setInventory,
    totalDiscount
  } = useContext(CartContext);
  const [departmentList, setDepartmentList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [error, setError] = useState(null);
  //variables que se utiliza para manejar los datos que modifica el usuario 
  const [formData, setFormData] = useState({
    Deapartamento: "",
    Codigo_Deapartamento: "",
    Codigo_Municipio: "",
    Municipio: "",
    Direccion: "",
  })


  useEffect(() => {
    //se hace el llamado ala api para extraer solo los departamentos y si codigo
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          "https://zoho.accsolutions.tech/API/v1/Municipio1"
        );
        const modifiedDepartment = response.data.data.reduce((acc, city) => {
          const found = acc.find(item => item.Codigo_Deapartamento === city.Codigo_Deapartamento);
          if (!found) {
            acc.push({ Codigo_Deapartamento: city.Codigo_Deapartamento, Departamento: city.Departamento })
          }
          return acc;
        }, []);
        setDepartmentList(modifiedDepartment);
      } catch (error) {
        setError("Error al obtener los municipios");
        console.error("Error al obtener los municipios", error);
      }
    };

  
    const fetchInventory = async() => {
      try { 
        const response = await axios.get("https://zoho.accsolutions.tech/API/v1/Inventario_berry");
        const {data} = await response.data;
        setInventory(data);
      } catch (error) {
        console.log(`Error al traer los productos del inventario - error ${error.message }`);
      }
    }
    fetchInventory();


    fetchDepartment();
  
  }, []);

  useEffect(() => {
    //se cargan los datos iniciales que el usuario tiene registrado en la base de datos para en caso de que el usuario no 
    //modifique  direccion de envio 
    if (shipmentData && shipmentData.user) {
      setFormData({
        Deapartamento: shipmentData.user.Departamento1.Departamento,
        Municipio: shipmentData.user.Municipio.Municipio,
        Direccion: shipmentData.user.Direccion,
      });
    }
  }, [shipmentData]);

  //se llama nuevamente la api pero solo para traer los datos de municipio pero segun el departamento que seleciono el usuario 
  const fetchCities = async (codigoDepartamento) => {
    try {
      const response = await axios.get(
        `https://zoho.accsolutions.tech/API/v1/Municipio1?where=Codigo_Deapartamento=="${codigoDepartamento}"`
      );
      const modifiedCity = response.data.data.reduce((acc, city) => {
        const found = acc.find(item => item.Codigo_Municipio === city.Codigo_Municipio);
        if (!found) {
          acc.push({ Codigo_Municipio: city.Codigo_Municipio, Municipio: city.Municipio });
        }
        return acc;
      }, []);
      setCityList(modifiedCity);
    } catch (error) {
      setError("Error al obtener los municipios");
      console.error("Error al obtener los municipios", error);
    }
  };

  //se en carga de llamar dos funciones una para traer los municipios segun seleccione el 
  //departamento y luego para controlar al agrgara datos el formulario
  const handleCombinedChange = (event) => {
    const input = event.target;
    handleChange(event);
    if (input.name === "Codigo_Deapartamento") {
      fetchCities(input.value);
    }
    console.log(input.value)
  };

  //se encarga de agregar datos por dato al formData
  const handleChange = (event) => {
    const input = event.target;
    const { name, value } = input;

    //se busca el nombre del departamento para poderlo almacenar 
    let departmentName = "";
    if (name === "Codigo_Deapartamento") {
      const department = departmentList.find(department => department.Codigo_Deapartamento === value);
      departmentName = department ? department.Departamento : "";
    }
    //se busca el nombre del municipo para poderlo almacenar 
    let cityName = "";
    if (name === "Codigo_Municipio") {
      const city = cityList.find(city => city.Codigo_Municipio === value);
      cityName = city ? city.Municipio : "";
    }
    console.log(cityName)

    //almacenamos los datos del usuario en un objeto 
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...(name === "Codigo_Municipio" && { Municipio: cityName }),
      ...(name === "Codigo_Deapartamento" && { Deapartamento: departmentName }),
      ...(name === "Direccion" && { [name]: value })
    }));
    console.log(formData)
  };
  let DATA = [];

  //fecha con la zona horaria de colombia
  const fechaActual = () => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      /* hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', */
      timeZone: 'America/Bogota'
    };

    const currentDateWithTimezone = new Date().toLocaleDateString('es-ES', options);
    // Formatear la fecha en el orden año-mes-día
    const [day, month, year] = currentDateWithTimezone.split('/');
    return `${year}-${month}-${day}`;
  }
  //enviamos los datos a la api del back para generar la orden y de una vez a wonpi
  const funcionPost = async (total) => {
    let Numero_ID = Math.random() * 10;
    const newTotal = discount.length > 0 ? (total - (discount[0].Porcentaje / 100) * total) : discountDefault.length > 0 ? Math.round(total - (discountDefault[0].Porcentaje / 100) * total) : total;

    const total1 = {
      amount: newTotal,
      ID: Numero_ID,
      Fecha: fechaActual(),
      E_Cormers: "bfs",
    };

    try {
      // hacemos la peticion para que nos devuelva los datos para despues hacer la peticion a wonpi
      const URL_API = "https://berry-connect.accsolutions.tech/api/Signature";
      const response = await axios.post(URL_API, total1, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      DATA = response.data;
      setResponseData(DATA);
      const products = allProducts.reduce((acc, product) => {
        const found = acc.find(item => item.id === product.id);
        if (!found) {
      
          const product_inventory = inventory.filter(productInv => productInv.Productos.ID === product.idProduct);
          console.log(product_inventory);
          let price_desc_default =  0;
          let price_product = 0;
         
          if (discountDefault.length > 0 && product_inventory.length > 0) {
            let aprox = parseInt(product_inventory[0].Costo) * 0.10;
            console.log(aprox);
            price_desc_default = aprox < 1 ? parseInt(product_inventory[0].Costo) + 1 : parseInt(product_inventory[0].Costo) + Math.round(aprox);
            console.log(price_desc_default);
            price_product = parseInt(price_desc_default * product.amount);
          }

          let price_total_mix = 0;

          acc.push({
            id: product.id, //producto  general 
           
            name: product.name,

            gramos: product.CompositeProduct === "true" ?
              product.productPlan.map(p => {
                const product_inventory = inventory.filter(productInv => productInv.Productos.ID ===  p.Productos.ID);
                let aprox = parseInt(product_inventory[0].Costo) * 0.10;
       
                price_desc_default = aprox < 1 ? parseInt(product_inventory[0].Costo) + 1 : parseInt(product_inventory[0].Costo) + Math.round(aprox);
                price_total_mix += price_desc_default * parseInt(p.Cantidad);
                return {
                  price_product: discountDefault.length > 0 ?  price_desc_default
                                :  parseInt(product.price) / product.productPlan.length / parseInt(p.Cantidad),
                  Gramos: product.quantity * p.Cantidad,
                  Total: discountDefault.length > 0 ? (price_desc_default * parseInt(p.Cantidad)) * product.quantity 
                              : (product.quantity * parseInt(product.price) )/ product.productPlan.length,
                  ID_Product: p.Productos.ID

                }
              })
              :
              [{

                price_product: discount.length > 0 ? product.price / product.amount  //Descento cupon
                              //Descuento por defecto
                              : discountDefault.length > 0 ? price_desc_default 
                              //Normal
                              : product.price / product.amount,
                              
                Gramos: product.quantity * product.amount,

                Total: discount.length > 0 ? product.quantity * parseInt(product.price) //Descento cupon
                      //Descuento por defecto
                      : discountDefault.length > 0 ? product.quantity * price_product
                      //Normal
                      : product.quantity * parseInt(product.price),

                ID_Product: product.idProduct //producto del producto berry
              }],
              quantity: product.quantity,
              price: discount.length > 0 ? product.price 
              : discountDefault.length > 0 && product.CompositeProduct === "true" ? price_total_mix
              : discountDefault.length > 0 ? price_product 
              : product.price,
              
          })
          
        }
        console.log(acc)
        console.log(product.productPlan.length)
        return acc
      }, [])

      DATA.forEach((datos) => {
        const mapSend = {
          Referencia: datos.reference,
          Productos: products,
          Fecha: fechaActual(),
          Total: newTotal,
          ID1: shipmentData.user.ID,
          Direccion: `${formData.Direccion}, ${formData.Municipio}, ${formData.Deapartamento}`,
          Descripcion: "Berry Fields",
          Estado: "PENDING",
          Clientes: shipmentData.user.ID,
          Cupon: discount.length > 0 ? discount[0].Codigo_Descuento : "No uso cupon",
        };
        console.log(mapSend);

        try {
          // hacemos la peticion para validar si la orden esta generada
          const URL_BERRY = 'https://zoho.accsolutions.tech/API/v1/verificar_pedido';
          axios.post(URL_BERRY, mapSend, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.data) {
              document.getElementById("formWompi").submit();
            }
          });
        } catch (error) {
          console.error('Error al verificar pedido:', error);
        } 
      });

      //en caso de que el cupon sea de un solo uso desactivarlo cunado lo use

      
      // Deshabilitar btn de pagar
      document.getElementById("btnPedir").disabled = true;
      
      // Borrar datos almacenados de la paquina
      emptyCart();
      if (discount[0].Un_solo_uso === "Si") {
        const URL_API = `https://zoho.accsolutions.tech/API/v1/All_Descuentos_Berries/${discount[0].ID}`;
        const response = await axios.patch(URL_API, { "Estado": "Inactivo" })
      } 
    } catch (error) {
      console.error("Error al hacer la petición:", error);
    }
  };
  // Borrar datos almacenados de la paquina
  const emptyCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };
  return (
    <div className="user-account-form-container">
      <h2>Datos de Envío</h2>
      <div className="form-row">
        <div className="form-column">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={shipmentData.user.Nombre}
            placeholder="Digite su nombre"
            disabled
          />
        </div>
        <div className="form-column">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={shipmentData.user.Primer_Apellido}
            placeholder="Digite su apellido"
            disabled
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-column">
          <div className="form-column-aux aux">
            <label htmlFor="tipo_documento">Tipo de Documento</label>
            <select id="tipo_documento" name="tipo_documento" value={shipmentData.user.Tipo1} disabled>
              <option value={shipmentData.user.Tipo1}>{shipmentData.user.Tipo1}</option>
            </select>
          </div>
          <div className="form-column-aux">
            <label htmlFor="documento">Número de Documento</label>
            <input
              type="number"
              id="documento"
              name="documento"
              value={shipmentData.user.Documento}
              placeholder="Digite el número de documento"
              disabled
            />
          </div>
        </div>
        <div className="form-column">
          <div className="form-column-aux aux">
            <label htmlFor="departamento">Departamento</label>

            <select
              id="departamento"
              name="Codigo_Deapartamento"
              value={formData.Codigo_Deapartamento}
              onChange={handleCombinedChange}
            >
              <option value={shipmentData.user.Departamento1.Codigo_Departamento}>
                {shipmentData.user.Departamento1.Departamento}
              </option>
              {departmentList.map((department) =>
                <option value={department.Codigo_Deapartamento} key={department.Codigo_Deapartamento}>
                  {department.Departamento}
                </option>
              )}
            </select>
          </div>
          <div className="form-column-aux">
            <label htmlFor="municipio">Municipio</label>
            <select
              id="municipio"
              name="Codigo_Municipio"
              value={formData.Codigo_Municipio}
              onChange={handleChange}
            >
              <option value={shipmentData.user.Municipio.Codigo_Municipio}>{shipmentData.user.Municipio.Municipio}</option>
              {cityList.map((city) =>
                <option value={city.Codigo_Municipio} key={city.Codigo_Municipio}>
                  {city.Municipio}
                </option>
              )}
            </select>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-column">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="Direccion"
            placeholder="Digite su dirección residencial"
            value={formData.Direccion}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="submit-button">
        <button id="btnPedir" type="button" onClick={() => funcionPost(total)}>Continuar</button>
      </div>
      <div className="btnWompi"></div>
      {responseData.map((datos) => (
        <div key={datos.reference}>
          <form id="formWompi" action="https://checkout.wompi.co/p/" method="GET">
            <input type="hidden" name="public-key" className="key" value={datos.public_key} />
            <input type="hidden" name="currency" className="currency" value={datos.currency} />
            <input type="hidden" name="amount-in-cents" className="amount" value={datos.amount} />
            <input type="hidden" name="reference" className="reference" value={datos.reference} />
            <input type="hidden" name="signature:integrity" className="signature" value={datos.signature} />
            <input type="hidden" name="redirect-url" value="https://www.theberryfields.com/" />
          </form>
        </div>
      ))}
    </div>
  );
};
