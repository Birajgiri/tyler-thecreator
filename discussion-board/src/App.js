
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar({ onCopyrightClick }) {
  return (
    <nav className="navbar navbar-dark custom-navbar">
      <div className="container">
        <button 
          className="navbar-brand fw-bold custom-brand btn-link" 
          onClick={() => window.location.reload()}
          style={{ border: 'none', background: 'none', color: '#fff', textDecoration: 'none' }}
        >
          Tyler, the Creator
        </button>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse right-side-menu" id="navbarNav">
          <button 
            className="menu-close" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-label="Close menu"
          >
            ✕
          </button>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => {
                  const heroSection = document.querySelector('#hero');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  // Close menu after navigation
                  const navCollapse = document.getElementById('navbarNav');
                  if (navCollapse) {
                    navCollapse.classList.remove('show');
                  }
                }}
                style={{ border: 'none', background: 'none', color: 'rgba(255,255,255,0.9)', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}
              >
                Hero Section
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => {
                  const albumsSection = document.querySelector('#three-column');
                  if (albumsSection) {
                    albumsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  // Close menu after navigation
                  const navCollapse = document.getElementById('navbarNav');
                  if (navCollapse) {
                    navCollapse.classList.remove('show');
                  }
                }}
                style={{ border: 'none', background: 'none', color: 'rgba(255,255,255,0.9)', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}
              >
                Albums
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => {
                  const discussionSection = document.querySelector('#discussion-board');
                  if (discussionSection) {
                    discussionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                  // Close menu after navigation
                  const navCollapse = document.getElementById('navbarNav');
                  if (navCollapse) {
                    navCollapse.classList.remove('show');
                  }
                }}
                style={{ border: 'none', background: 'none', color: 'rgba(255,255,255,0.9)', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}
              >
                Discussion Board
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={(e) => {
                  onCopyrightClick();
                  // Close menu after clicking
                  const navCollapse = document.getElementById('navbarNav');
                  if (navCollapse) {
                    navCollapse.classList.remove('show');
                  }
                }}
                style={{ border: 'none', background: 'none', color: 'rgba(255,255,255,0.9)', padding: '1rem 1.5rem', textAlign: 'left', width: '100%' }}
              >
                Copyright
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const handleStartCreating = () => {
    const discussionSection = document.querySelector('#discussion-board');
    if (discussionSection) {
      discussionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <section id="hero" className="hero-section d-flex align-items-center justify-content-center text-white text-center">
      <div className="hero-overlay"></div>
      <div className="container position-relative">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4 fw-bold mb-4">Welcome to Tyler's Discussion Board</h1>
            <p className="lead mb-4">
              A creative platform for meaningful conversations and artistic collaboration. 
              Connect with fellow creators, share your ideas, and engage in inspiring discussions.
            </p>
            <button 
              className="btn btn-lg custom-hero-btn"
              onClick={handleStartCreating}
            >
              Start Creating
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeColumnSection() {
  return (
    <section id="three-column" className="py-5 bg-light">
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col-12">
            <h2 className="display-5 fw-bold text-primary">Creative Features</h2>
            <p className="lead">Discover what makes our platform special</p>
          </div>
        </div>
        
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm">
              <div 
                className="card-header-color"
                style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #fc6917 0%, #e55100 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}
              >
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#fc6917'}}>Flower Boy</h5>
                <p className="card-text flex-grow-1">
                  Tyler's critically acclaimed 2017 album that marked a creative breakthrough. 
                  Featuring introspective lyrics, lush production, and vibrant storytelling that explores themes of growth and self-discovery.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm">
              <div 
                className="card-header-color"
                style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #eea4bb 0%, #d7819c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}
              >
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#eea4bb'}}>IGOR</h5>
                <p className="card-text flex-grow-1">
                  Tyler's Grammy-winning 2019 masterpiece exploring love, heartbreak, and personal transformation. 
                  A bold artistic statement featuring alter ego narratives and innovative production that pushed creative boundaries.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-12">
            <div className="card h-100 shadow-sm">
              <div 
                className="card-header-color"
                style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #75bcff 0%, #4a90e2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}
              >
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#75bcff'}}>Call Me If You Get Lost</h5>
                <p className="card-text flex-grow-1">
                  Tyler's 2021 Grammy-winning album showcasing his rap skills and luxurious lifestyle. 
                  Features DJ Drama's mixtape-style interludes and explores themes of success, relationships, and personal growth through confident storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2025 Tyler, the Creator Discussion Board. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Built with creativity and passion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CopyrightModal({ show, onHide }) {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Copyright Information</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <h6 className="fw-bold text-primary mb-3">Tyler, the Creator Discussion Board</h6>
              <p className="mb-2">&copy; 2025 Tyler, the Creator Discussion Board. All rights reserved.</p>
              <p className="mb-2">Built with creativity and passion</p>
              <hr className="my-3" />
              <p className="small text-muted mb-0">
                This platform is designed for creative discussions and artistic collaboration. 
                All content and designs are protected by copyright law.
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainPage() {
  const [showCopyright, setShowCopyright] = React.useState(false);

  React.useEffect(() => {
    const token = window.localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const handleCopyrightClick = () => {
    setShowCopyright(true);
  };

  const handleCopyrightClose = () => {
    setShowCopyright(false);
  };

  return (
    <>
      <Navbar onCopyrightClick={handleCopyrightClick} />
      <HeroSection />
      <ThreeColumnSection />
      <div id="discussion-board" className="main-bg"> 
        <div className="main-card"> 
          <h1 style={{ marginBottom: 24, color: '#01823f', letterSpacing: 1 }}>Discussion Board</h1>
          <button className="main-btn" onClick={() => window.location.href = '/register'}>Register</button><br/>
          <button className="main-btn" onClick={() => window.location.href = '/login'}>Login</button><br/>
        </div>
      </div>
      <Footer />
      <CopyrightModal show={showCopyright} onHide={handleCopyrightClose} />
      {showCopyright && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
export { Footer };
