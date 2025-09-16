import { useEffect, useState } from 'react';
import { styles as s } from '../assets/dummystyles'; 
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Minus, Plus, ShoppingBag, Trash } from 'lucide-react';
import { useCart } from '../CartContext/CartContext';
import axios  from 'axios';
const API_BASE='hhtp://localhost:4000';
const IMG_BASE=API_BASE.replace('/api','');
function Cart() {
  const { cart, updateCartItem,removeFromCart } = useCart();
  const [images,setImages]=useState({});
  const items = cart?.items || [];

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    useEffect(()=>{
      axios.get(`${API_BASE}/book`).then(({data})=>{
        const map={};
        data.forEach((book)=>{
          map[book._id]=book.image;
        })
        console.log('images key map:',Objects.keys(map));
        setImages(map);
      })
      .catch((err)=>console.error("Failed to load book images",err));
    })
  const getImageSrc = (item) =>{
       const relPath=images[item.id]
  }


  const inc = (item) =>
    dispatch({ type: 'INCREMENT', payload: { id: item.id, source: item.source } });

  const dec = (item) =>
    dispatch({ type: 'DECREMENT', payload: { id: item.id, source: item.source } });

  const remove = (item) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id, source: item.source } });

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h1 className={s.title}>
            <ShoppingBag className={s.titleIcon} />
            Shopping cart
          </h1>
          <p className={s.subtitle}>
            {items.length} item{items.length !== 1 && 's'} in your cart.
          </p>
        </div>

        {items.length === 0 ? (
          <div className={s.emptyCard}>
            <div className={s.emptyIconWrapper}>
              <ShoppingBag className={s.emptyIcon} />
            </div>
            <h2 className={s.emptyTitle}>Your cart feels lonely</h2>
            <p className={s.emptyDescription}>
              Discover our collection of premium books and start your reading journey.
            </p>
            <Link to="/books" className={s.browseBtn}>
              <BookOpen className={s.browseIcon} />
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className={s.cartGrid}>
            <div className={s.cartItems}>
              {items.map((item) => (
                <div key={`${item.source}-${item.id}`} className={s.cartItemCard}>
                  <img
                    src={getImageSource(item)}
                    className={s.cartItemImage}
                    alt={item.title}
                  />
                  <div className="flex-1">
                    <div className={s.cartItemTop}>
                      <div>
                        <h3 className={s.itemTitle}>{item.title}</h3>
                        <p className={s.itemAuthor}>{item.author}</p>
                      </div>
                      <button onClick={() => remove(item)} className={s.removeBtn}>
                        <Trash className={s.removeIcon} />
                      </button>
                    </div>

                    <div className={s.quantityPriceWrapper}>
                      <div className={s.quantityControls}>
                        <button onClick={() => dec(item)} className={s.qBtn}>
                          <Minus className={s.qIcon} />
                        </button>
                        <span className={s.quantityValue}>{item.quantity}</span>
                        <button onClick={() => inc(item)} className={s.qBtn}>
                          <Plus className={s.qIcon} />
                        </button>
                      </div>
                      <span className={s.itemPrice}>₹{item.price * item.quantity}</span>
                    </div>
                    <span className={s.pricePerItem}>₹{(item.price.toFixed(2))} each</span>
                  </div>
                </div>
              ))}
            </div>

           <div className={s.summaryCard}>
             <h2 className={s.summaryTitle}>Order Summary</h2>
             <div className={s.summaryBreakdown}>
                <div className={s.summaryRow}>
                    <span className={s.summaryLabel}>
                        Subtotal ({cart.items.length} items)
                    </span>
                    <span className={s.summaryValue}>₹{total.toFixed(2)}</span>
                </div>
                <div className={s.summaryRow}>
                    <span className={s.summaryLabel}>Shipping</span>
                    <span className={s.summaryShipping}>free</span>
                </div>
                
                <div className={s.summaryRow}>
                    <span className={s.summaryLabel}>Taxes</span>
                    <span className={s.summaryShipping}>Calculated at checkout</span>
                </div>

               
             </div>
             <div className={s.summaryTotalSection}>
                <div className={s.totalRow}>
                 <span className={s.summaryLabel}>Total</span>
                <span className={s.summaryShipping}>₹{total.toFixed(2)}</span>
                </div>
              </div>
             <button className={s.checkoutBtn}>
                CheckOut 
                <ArrowRight className={s.checkoutIcon}/>
             </button>

             <Link to='/books' className={s.continueBtn}>
             <BookOpen className={s.continueIcon}/>
             Continue Shopping
             </Link>
           </div>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
