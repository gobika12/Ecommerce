import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const FooterLink = styled.a`
  color: #f00d88;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} GreatDeal. All rights reserved. | Designed by Gobika R
      </FooterText>
      <FooterText>
        <FooterLink href="/contact">Contact Us</FooterLink> | <FooterLink href="/about">About Us</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
