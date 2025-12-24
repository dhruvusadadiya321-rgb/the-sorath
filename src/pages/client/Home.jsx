import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiShoppingBag, FiUsers, FiPackage } from 'react-icons/fi';
import { BsGem, BsClock } from 'react-icons/bs';
import { FaCrown, FaGlassCheers } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  const theme = {
    gold: '#d4af37',
    goldLight: '#f0c450',
    goldDark: '#b8941f',
    dark: '#1a1a1a',
    darkLight: '#2a2a2a',
    light: '#f8f9fa',
    white: '#ffffff',
    grey: '#666',
    pink: '#FF6584'
  };

  const heroSlides = [
    {
      image: 'https://ik.imagekit.io/4sjmoqtje/tr:w-1350,c-at_max/cdn/shop/files/1-slider-banner-menswear-under-desktop-2800x1050-27-10-25-india.jpg?v=1761625794',
      title: 'The Royal Groom Collection',
      subtitle: 'Sherwanis, Jodhpuris & Bandhgalas',
      description: 'Handcrafted for the modern groom'
    },
    {
      image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2084&auto=format&fit=crop',
      title: 'The Bridal Collection',
      subtitle: 'Lehengas, Sarees & Wedding Gowns',
      description: 'Couture for the radiant bride'
    },
    {
      image: 'https://images.unsplash.com/photo-1604669364246-2233d3db138f?q=80&w=2070&auto=format&fit=crop',
      title: 'Premium Wedding Accessories',
      subtitle: 'Jewelry, Footwear & More',
      description: 'Complete your wedding ensemble'
    }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        // Live API URL Added here
        const { data } = await axios.get(`${API_URL}/api/categories`);
        
        const featured = data
          .filter(cat => cat.isFeatured)
          .slice(0, 3)
          .map(cat => ({
            ...cat,
            image: cat.image || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
            color: cat.color || `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)`
          }));
        
        setFeaturedCategories(featured);
        setCategoryError(null);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoryError('Unable to load collections. Showing default collections.');
        
        setFeaturedCategories([
          {
            _id: '1',
            name: 'Wedding Sherwanis',
            description: 'Royal & Regal',
            image: 'https://getethnic.com/wp-content/uploads/2024/08/Winter-Groom-4.webp',
            count: '45+ Designs',
            link: '/wedding-sherwanis',
            color: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.darkLight} 100%)`
          },
          {
            _id: '2',
            name: 'Bridal Lehengas',
            description: 'Heavy & Exquisite',
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2084&auto=format&fit=crop',
            count: '60+ Designs',
            link: '/bridal-lehengas',
            color: `linear-gradient(135deg, ${theme.pink} 0%, #ff8da1 100%)`
          },
          {
            _id: '3',
            name: 'Jodhpuri Suits',
            description: 'Classic & Timeless',
            image: 'https://images.unsplash.com/photo-1627932674393-270830db8421?q=80&w=1974&auto=format&fit=crop',
            count: '35+ Designs',
            link: '/jodhpuri-suits',
            color: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`
          }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const premiumFeatures = [
    {
      icon: <BsGem />,
      title: "Authentic Craftsmanship",
      description: "Handcrafted by master artisans with decades of experience",
      color: theme.gold
    },
    {
      icon: <FiCheckCircle />,
      title: "Custom Tailoring",
      description: "Perfect fit guaranteed with our made-to-measure service",
      color: theme.pink
    },
    {
      icon: <FiPackage />,
      title: "Premium Packaging",
      description: "Luxury packaging with certificate of authenticity",
      color: theme.gold
    },
    {
      icon: <FiUsers />,
      title: "Personal Stylist",
      description: "One-on-one consultation with wedding fashion experts",
      color: theme.pink
    }
  ];

  return (
    <div style={{ 
      fontFamily: "'Poppins', sans-serif", 
      background: theme.white,
      overflow: 'hidden'
    }}>
      
      {/* === HERO SECTION === */}
      <section style={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.7) 50%, rgba(212,175,55,0.1) 100%)'
            }} />
          </div>
        ))}

        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          color: theme.white, 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            width: '100%',
            paddingTop: '80px'
          }}>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 25px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: `1px solid ${theme.gold}`,
              borderRadius: '30px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)',
              fontWeight: '600',
              letterSpacing: '1px',
              fontSize: '14px'
            }}>
              <FaCrown /> EXCLUSIVE WEDDING BOUTIQUE
            </div>

            {user && (
              <div style={{ 
                display: 'inline-block', 
                padding: '8px 20px', 
                background: 'rgba(212, 175, 55, 0.2)', 
                border: `1px solid ${theme.gold}`, 
                borderRadius: '30px', 
                marginBottom: '20px', 
                backdropFilter: 'blur(5px)', 
                color: theme.gold, 
                fontWeight: '600',
                fontSize: '14px'
              }}>
                👋 Welcome back, {user.name}
              </div>
            )}

            <h2 style={{ 
              fontSize: '16px', 
              letterSpacing: '4px', 
              textTransform: 'uppercase', 
              marginBottom: '20px', 
              color: theme.gold,
              fontWeight: '500'
            }}>
              {heroSlides[currentSlide].subtitle}
            </h2>

            <h1 style={{ 
              fontSize: 'clamp(36px, 5vw, 72px)', 
              fontFamily: "'Playfair Display', serif", 
              margin: '0 0 25px 0', 
              lineHeight: '1.1',
              fontWeight: '700'
            }}>
              {heroSlides[currentSlide].title}
            </h1>

            <p style={{ 
              fontSize: '18px', 
              marginBottom: '40px', 
              color: '#ddd', 
              fontWeight: '300',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              {heroSlides[currentSlide].description}
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Link to="/shop">
                <button style={{ 
                  padding: '18px 45px', 
                  fontSize: '16px', 
                  fontWeight: '700', 
                  background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`, 
                  color: theme.dark, 
                  border: 'none', 
                  borderRadius: '50px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
                  letterSpacing: '0.5px'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
                  }}
                >
                  EXPLORE COLLECTION <FiArrowRight />
                </button>
              </Link>
              
              {!user && (
                <Link to="/register">
                  <button style={{ 
                    padding: '18px 45px', 
                    fontSize: '16px', 
                    fontWeight: '700', 
                    background: 'transparent', 
                    color: theme.white, 
                    border: `2px solid ${theme.gold}`, 
                    borderRadius: '50px', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.gold;
                      e.target.style.color = theme.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = theme.white;
                    }}
                  >
                    CREATE ACCOUNT
                  </button>
                </Link>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '50px',
              alignItems: 'center'
            }}>
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: index === currentSlide ? '40px' : '12px',
                    height: '12px',
                    background: index === currentSlide ? theme.gold : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
          textAlign: 'center',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{ marginBottom: '10px' }}>Scroll to explore</div>
          <div style={{
            width: '1px',
            height: '40px',
            background: theme.gold,
            margin: '0 auto',
            opacity: 0.6
          }} />
        </div>
      </section>

      {/* === FEATURED CATEGORIES === */}
      <section style={{ 
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 25px',
              background: `${theme.gold}15`,
              border: `1px solid ${theme.gold}30`,
              borderRadius: '30px',
              marginBottom: '20px',
              fontWeight: '600',
              color: theme.gold,
              fontSize: '14px',
              letterSpacing: '1px'
            }}>
              FEATURED COLLECTIONS
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              color: theme.dark, 
              marginTop: '15px', 
              marginBottom: '15px',
              lineHeight: '1.2'
            }}>
              Curated For Your <span style={{ color: theme.gold }}>Special Day</span>
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: theme.grey, 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Discover premium wedding attire meticulously crafted for brides, grooms, and wedding parties
            </p>
          </div>

          {loadingCategories ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: `3px solid ${theme.gold}20`,
                  borderTopColor: theme.gold,
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  animation: 'spin 1s linear infinite'
                }} />
                <div style={{ color: theme.dark, fontWeight: '600' }}>
                  Loading Featured Collections...
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
              marginTop: '60px'
            }}>
              {featuredCategories.map((category, index) => (
                <Link 
                  to={`/shop?category=${encodeURIComponent(category.name)}`} 
                  key={category._id || index}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ 
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '500px',
                    cursor: 'pointer',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-15px)';
                      e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.2)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }} 
                    />
                    <div style={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                    }} />
                    
                    <div style={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      padding: '40px',
                      color: theme.white
                    }}>
                      <div style={{ 
                        background: category.color || `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)`,
                        padding: '6px 15px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '15px',
                        letterSpacing: '1px'
                      }}>
                        {category.count || 'Premium'}
                      </div>
                      <h3 style={{ 
                        margin: '0 0 10px 0', 
                        fontFamily: "'Playfair Display', serif", 
                        fontSize: '28px',
                        lineHeight: '1.2'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{ 
                        margin: '0 0 20px 0', 
                        fontSize: '16px', 
                        color: theme.gold,
                        fontWeight: '500'
                      }}>
                        {category.description || 'Premium Collection'}
                      </p>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: theme.white,
                        fontSize: '14px',
                        fontWeight: '600',
                        opacity: 0.9
                      }}>
                        Explore Collection <FiArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {categoryError && (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'rgba(255, 101, 132, 0.1)',
              borderRadius: '15px',
              marginTop: '20px',
              color: theme.pink
            }}>
              ⚠️ {categoryError}
            </div>
          )}
        </div>
      </section>

      {/* === FEATURES SECTION === */}
      <section style={{ 
        padding: '100px 20px',
        background: theme.dark,
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 25px',
              background: 'rgba(212, 175, 55, 0.1)',
              border: `1px solid ${theme.gold}`,
              borderRadius: '30px',
              marginBottom: '20px',
              fontWeight: '600',
              color: theme.gold,
              fontSize: '14px',
              letterSpacing: '1px'
            }}>
              <FaCrown /> WHY CHOOSE THE SORATH
            </div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              color: theme.white, 
              marginTop: '15px',
              lineHeight: '1.2'
            }}>
              Experience <span style={{ color: theme.gold }}>Premium</span> Wedding Luxury
            </h2>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginTop: '50px'
          }}>
            {premiumFeatures.map((feature, index) => (
              <div key={index} style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '40px 30px',
                border: `1px solid ${feature.color}20`,
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = `${feature.color}20`;
                }}
              >
                <div style={{ 
                  width: '70px',
                  height: '70px',
                  background: `${feature.color}20`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '28px',
                  color: feature.color
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '22px', 
                  color: theme.white, 
                  marginBottom: '15px',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#aaa', 
                  fontSize: '15px', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section style={{ 
        padding: '120px 20px',
        background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.darkLight} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            fontSize: '32px',
            color: theme.dark
          }}>
            <FaGlassCheers />
          </div>
          
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(32px, 4vw, 48px)', 
            color: theme.white, 
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}>
            Begin Your <span style={{ color: theme.gold }}>Royal Wedding</span> Journey
          </h2>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#ccc', 
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover premium wedding attire that blends traditional craftsmanship with contemporary elegance. 
            Your perfect wedding look awaits.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <button style={{ 
                padding: '18px 45px', 
                fontSize: '16px', 
                fontWeight: '700', 
                background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`, 
                color: theme.dark, 
                border: 'none', 
                borderRadius: '50px', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
                }}
              >
                <FiShoppingBag /> SHOP NOW
              </button>
            </Link>
            
            <Link to="/appointment">
              <button style={{ 
                padding: '18px 45px', 
                fontSize: '16px', 
                fontWeight: '700', 
                background: 'transparent', 
                color: theme.white, 
                border: `2px solid ${theme.gold}`, 
                borderRadius: '50px', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.gold;
                  e.target.style.color = theme.dark;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = theme.white;
                }}
              >
                <BsClock /> BOOK CONSULTATION
              </button>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
          
          section:first-child {
            height: 90vh !important;
          }
          
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;