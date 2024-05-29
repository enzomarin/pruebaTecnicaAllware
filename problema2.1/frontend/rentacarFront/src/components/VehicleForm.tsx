// src/components/VehicleForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { addVehicle } from '../services/api.ts';
import { VehicleSchema } from '../schemas/validationSchema.ts';
import z from 'zod'
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

`;

const DivVendedor = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
`
const DivVehicle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
<`

const Input = styled.input`

  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  height: 44px;
  border-radius: 4px;
  box-sizing: border-box; /* Asegura que el padding se incluya en el tamaño total */

`;

const Label = styled.label`
  font-weight: bold;
  padding: 0;
  margin: 0;
`;
const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Span = styled.span`
  color: red;
  margin: 5px;

`
const Hr = styled.hr`
  border: solid #808080 1px;
  width: 100%;
`
interface VehicleFormProps {
  onVehicleAdded: () => void;
}


interface FormData {
  rut: string;
  name: string;
  patent: string;
  brand: string;
  model: string;
  price: string;
}

const brands = ['Toyota', 'Ford', 'Chevrolet', 'Honda', 'Nissan'];
const modelsByBrand = {
  Toyota: ['Corolla', 'Camry'],
  Ford: ['Fiesta', 'Mustang'],
  Chevrolet: ['Spark', 'Cruze'],
  Honda: ['Civic', 'Accord'],
  Nissan: ['Sentra', 'Altima'],
};

const initialState = {
  rut: '',
  name: '',
  patent: '',
  brand: brands[0],
  model: modelsByBrand.Toyota[0],
  price: '0'
}
const VehicleForm: React.FC<VehicleFormProps> = ({ onVehicleAdded }) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'brand' && { model: modelsByBrand[value as keyof typeof modelsByBrand][0] }),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const validateFormtData = VehicleSchema.parse({
        ...formData,
        price: parseInt(formData.price)
      })
      console.log("validateFormtData",validateFormtData)
      setIsSubmitting(true)
      const vehicleData = {
        ...validateFormtData,
        price: validateFormtData.price
      };
      await addVehicle(vehicleData);

      setFormData(initialState) // una vez agregado el nuevo vehiculo limpiamos el formulario
      setIsSubmitting(false)
      setFormErrors({});
      setFormErrors({})
      onVehicleAdded();
    } catch (error) {
      setIsSubmitting(false)
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setFormErrors(fieldErrors);
      }else{

        console.error('Error adding vehicle:', error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <p>Datos del vendedor</p>

      <DivVendedor>
        <FormGroup>
          <Label>Nombre Completo:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nombre Completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && <Span>{formErrors.name}</Span>}
        </FormGroup>


        <FormGroup>
          <Label>Rut Vendedor:</Label>
          <Input
            type="text"
            name="rut"
            placeholder="RUT del vendedor"
            value={formData.rut}
            onChange={handleChange}
            required
          />
          {formErrors.rut && <Span>{formErrors.rut}</Span>}
        </FormGroup>
        

      </DivVendedor>


      <Hr/>
      <p>Datos del vehículo</p>

      <DivVehicle>
        <FormGroup>
          <Label>Patemte del vehículo:</Label>
          <Input
            type="text"
            name="patent"
            placeholder="Patente"
            value={formData.patent}
            onChange={handleChange}
            required
          />
          {formErrors.patent && <Span>{formErrors.patent}</Span>}

        </FormGroup>

        <FormGroup>
          <Label>Marca del vehículo</Label>
          <Select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </FormGroup>



        <FormGroup>
          <Label>Modelo del vehículo</Label>
          <Select>

            {modelsByBrand[formData.brand as keyof typeof modelsByBrand].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Precio del vehiculo</Label>
          <Input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {formErrors.price && <Span>{formErrors.price}</Span>}
        </FormGroup>

      </DivVehicle>

      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando vehiculo ...': 'Agregar Vehículo'}</Button>
    </Form>
  );
};

export default VehicleForm;
