(function(){
  const products = [
    {id:1, title:'Cardamom', price:200, images:['cardamom.jpg'], description:'Aromatic cardamom pods.', sku:'SP001', tags:['trending'], rating:4.5, stock:20, variants:[]},
    {id:2, title:'Turmeric', price:150, images:['turmeric_powder.jpg'], description:'Golden turmeric powder.', sku:'SP002', tags:['bestseller'], rating:4.8, stock:30, variants:[]},
    {id:3, title:'Black Pepper', price:180, images:['black_pepper.jpg'], description:'Strong black pepper.', sku:'SP003', tags:['new'], rating:4.6, stock:25, variants:[]}
  ];
  let cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const cartCount=document.getElementById('cart-count');
  const cartPanel=document.getElementById('cart-panel');
  const cartItemsDiv=document.getElementById('cart-items');
  const cartSubtotal=document.getElementById('cart-subtotal');

  function renderProducts(){
    const trending=document.getElementById('trending');
    trending.innerHTML='<h2>Trending</h2><div class="grid"></div>';
    const grid=trending.querySelector('.grid');
    grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(auto-fit,minmax(150px,1fr))'; grid.style.gap='1rem';
    products.forEach(p=>{
      const card=document.createElement('div');
      card.className='product-card';
      card.innerHTML=`<img src="${p.images[0]}" alt="${p.title}" loading="lazy" style="width:100%"> <h3>${p.title}</h3> <p>₹${p.price}</p> <button data-id="${p.id}" class="add-cart">Add to Cart</button>`;
      grid.appendChild(card);
    });
  }

  function updateCart(){
    cartCount.textContent=cart.reduce((a,c)=>a+c.qty,0);
    cartItemsDiv.innerHTML='';
    let subtotal=0;
    cart.forEach(item=>{
      subtotal+=item.qty*item.price;
      const div=document.createElement('div');
      div.textContent=`${item.qty}x ${item.title} (₹${item.price})`;
      cartItemsDiv.appendChild(div);
    });
    cartSubtotal.textContent='Subtotal: ₹'+subtotal;
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  document.addEventListener('click',e=>{
    if(e.target.classList.contains('add-cart')){
      const id=parseInt(e.target.dataset.id);
      const prod=products.find(p=>p.id===id);
      const existing=cart.find(c=>c.id===id);
      if(existing){existing.qty++} else {cart.push({...prod, qty:1})}
      updateCart();
    }
  });
  document.getElementById('cart-toggle').addEventListener('click',()=>{cartPanel.classList.add('open')});
  document.getElementById('close-cart').addEventListener('click',()=>{cartPanel.classList.remove('open')});
  document.getElementById('place-order').addEventListener('click',()=>{
    let msg='Hello, I want to order from BS (GitHub repo: bs). Items: ';
    cart.forEach(i=>{msg+=`${i.qty}x ${i.title} (₹${i.price}), `;});
    let total=cart.reduce((a,c)=>a+c.price*c.qty,0);
    msg+=`Total: ₹${total}. Shipping to: [NAME, ADDRESS, PHONE].`;
    const url='https://wa.me/916001236774?text='+encodeURIComponent(msg);
    window.open(url,'_blank');
  });

  renderProducts();
  updateCart();
})();