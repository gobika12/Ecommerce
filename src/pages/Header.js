// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import logoImage from '../images/logo.jpg'; // Adjust the path and filename

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #000;
  }
`;

const LogoImage = styled.img`
  width: 9rem; /* Adjust size as needed */
  height: 9rem; /* Adjust size as needed */
  margin-right: 0.5rem; /* Space between icon and text */
`;

const Nav = styled.nav`
  @media (max-width: 780px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 0.5rem;

  &:hover {
    color: #000;
    background-color: #f8f8f8;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
`;

const CartIcon = styled(Link)`
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 780px) {
    margin-top: 1rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage src={logoImage} alt="GreatDeals Logo" />
        GreatDeals Handmade Jewels
      </Logo>
      <Nav>
        <NavLinks>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </NavLinks>
      </Nav>
      <CartIcon to="/cart" aria-label="View Cart">
        <FaShoppingCart />
      </CartIcon>
    </HeaderContainer>
  );
};

export default Header;
