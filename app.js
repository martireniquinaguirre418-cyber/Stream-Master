let products = getProducts();

const heroWhatsapp = document.getElementById("heroWhatsapp");
heroWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero información sobre los servicios de Stream Master.")}`;

function productVisual(product){
  if(product.image && product.image.trim() !== ""){
    return `<img src="${product.image}" alt="${product.name}">`;
  }
  return `<span>${product.icon || "⭐"}</span>`;
}

function renderProducts(){
  products = getProducts();
  const grid = document.getElementById("productsGrid");
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  grid.innerHTML = "";

  products
    .filter(p => category === "Todos" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
    .forEach((product, index) => {
      const card = document.createElement("article");
      card.className = "card";
      card.onclick = () => openModal(index);
      card.innerHTML = `
        <div class="card-img">${productVisual(product)}</div>
        <div class="card-body">
          <p class="category">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="price">${product.price}</p>
        </div>
      `;
      grid.appendChild(card);
    });
}

function openModal(index){
  const product = products[index];
  document.getElementById("modalImage").src = product.image && product.image.trim() !== "" 
    ? product.image 
    : "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='700' height='300'><rect width='100%' height='100%' fill='#101021'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='90'>${product.icon || "⭐"}</text></svg>`);
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalDesc").textContent = product.description;
  document.getElementById("modalPrice").textContent = product.price;
  document.getElementById("modalDuration").textContent = product.duration;
  document.getElementById("modalActivation").textContent = product.activation;

  const msg = `Hola, deseo adquirir ${product.name}. Precio: ${product.price}. Duración: ${product.duration}. Activación: ${product.activation}.`;
  document.getElementById("modalWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  document.getElementById("productModal").classList.remove("hidden");
}

function closeModal(){
  document.getElementById("productModal").classList.add("hidden");
}

renderProducts();
