import { ShoppingBag } from 'lucide-react'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'

export default function ProductCard({product,onAdd}:{product:Product;onAdd:(p:Product)=>void}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {/* Image remplacée par un placeholder neutre */}
        <img 
          src="/images/placeholder.png" 
          alt="Produit" 
          className="product-image" 
          loading="lazy"
        />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <button 
            className="icon-btn" 
            onClick={() => onAdd(product)} 
            aria-label={'Ajouter ' + product.name}
          >
            <ShoppingBag size={18}/>
          </button>
        </div>
      </div>
    </article>
  )
}
