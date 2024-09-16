import React, { useState, useEffect } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

function App() {
  const [products, setProducts] = useState([]);
  const [fileHandle, setFileHandle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

 
  useEffect(() => {
    async function loadProductsFromFile() {
      try {
        
        if (fileHandle) {
          const file = await fileHandle.getFile();
          const contents = await file.text();
          setProducts(JSON.parse(contents));
        }
      } catch (error) {
        console.error('Error al cargar el archivo:', error);
      }
    }
    loadProductsFromFile();
  }, [fileHandle]);

 
  const openFile = async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'JSON File', accept: { 'application/json': ['.json'] } }],
        multiple: false
      });
      setFileHandle(handle);
    } catch (error) {
      console.error('Error al abrir el archivo:', error);
    }
  };

 
  useEffect(() => {
    if (fileHandle) {
      saveProductsToFile();
    }
  }, [products]);

 
  const saveProductsToFile = async () => {
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(products, null, 2));
      await writable.close();
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }
  };

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const handleNextPage = () => {
    if (currentPage * productsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOpenFile = () => {
    alert('Funcionalidad de abrir archivo en proceso...');
    
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="App">
      <h1>Gestión de Inventario</h1>
      <div className="container">
        {/* Columna izquierda */}
        <div className="left-column">
          <h2>Gestión de Inventario</h2>
          <div className="form-section">
            <ProductForm addProduct={addProduct} />
          </div>
        </div>

        {/* Columna derecha: tabla de productos */}
        <div className="table-section">
          <h2>Tabla de Productos</h2>
          <ProductTable 
            products={currentProducts} 
            deleteProduct={deleteProduct} 
            updateProduct={updateProduct} 
          />

          {/* Paginación debajo de la tabla */}
          <div className="pagination">
            <button onClick={handlePrevPage}>&larr;</button>
            <button onClick={handleNextPage}>&rarr;</button>
          </div>

          {/* Botón para abrir archivo de productos */}
          {/* Botón para abrir el archivo local la primera vez */}
      {!fileHandle && <button onClick={openFile}>Abrir Archivo de Productos</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
