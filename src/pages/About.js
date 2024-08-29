import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 100px auto;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  animation: floating 3s ease-in-out infinite;
  
  @keyframes floating {
    from { transform: translateY(0); }
    65%  { transform: translateY(15px); }
    to   { transform: translateY(0); }
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  font-family: 'Arial', sans-serif;
  margin: 0 0 20px;
`;

const About = () => {
  return (
    <AboutContainer>
      <Heading>About GreatDeal</Heading>
      <Paragraph>
        Welcome to GreatDeal, your go-to destination for exquisite handmade jewelry. Our collection is curated with love and passion, reflecting the beauty and craftsmanship of traditional and contemporary designs.
      </Paragraph>
      <Paragraph>
        Founded by Gobika R, who has a keen interest in crafts and jewelry-making, GreatDeal brings together unique pieces that are as individual as you are. Each item in our collection is carefully crafted to ensure the highest quality and to bring a touch of elegance to your wardrobe.
      </Paragraph>
      <Paragraph>
        At GreatDeal, we believe in celebrating the art of jewelry making and the joy it brings. Thank you for visiting our store and supporting handmade craftsmanship.
      </Paragraph>
    </AboutContainer>
  );
};

export default About;
