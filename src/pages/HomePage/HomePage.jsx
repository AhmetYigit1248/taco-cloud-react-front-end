import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>🌮 Taco Cloud</h1>
                    <p className="tagline">Design Your Perfect Taco Experience</p>
                    <p className="description">
                        Fresh ingredients, endless combinations, unforgettable taste.
                        Create your dream taco today!
                    </p>
                </div>
                <div className="hero-image">
                    <img src="/images/Capture.png" alt="Taco Cloud" />
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <span className="feature-icon">🥬</span>
                    <h3>Fresh Ingredients</h3>
                    <p>Premium quality, locally sourced ingredients for the best taste</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">🎨</span>
                    <h3>Custom Design</h3>
                    <p>Build your taco exactly the way you want it</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">🚀</span>
                    <h3>Fast Delivery</h3>
                    <p>Hot and fresh, delivered right to your door</p>
                </div>
            </div>

            <div className="stats-section">
                <div className="stat">
                    <span className="stat-number">10K+</span>
                    <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Ingredients</span>
                </div>
                <div className="stat">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Combinations</span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;