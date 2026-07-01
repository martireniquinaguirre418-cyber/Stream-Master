let products = getProducts();

function getProducts(){ return JSON.parse(localStorage.getItem("streamMasterV3Products")) || INITIAL_PRODUCTS; }
function setProducts(data){ localStorage.setItem("streamMasterV3Products", JSON.stringify(data)); }
function imgOk(url){ return url && url.trim().startsWith("http") && !url.includes("google.com/imgres"); }
function visual(p){ return imgOk(p.image) ? `<img src="${p.image}" alt="${p.name}">` : `<span>${p.icon || "⭐"}</span>`; }

function init(){
  const visits = Number(localStorage.getItem("streamMasterV3Visits") || 0) + 1;
  localStorage.setItem("streamMasterV3Visits", visits);
  visitsEl.textContent = visits;
  productsTotal.textContent = products.length;
  offersTotal.textContent = products.filter(p=>p.offer).length;

  category.innerHTML = ["Todos", ...new Set(products.map(p=>p.category || "Otros"))].map(c=>`<option>${c}</option>`).join("");

  const msg = "Hola, quiero información sobre Stream Master.";
  waHero.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  floatWa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  chatWa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  renderAll();
}
const visitsEl = document.getElementById("visits");

function productCard(p, i){
  return `<article class="card" onclick="openModal(${i})">
    ${p.offer ? `<div class="ribbon">🎁 OFERTA</div>` : ""}
    <div class="visual">${visual(p)}</div>
    <div class="card-body">
      <p class="cat">${p.category || "Otros"}</p>
      <h3>${p.name}</h3>
      <div class="stars">${"★".repeat(Math.round(p.rating || 5))}</div>
      <p class="price">${p.price}</p>
      <p class="small">${p.badge || "Disponible"}</p>
    </div>
  </article>`;
}

function renderAll(){
  products = getProducts();
  const s = (search.value || "").toLowerCase();
  const c = category.value || "Todos";
  const filtered = products.filter(p => (c==="Todos" || p.category===c) && ((p.name||"").toLowerCase().includes(s) || (p.description||"").toLowerCase().includes(s)));

  grid.innerHTML = filtered.map(p => productCard(p, products.indexOf(p))).join("");
  offerSlider.innerHTML = products.filter(p=>p.offer).slice(0,12).map(p=>productCard(p, products.indexOf(p))).join("");
  bestSlider.innerHTML = [...products].sort((a,b)=>(b.sales||0)-(a.sales||0)).slice(0,12).map(p=>productCard(p, products.indexOf(p))).join("");
  featuredSlider.innerHTML = products.filter(p=>p.featured).slice(0,12).map(p=>productCard(p, products.indexOf(p))).join("");
  gallery.innerHTML = products.slice(0,24).map(p=>`<div class="gallery-item">${visual(p)}</div>`).join("");
}

function clearFilters(){ search.value=""; category.value="Todos"; renderAll(); }

function openModal(i){
  const p = products[i];
  modalVisual.innerHTML = visual(p);
  modalBadge.textContent = p.badge || "Disponible";
  modalCat.textContent = p.category || "Otros";
  modalName.textContent = p.name;
  modalDesc.textContent = p.description || "";
  modalPrice.textContent = p.price || "Consultar";
  modalDuration.textContent = p.duration || "Consultar";
  modalActivation.textContent = p.activation || "Consultar";
  modalWa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, deseo adquirir ${p.name}. Precio: ${p.price}. Duración: ${p.duration}. Activación: ${p.activation}.`)}`;
  modal.classList.remove("hidden");
}
function closeModal(){ modal.classList.add("hidden"); }
function toggleChat(){ chatBody.classList.toggle("hidden"); }

init();
