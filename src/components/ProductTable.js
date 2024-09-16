import React, { useState } from 'react';

function ProductTable({ products, deleteProduct, updateProduct }) {
  const [editableId, setEditableId] = useState(null);
  const [editableProduct, setEditableProduct] = useState({});

  const handleEdit = (product) => {
    setEditableId(product.id);
    setEditableProduct({ ...product });
  };

  const handleUpdate = () => {
    updateProduct(editableProduct);
    setEditableId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Proveedor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            {editableId === product.id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editableProduct.name}
                    onChange={(e) => setEditableProduct({ ...editableProduct, name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editableProduct.price}
                    onChange={(e) => setEditableProduct({ ...editableProduct, price: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editableProduct.stock}
                    onChange={(e) => setEditableProduct({ ...editableProduct, stock: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editableProduct.supplier}
                    onChange={(e) => setEditableProduct({ ...editableProduct, supplier: e.target.value })}
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Guardar</button>
                  <button onClick={() => setEditableId(null)}>Cancelar</button>
                </td>
              </>
            ) : (
              <>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.supplier}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
