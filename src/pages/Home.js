import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles including animations
const GlobalStyle = createGlobalStyle`
  @keyframes swing {
    0% { transform: rotate(3deg); }
    100% { transform: rotate(-3deg); }
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .swing {
    animation: swing ease-in-out 1s infinite alternate;
    transform-origin: center -20px;
    float: left;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }

  .swing img {
    border: 5px solid #f8f8f8;
    display: block;
  }

  .swing:after {
    content: '';
    position: absolute;  
    width: 20px; height: 20px;  
    border: 1px solid #999;
    top: -10px; left: 50%;
    z-index: 0;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }

  .swing:before {
    content: '';
    position: absolute;
    width: 5px; height: 5px;
    top: -14px; left: 54%;
    z-index: 5;
    border-radius: 50%;
    background: #000;
  }
`;

const categories = [
  {
    name: 'Beaded Jewelry',
    description: 'Beaded jewelry features handcrafted necklaces, bracelets, earrings, and anklets made with a variety of beads. Each piece is designed to add a unique touch to any outfit.',
    image: require('../images/Beaded.jpg')
  },
  {
    name: 'Wire Wrapped Jewelry',
    description: 'Wire wrapped jewelry includes pendants, rings, bracelets, and earrings crafted using intricate wire wrapping techniques. These pieces are known for their elegant and intricate designs.',
    image: require('../images/WireWrapped.jpeg')
  },
  {
    name: 'Metalwork Jewelry',
    description: 'Metalwork jewelry encompasses beautifully crafted cuff bracelets, rings, earrings, and necklaces made from various metals. Each piece is designed to be both stylish and durable.',
    image: require('../images/Metal.jpeg')
  },
  {
    name: 'Resin Jewelry',
    description: 'Resin jewelry features unique pendants, rings, earrings, and bracelets made from resin. These pieces often include embedded elements like flowers or glitter for a distinctive look.',
    image: require('../images/Resin.jpg')
  }
];

const HomePage = () => {
  const [inView, setInView] = useState(Array(categories.length).fill(false));
  const imageRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = imageRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setInView((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        }
      });
    }, {
      threshold: 0.1
    });

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleCategoryClick = (category) => {
    navigate('/shop', { state: { category } });
  };

  return (
    <>
      <GlobalStyle />
      <HomePageContainer>
        {categories.map((category, index) => (
          <CategoryContainer key={index} reverse={index % 2 !== 0} onClick={() => handleCategoryClick(category.name)}>
            <TextContent className={inView[index] ? (index % 2 === 0 ? 'slideInLeft' : 'slideInRight') : ''}>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </TextContent>
            <ImageContent>
              <SwingImage
                src={category.image}
                alt={category.name}
                ref={(el) => (imageRefs.current[index] = el)}
                className={inView[index] ? 'swing' : ''}
              />
            </ImageContent>
          </CategoryContainer>
        ))}
      </HomePageContainer>
    </>
  );
};

export default HomePage;

// Styled Components
const HomePageContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  cursor: pointer; /* Add cursor pointer to indicate clickable */
`;

const TextContent = styled.div`
  flex: 1;
  padding: 20px;
  opacity: 0;
  &.slideInLeft {
    animation: slideInLeft 1s forwards;
  }
  &.slideInRight {
    animation: slideInRight 1s forwards;
  }
`;

const ImageContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SwingImage = styled.img`
  max-width: 70%;
  height: auto;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
  transition-delay: 0.25s;

  &.swing {
    opacity: 1;
    transform: translateY(0);
    animation: swing ease-in-out 1s infinite alternate;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

const h2 = styled.h2`
  margin-top: 0;
`;
