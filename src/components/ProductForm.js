import React, { useState } from 'react';

function ProductForm({ addProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, price, stock, supplier });
    setName('');
    setPrice('');
    setStock('');
    setSupplier('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cantidad en Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Detalles del Proveedor:</label>
        <input
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;
