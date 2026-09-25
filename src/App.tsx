import { useMemo, useState } from 'react'
import { ArrowRight, Check, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import ProductCard from './components/ProductCard'
import CartDrawer, { type CartItem } from './components/CartDrawer'
import { products, type Category, type Product } from './data/products'

const categories: Category[] = ['Tous', 'Femme', 'Homme', 'Accessoires']

export default function App() {
  const [category, setCategory] = useState<Category>('Tous')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const filtered = useMemo(
    () =>
      products.filter(
        p =>
          (category === 'Tous' || p.category === category) &&
          p.name.toLowerCase().includes(query.toLowerCase())
      ),
    [category, query]
  )

  const addToCart = (p: Product) => {
    setCart(c => {
      const x = c.find(i => i.id === p.id)
      return x
        ? c.map(i => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...c, { ...p, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const changeQuantity = (id: number, delta: number) =>
    setCart(c =>
      c.flatMap(i => (i.id !== id ? [i] : i.quantity + delta > 0 ? [{ ...i, quantity: i.quantity + delta }] : []))
    )

  const count = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="#">
          NOIRE<span>.</span>
        </a>

        <nav className={'nav ' + (menuOpen ? 'open' : '')}>
          <a href="#collection">Collection</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <Search size={17} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher..." />
          </label>

          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={19} />
            <span>{count}</span>
          </button>

          <button className="mobile-menu" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> Nouvelle collection
            </span>
            <h1>
              Le style n'a
              <br />
              <em>pas besoin</em> d'en faire trop.
            </h1>
            <p>Des pièces choisies pour créer une silhouette moderne, élégante et assumée.</p>
            <a href="#collection" className="primary-btn">
              Découvrir la collection <ArrowRight size={17} />
            </a>

            <div className="trust-row">
              <span>
                <Check size={15} /> Livraison au Sénégal
              </span>
              <span>
                <Check size={15} /> Sélection premium
              </span>
            </div>
          </div>

          {/* Hero visual remplacé par un SVG neutre inline */}
          <div className="hero-visual" aria-hidden="true">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 800"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Bannière neutre"
            >
              <rect width="100%" height="100%" fill="#0f1720" />
              <g transform="translate(80,120)">
                <rect x="0" y="0" width="1040" height="560" rx="8" fill="#111827" />
                <g transform="translate(40,40)">
                  <rect x="0" y="0" width="960" height="480" rx="6" fill="#0b1220" />
                  <text
                    x="480"
                    y="240"
                    fill="#e6e6e6"
                    fontSize="36"
                    fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    NOIRE — Bannière
                  </text>
                  <text
                    x="480"
                    y="290"
                    fill="#9ca3af"
                    fontSize="16"
                    fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    Collection — minimal, moderne, locale
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </section>

        <section id="collection" className="collection section">
          <div className="section-head">
            <div>
              <span className="eyebrow">La sélection</span>
              <h2>Pièces essentielles</h2>
            </div>
            <p>
              {filtered.length} article{filtered.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="filters">
            {categories.map(c => (
              <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>

          {!filtered.length && <div className="no-results">Aucun article ne correspond à votre recherche.</div>}
        </section>

        <section id="about" className="about section">
          <div className="about-image">
            {/* Image d'illustration de la section À propos remplacée par un SVG neutre pour cohérence */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Illustration boutique"
            >
              <rect width="100%" height="100%" fill="#f3f4f6" />
              <text
                x="50%"
                y="50%"
                fill="#374151"
                fontSize="20"
                fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Illustration boutique
              </text>
            </svg>
          </div>

          <div className="about-copy">
            <span className="eyebrow">Notre philosophie</span>
            <h2>
              Moins de bruit.
              <br />
              <em>Plus de style.</em>
            </h2>
            <p>
              NOIRE est un prototype de boutique pensé pour présenter une marque avec une identité forte, une navigation
              rapide et une expérience adaptée au mobile.
            </p>

            <div className="feature-list">
              <div>
                <b>01</b>
                <span>
                  <strong>Design minimal</strong>Une interface claire qui met les produits au premier plan.
                </span>
              </div>
              <div>
                <b>02</b>
                <span>
                  <strong>Mobile first</strong>Le site est conçu pour être partagé depuis un téléphone.
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  <strong>Commande simple</strong>Ajoutez vos articles et préparez votre récapitulatif.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Prêt à commander ?</h2>
            <p>Utilisez le panier pour préparer votre commande puis contactez directement le vendeur.</p>
          </div>
          <button className="secondary-btn" onClick={() => setCartOpen(true)}>
            Voir mon panier <ShoppingBag size={17} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="logo">
          NOIRE<span>.</span>
        </div>
        <p>Prototype e-commerce · Dakar, Sénégal</p>
        <p>© 2026 NOIRE</p>
      </footer>

      <CartDrawer
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onChangeQuantity={changeQuantity}
        onRemove={id => setCart(c => c.filter(i => i.id !== id))}
      />
    </div>
  )
}
