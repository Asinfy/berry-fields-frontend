import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./UserRegister.css";
import axios from "axios";
import { useMessage } from "../../contexts/MessageContext";

export const UserRegister = () => {
  // se cargan las variables globales 
  const {
    document,
    setDocument,
    setDataRecord,
    setShipmentData
  } = useContext(CartContext);

  const { addMessage } = useMessage();
  //se genera formData para el control de datos del usuario son los datos que se envia para generar el pedido
  const [formData, setFormData] = useState({
    Nombre: "",
    Primer_Apellido: "",
    Tipo1: "",
    Documento: "",
    Codigo_Deapartamento: "",
    Codigo_Municipio: "",
    Direccion: "",
    Correo: "",
    Celular: "",
    Fecha_de_Nacimiento: "",
    Regimen: "",
    Retenedor: "No",
    Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos: "Si",
    Estado: "Activo",
    Cupo: 0,
    Tipo: "Detal",
    Dias: 0,
    location: {
      country2: "Colombia",
      address_line_12: "", //Direccion
      state_province2: "", //departamento
      district_city2: "" //ciudad
    }
  });
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        //se hace el llamado ala api para extraer solo los departamentos y si codigo
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
    fetchDepartment();
  }, []);
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
    handleChange(event);
    if (event.target.name === "Codigo_Deapartamento") {
      fetchCities(event.target.value);
    }
  };

  //se encarga de agregar datos por dato al formData
  const handleChange = (event) => {
    const input = event.target;
    const { name, value } = input;
    //se busca el nombre del municipo para poderlo almacenar 
    let cityName = "";
    if (name === "Codigo_Municipio") {
      const city = cityList.find(city => city.Codigo_Municipio === value);
      cityName = city ? city.Municipio : "";
    }
    //se busca el nombre del departamento para poderlo almacenar 
    let departmentName = "";
    if (name === "Codigo_Deapartamento") {
      const department = departmentList.find(department => department.Codigo_Deapartamento === value);
      departmentName = department ? department.Departamento : "";
    }
    let email = true;

    email = name == "correo" ? validate(value) : email;

    //almacenamos los datos del usuario en un objeto 
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "Codigo_Municipio" && { location: { ...prevFormData.location, "district_city2": cityName } }),
      ...(name === "Codigo_Deapartamento" && { location: { ...prevFormData.location, "state_province2": departmentName } }),
      ...(name === "Direccion" && { location: { ...prevFormData.location, "address_line_12": value } })
    }));
  };

  //validamos el correo que esten en
  const validate = (item) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(item)) {
      return true
    } else {
      return false
    }
  };
  // enviar el registro 
  const handleSubmit = async (event) => {
    event.preventDefault();
    //verificar si no hay datos vacios 
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === null || formData[key] === undefined || parseInt(formData[key]) === NaN) {
        addMessage('warning', 'Advertencia!','faltan datos en el formulario' )
        return false;
      } else if (key === "correo" && validate(formData[key])) {
        return alert("ingresa correo valido")
      }

    }

    try {
      const response = await axios.post('https://zoho.accsolutions.tech/API/v1/Clientes', {
        ...formData
      })
      console.log('Respuesta del servidor:', response.data.message);
      console.log(formData);
      addMessage('success', 'Registro','Su registro a la base de datos BERRY FIELDS fue correto' )
      alert("registro exitoso");
      setDataRecord(null);
      setShipmentData(null)
      return true;

    } catch (error) {
      console.error('Error al registrar cliente:', error);
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado que no está en el rango 2xx
        console.error('Respuesta del servidor:', error.response.data);
        console.error('Código de estado HTTP:', error.response.status);
        addMessage('error', 'Error',`Error al registrarse:  ${error.response.data.message}` )
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
        addMessage('error', 'Error','No se recibió respuesta del servidor al intentar registrar.' )
      } else {
        // Ocurrió un error durante la configuración de la solicitud
        console.error('Error durante la configuración de la solicitud:', error.message);
        addMessage('error', 'Error','Error durante la configuración de la solicitud al intentar registrar.' )
      }
      return false;
    }

  };

  return (
    <>
      <div className="user-register-form-container">
        <h2>Datos de Envío</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="Nombre"
                placeholder="Digite su nombre"
                value={formData.Nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-column">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="Primer_Apellido"
                placeholder="Digite su apellido"
                value={formData.Primer_Apellido}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <div className="form-column-aux aux">
                <label htmlFor="documentType">Tipo de Documento</label>
                <select
                  id="tipo_documento"
                  name="Tipo1"
                  value={formData.Tipo1}
                  onChange={handleChange}
                >
                <option value="">Seleciona una Opción</option>
                  <option value="cc">CC</option>
                  <option value="nit">NIT</option>
                  <option value="ppt">PPT</option>
                </select>
              </div>
              <div className="form-column-aux">
                <label htmlFor="document">Número de Documento</label>
                <input
                  type="number"
                  id="documento"
                  name="Documento"
                  placeholder="Digite el número de documento"
                  value={formData.Documento = document}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form-column-aux aux">
                <label htmlFor="department">Departamento</label>
                <select
                  id="departamento"
                  name="Codigo_Deapartamento"
                  value={formData.Codigo_Deapartamento}
                  onChange={handleCombinedChange}
                >
                  <option value="">Seleciona una Opción</option>
                  {departmentList.map((department) =>
                    <option value={department.Codigo_Deapartamento} key={department.Codigo_Deapartamento}>
                      {department.Departamento}
                    </option>
                  )}
                </select>
              </div>
              <div className="form-column-aux">
                <label htmlFor="city">Municipio</label>
                <select
                  id="municipio"
                  name="Codigo_Municipio"
                  value={formData.Codigo_Municipio}
                  onChange={handleChange}
                >
                  <option value="">Seleciona una Opción</option>
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
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="Direccion"
                placeholder="Digite su dirección residencial"
                value={formData.Direccion}
                onChange={handleChange}
              />
            </div>
            <div className="form-column">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="Correo"
                placeholder="Digite su correo electrónico"
                value={formData.Correo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <div className="form-column-aux aux">
                <label htmlFor="phone">Telefono</label>
                <input
                  type="number"
                  id="telefono"
                  name="Celular"
                  placeholder="Digite su teléfono"
                  value={formData.Celular}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column-aux">
                <label htmlFor="birthDate">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fecha"
                  name="Fecha_de_Nacimiento"
                  value={formData.Fecha_de_Nacimiento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-column">
              <span className="label">Tipo Persona</span>
              <div className="form-column-aux aux-radio">
                <label className="radio">
                  <input
                    type="radio"
                    name="Regimen"
                    value="persona natural - regimen simplificado"
                    checked={formData.Regimen === "persona natural - regimen simplificado"}
                    onChange={handleChange}
                  />
                  Persona Natural
                </label>
              </div>
              <div className="form-column-aux aux-radio">
                <label className="radio">
                  <input
                    type="radio"
                    name="Regimen"
                    value="persona juridica - regimen comun"
                    checked={formData.Regimen === "persona juridica - regimen comun"}
                    onChange={handleChange}
                  />
                  Persona Jurídica
                </label>
              </div>
            </div>
          </div>
          <div className="submit-button">
            <button type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </>
  );
};
