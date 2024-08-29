import React from 'react';
import { useCart } from './CartContext'; // Adjust the path if necessary
import styled from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Correct import for jsPDF autotable

const CartContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 150px;
  margin-right: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  flex: 2;
`;

const ProductName = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ProductQuantity = styled.input`
  width: 60px;
  padding: 5px;
  margin-right: 10px;
  text-align: center;
`;

const RemoveButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const ClearCartButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

const TotalAmount = styled.div`
  text-align: right;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const PrintBillButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #2ecc71;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #27ae60;
  }
`;

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GreatDeals Handmade Jewels", 14, 15);

    doc.text("Shopping Cart Invoice", 14, 22);

    doc.setFontSize(14);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableColumn = ["Product", "Quantity", "Price", "Total"];
    const tableRows = cart.map(product => [
      product.name,
      product.quantity,
      `₹${product.price}`,
      `₹${product.price * product.quantity}`,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 40 });
    
    doc.setFontSize(16);
    doc.text(`Total Amount: ₹${calculateTotal()}`, 14, doc.autoTable.previous.finalY + 10);

    doc.save("invoice.pdf");
  };

  return (
    <CartContainer>
      <CartHeader>Shopping Cart</CartHeader>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(product => (
            <CartItem key={product.id}>
              <ImageContainer>
                <ProductImage src={product.image} alt={product.name} />
              </ImageContainer>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>Price: ₹{product.price}</ProductPrice>
                <ProductQuantityContainer>
                  <ProductQuantity
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(event) => handleQuantityChange(product.id, event)}
                  />
                </ProductQuantityContainer>
              </ProductDetails>
              <RemoveButton onClick={() => removeFromCart(product.id)}>Remove</RemoveButton>
            </CartItem>
          ))}
          <TotalAmount>
            <p>Total: ₹{calculateTotal()}</p>
          </TotalAmount>
          <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>
          <PrintBillButton onClick={generatePDF}>Print Bill</PrintBillButton>
        </div>
      )}
    </CartContainer>
  );
};

export default Cart;
