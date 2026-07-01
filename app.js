let products = loadProducts();

function loadProducts(){ return JSON.parse(localStorage.getItem("streamMasterProductsPRO")) || INITIAL_PRODUCTS; }
function saveProductsLocal(data){ localStorage.setItem("streamMasterProductsPRO", JSON.stringify(data)); }

function validImage(url){ return url && url.trim().startsWith("http") && !url.includes("google.com/imgres"); }
function productVisual(p){ return validImage(p.image) ? `<img src="${p.image}" alt="${p.name}">` : `<span>${p.icon || "⭐"}</span>`; }

function setup(){
  const visits = Number(localStorage.getItem("streamMasterVisits") || 0) + 1;
  localStorage.setItem("streamMasterVisits", visits);
  document.getElementById("visitCount").textContent = visits;
  document.getElementById("productCount").textContent = products.length;

  const cats = ["Todos", ...new Set(products.map(p => p.category || "Otros"))];
  document.getElementById("category").innerHTML = cats.map(c => `<option>${c}</option>`).join("");

  const msg = "Hola, quiero información sobre Stream Master.";
  document.getElementById("waHero").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  document.getElementById("floatWa").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  document.getElementById("chatWa").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  renderAll();
}

function card(p, i){
  return `<article class="card" onclick="openModal(${i})">
    ${p.offer ? '<div class="ribbon">OFERTA</div>' : ''}
    <div class="visual">${productVisual(p)}</div>
    <div class="card-body">
      <p class="cat">${p.category || "Otros"}</p>
      <h3>${p.name}</h3>
      <p class="price">${p.price}</p>
    </div>
  </article>`;
}

function renderAll(){
  products = loadProducts();
  const search = (document.getElementById("search")?.value || "").toLowerCase();
  const category = document.getElementById("category")?.value || "Todos";
  const filtered = products.filter(p => 
    (category === "Todos" || p.category === category) &&
    ((p.name || "").toLowerCase().includes(search) || (p.description || "").toLowerCase().includes(search))
  );

  document.getElementById("productsGrid").innerHTML = filtered.map(p => card(p, products.indexOf(p))).join("");
  document.getElementById("offersGrid").innerHTML = products.filter(p => p.offer).slice(0,10).map(p => card(p, products.indexOf(p))).join("");
  document.getElementById("bestGrid").innerHTML = [...products].sort((a,b)=>(b.sales||0)-(a.sales||0)).slice(0,10).map(p => card(p, products.indexOf(p))).join("");
  document.getElementById("featuredGrid").innerHTML = products.filter(p => p.featured).slice(0,10).map(p => card(p, products.indexOf(p))).join("");
  document.getElementById("galleryGrid").innerHTML = products.slice(0,18).map(p => `<div class="gallery-item">${productVisual(p)}</div>`).join("");
}

function openModal(i){
  const p = products[i];
  document.getElementById("modalVisual").innerHTML = productVisual(p);
  document.getElementById("modalCategory").textContent = p.category || "Otros";
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.description || "";
  document.getElementById("modalPrice").textContent = p.price || "Consultar";
  document.getElementById("modalDuration").textContent = p.duration || "Consultar";
  document.getElementById("modalActivation").textContent = p.activation || "Consultar";

  const msg = `Hola, deseo adquirir ${p.name}. Precio: ${p.price}. Duración: ${p.duration}. Activación: ${p.activation}.`;
  document.getElementById("modalWa").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal(){ document.getElementById("modal").classList.add("hidden"); }
function toggleChat(){ document.getElementById("chatBody").classList.toggle("hidden"); }

setup();
