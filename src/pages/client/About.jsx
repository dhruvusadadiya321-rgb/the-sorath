import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiUsers, FiAward, FiFeather, FiStar, FiHeart, FiClock, FiMapPin, FiTarget } from 'react-icons/fi';
import { FaCrown, FaGlassCheers, FaGem, FaRegStar } from 'react-icons/fa';

const About = () => {
  // Premium Color Theme
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

  return (
    <div style={{ 
      fontFamily: "'Poppins', sans-serif", 
      color: theme.dark,
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* === 1. HERO BANNER (Premium Version) === */}
      <section style={{ 
        height: '80vh', 
        backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.9)), url("https://images.unsplash.com/photo-1596203927620-3e3c639692c5?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        position: 'relative',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          color: theme.white,
          position: 'relative',
          zIndex: 2
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
            letterSpacing: '2px',
            fontSize: '14px'
          }}>
            <FaCrown /> OUR STORY
          </div>
          
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(40px, 5vw, 72px)', 
            marginBottom: '20px',
            lineHeight: '1.1'
          }}>
            Where Tradition Meets <span style={{ 
              color: theme.gold,
              fontStyle: 'italic'
            }}>Modern Elegance</span>
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            maxWidth: '600px', 
            margin: '0 auto 30px', 
            color: '#ddd',
            lineHeight: '1.6'
          }}>
            Weaving stories of royal heritage, premium craftsmanship, and timeless elegance into every thread since 2010.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <button style={{ 
                padding: '16px 40px', 
                background: theme.gold, 
                color: theme.dark, 
                border: 'none', 
                borderRadius: '50px', 
                fontSize: '16px', 
                fontWeight: '700', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
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
                Explore Collection
              </button>
            </Link>
            
            <button style={{ 
              padding: '16px 40px', 
              background: 'transparent', 
              color: theme.white, 
              border: `2px solid ${theme.gold}`, 
              borderRadius: '50px', 
              fontSize: '16px', 
              fontWeight: '700', 
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
              Watch Our Story
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          zIndex: 1
        }} />
      </section>

      {/* === 2. OUR JOURNEY SECTION === */}
      <section style={{ 
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            
            {/* Left: Image with Decorative Frame */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '90%',
                height: '500px',
                background: 'linear-gradient(135deg, #eef1ff 0%, #f8f9ff 100%)',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.15)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1605218427368-35b80a3bd256?q=80&w=2080&auto=format&fit=crop" 
                  alt="Craftsmanship" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
                
                {/* Decorative Border */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  border: `2px solid ${theme.gold}30`,
                  borderRadius: '15px',
                  pointerEvents: 'none'
                }} />
              </div>
              
              {/* Floating Stats */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                right: '0',
                background: theme.white,
                padding: '25px',
                borderRadius: '15px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: '800',
                  background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1'
                }}>
                  2010
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: theme.dark,
                  fontWeight: '600',
                  marginTop: '8px'
                }}>
                  Year of Foundation
                </div>
              </div>
            </div>

            {/* Right: Story Content */}
            <div>
              <div style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: `${theme.gold}15`,
                border: `1px solid ${theme.gold}30`,
                borderRadius: '30px',
                marginBottom: '20px',
                fontWeight: '600',
                color: theme.gold,
                fontSize: '13px',
                letterSpacing: '1px'
              }}>
                OUR LEGACY
              </div>
              
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: 'clamp(32px, 4vw, 48px)', 
                marginBottom: '25px',
                lineHeight: '1.2'
              }}>
                Crafting Royal Experiences <br />
                <span style={{ color: theme.gold }}>Since 2010</span>
              </h2>
              
              <p style={{ 
                lineHeight: '1.8', 
                color: theme.grey, 
                marginBottom: '25px',
                fontSize: '16px'
              }}>
                Born from a passion for authentic craftsmanship in the heart of Saurashtra, 
                <strong style={{ color: theme.dark }}> The Sorath</strong> began as a humble atelier with a singular vision: 
                to redefine luxury ethnic wear for the modern connoisseur.
              </p>
              
              <p style={{ 
                lineHeight: '1.8', 
                color: theme.grey, 
                marginBottom: '30px',
                fontSize: '16px'
              }}>
                Today, we blend centuries-old embroidery techniques with contemporary design sensibilities, 
                creating wedding attire that tells a story of heritage while celebrating modern love stories.
              </p>
              
              {/* Key Values */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginTop: '40px'
              }}>
                {[
                  { icon: <FiCheck />, text: 'Master Artisans' },
                  { icon: <FaGem />, text: 'Premium Fabrics' },
                  { icon: <FiFeather />, text: 'Hand Embroidery' },
                  { icon: <FiTarget />, text: 'Custom Tailoring' }
                ].map((value, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: `${theme.gold}15`,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.gold,
                      fontSize: '18px'
                    }}>
                      {value.icon}
                    </div>
                    <span style={{ 
                      fontSize: '15px', 
                      fontWeight: '600',
                      color: theme.dark
                    }}>
                      {value.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 3. PREMIUM STATS BANNER === */}
      <section style={{ 
        background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.darkLight} 100%)`,
        padding: '80px 20px',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            
            {[
              { number: '10K+', label: 'Happy Clients', icon: <FiHeart />, suffix: '+' },
              { number: '500+', label: 'Exclusive Designs', icon: <FiStar />, suffix: '+' },
              { number: '14', label: 'Years of Excellence', icon: <FiClock />, suffix: ' Years' },
              { number: '50+', label: 'Cities Served', icon: <FiMapPin />, suffix: '+' }
            ].map((stat, index) => (
              <div key={index} style={{
                padding: '40px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                border: `1px solid ${theme.gold}15`,
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = `${theme.gold}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${theme.gold}15`;
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: `${theme.gold}15`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '28px',
                  color: theme.gold
                }}>
                  {stat.icon}
                </div>
                
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '800',
                  background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1',
                  marginBottom: '10px'
                }}>
                  {stat.number}
                </div>
                
                <div style={{ 
                  fontSize: '18px', 
                  color: theme.white,
                  fontWeight: '600',
                  marginBottom: '5px'
                }}>
                  {stat.label}
                </div>
                
                <div style={{ 
                  fontSize: '14px', 
                  color: theme.gold,
                  fontWeight: '500'
                }}>
                  {stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 4. WHY CHOOSE US (Premium Cards) === */}
      <section style={{ 
        padding: '120px 20px',
        background: theme.white
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '10px 25px',
            background: `${theme.gold}15`,
            border: `1px solid ${theme.gold}30`,
            borderRadius: '30px',
            marginBottom: '25px',
            fontWeight: '600',
            color: theme.gold,
            fontSize: '14px',
            letterSpacing: '1px'
          }}>
            <FaCrown style={{ marginRight: '8px' }} /> PREMIUM EXPERIENCE
          </div>
          
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(36px, 4vw, 48px)', 
            marginBottom: '60px',
            lineHeight: '1.2'
          }}>
            The <span style={{ color: theme.gold }}>Sorath</span> Difference
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            
            {[
              {
                icon: <FiFeather />,
                title: 'Master Craftsmanship',
                description: 'Each piece is meticulously handcrafted by our master artisans with decades of experience in traditional embroidery.',
                color: theme.gold,
                features: ['Hand Embroidery', 'Traditional Techniques', 'Attention to Detail']
              },
              {
                icon: <FiAward />,
                title: 'Premium Quality',
                description: 'We source only the finest silks, velvets, and brocades from renowned mills across India and abroad.',
                color: theme.pink,
                features: ['Luxury Fabrics', 'Ethical Sourcing', 'Quality Assurance']
              },
              {
                icon: <FiUsers />,
                title: 'Personalized Service',
                description: 'From consultation to final fitting, our personal stylists ensure your perfect wedding look.',
                color: theme.gold,
                features: ['Custom Fitting', 'Style Consultation', 'Alterations Included']
              }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                borderRadius: '20px',
                padding: '40px 30px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                border: `1px solid ${item.color}20`,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = `${item.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = `${item.color}20`;
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: `${item.color}15`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px',
                  fontSize: '32px',
                  color: item.color
                }}>
                  {item.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '24px', 
                  marginBottom: '15px',
                  color: theme.dark,
                  fontWeight: '700'
                }}>
                  {item.title}
                </h3>
                
                <p style={{ 
                  color: theme.grey, 
                  fontSize: '15px',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  flex: 1
                }}>
                  {item.description}
                </p>
                
                <div style={{ textAlign: 'left', marginTop: 'auto' }}>
                  <div style={{ 
                    fontSize: '14px', 
                    color: theme.dark,
                    fontWeight: '600',
                    marginBottom: '15px',
                    opacity: 0.9
                  }}>
                    Key Features:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {item.features.map((feature, fIndex) => (
                      <div key={fIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        color: theme.grey
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: item.color,
                          borderRadius: '50%'
                        }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 5. PREMIUM CTA SECTION === */}
      <section style={{ 
        padding: '100px 20px',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 101, 132, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
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
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Ready to Craft Your <span style={{ color: theme.gold }}>Royal Story</span>?
          </h2>
          
          <p style={{ 
            fontSize: '18px', 
            color: theme.grey, 
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Experience the pinnacle of wedding luxury. Book a consultation with our style experts 
            and discover the perfect ensemble for your special day.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <button style={{ 
                padding: '18px 45px', 
                background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`, 
                color: theme.dark, 
                border: 'none', 
                borderRadius: '50px', 
                fontSize: '16px', 
                fontWeight: '700', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
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
                Explore Collection
              </button>
            </Link>
            
            <Link to="/contact">
              <button style={{ 
                padding: '18px 45px', 
                background: 'transparent', 
                color: theme.dark, 
                border: `2px solid ${theme.dark}`, 
                borderRadius: '50px', 
                fontSize: '16px', 
                fontWeight: '700', 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.dark;
                  e.target.style.color = theme.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = theme.dark;
                }}
              >
                Book Consultation
              </button>
            </Link>
          </div>
          
          <div style={{ 
            marginTop: '40px', 
            fontSize: '14px', 
            color: theme.grey,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck style={{ color: theme.gold }} /> Premium Quality Guarantee
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck style={{ color: theme.gold }} /> Free Style Consultation
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheck style={{ color: theme.gold }} /> Worldwide Shipping
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;