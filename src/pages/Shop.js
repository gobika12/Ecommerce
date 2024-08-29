import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';
import { useCart } from '../CartContext'; // Import CartContext

const GlobalStyle = createGlobalStyle`
  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .ReactModal__Overlay--after-open {
    opacity: 1;
  }
  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
  .ui-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1100;
  }
`;

const ShopPage = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ornament, setOrnament] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart(); // Use CartContext

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [category, ornament, sortOption, products]);

  const filterAndSortProducts = () => {
    let updatedProducts = products.filter(product =>
      (category ? product.category === category : true) &&
      (ornament ? product.ornament === ornament : true)
    );

    if (sortOption === 'popularity') {
      updatedProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === 'priceLowToHigh') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      closeModal(); // Optionally close modal after adding to cart
    }
  };

  return (
    <>
      <GlobalStyle />
      <ShopContainer>
        <FilterAndProducts>
          <Filters>
            <Select onChange={(e) => setOrnament(e.target.value)} value={ornament}>
              <option value="">All Ornaments</option>
              <option value="Necklace">Necklace</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Earrings">Earrings</option>
              <option value="Ring">Ring</option>
            </Select>
            <Select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
              <option value="">Sort By</option>
              <option value="popularity">Popularity</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </Select>
          </Filters>
          <ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.name} onClick={() => openModal(product)} />
                <ProductDetails>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>₹{product.price}</ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <AddToCartButton onClick={() => addToCart(product)}>Add to Cart</AddToCartButton>
                </ProductDetails>
              </ProductCard>
            ))}
          </ProductsGrid>
        </FilterAndProducts>
        {selectedProduct && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Product Details"
            className="ui-dialog" // Apply the .ui-dialog class
            overlayClassName="ReactModal__Overlay"
          >
            <ModalContent>
              <ModalImage src={selectedProduct.image} alt={selectedProduct.name} />
              <ModalDetails>
                <ModalName className="dialog-output">{selectedProduct.name}</ModalName> {/* Apply .dialog-output class */}
                <ModalPrice>₹{selectedProduct.price}</ModalPrice>
                <ModalDescription>{selectedProduct.description}</ModalDescription>
                <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
              </ModalDetails>
              <CloseButton onClick={closeModal}>Close</CloseButton>
            </ModalContent>
          </Modal>
        )}
      </ShopContainer>
    </>
  );
};

// Styled components
const ShopContainer = styled.div`
  padding: 20px;
`;

const FilterAndProducts = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
`;

const ProductDetails = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.2em;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  color: #f00d88;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 0.9em;
  color: #666;
  margin: 10px 0;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #f00d88;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d00c78;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ModalDetails = styled.div`
  padding: 20px;
`;

const ModalName = styled.h3`
  font-size: 1.5em;
  margin: 10px 0;
`;

const ModalPrice = styled.p`
  font-size: 1.2em;
  color: #f00d88;
  margin: 10px 0;
`;

const ModalDescription = styled.p`
  font-size: 1em;
  color: #666;
  margin: 10px 0;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #dc3545;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export default ShopPage;
