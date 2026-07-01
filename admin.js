const ADMIN_PASSWORD = "streammaster2026"; // Puedes cambiar esta clave

let adminProducts = getProducts();

function login(){
  const pass = document.getElementById("passwordInput").value;
  const msg = document.getElementById("loginMsg");

  if(pass === ADMIN_PASSWORD){
    localStorage.setItem("streamMasterAdmin", "ok");
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    renderEditor();
  }else{
    msg.textContent = "Clave incorrecta.";
  }
}

function checkSession(){
  if(localStorage.getItem("streamMasterAdmin") === "ok"){
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    renderEditor();
  }
}

function renderEditor(){
  const editor = document.getElementById("editor");
  editor.innerHTML = "";

  adminProducts.forEach((p, i) => {
    const box = document.createElement("div");
    box.className = "product-edit";
    box.innerHTML = `
      <h3>${i+1}. ${p.name}</h3>
      <div class="edit-grid">
        <label><span>Nombre</span><input value="${escapeHTML(p.name)}" oninput="adminProducts[${i}].name=this.value"></label>
        <label><span>Categoría</span>
          <select onchange="adminProducts[${i}].category=this.value">
            ${categoryOptions(p.category)}
          </select>
        </label>
        <label><span>Precio</span><input value="${escapeHTML(p.price)}" oninput="adminProducts[${i}].price=this.value"></label>
        <label><span>Duración</span><input value="${escapeHTML(p.duration)}" oninput="adminProducts[${i}].duration=this.value"></label>
        <label><span>Activación</span><input value="${escapeHTML(p.activation)}" oninput="adminProducts[${i}].activation=this.value"></label>
        <label><span>Icono o emoji</span><input value="${escapeHTML(p.icon || "")}" oninput="adminProducts[${i}].icon=this.value"></label>
        <label><span>Imagen URL</span><input value="${escapeHTML(p.image || "")}" oninput="adminProducts[${i}].image=this.value" placeholder="https://..."></label>
        <label><span>Descripción</span><textarea rows="3" oninput="adminProducts[${i}].description=this.value">${escapeHTML(p.description)}</textarea></label>
      </div>
      <button class="remove" onclick="removeProduct(${i})">Eliminar producto</button>
    `;
    editor.appendChild(box);
  });
}

function categoryOptions(selected){
  const cats = ["Streaming","TV y Deportes","Diseño y Productividad","IA","Redes Sociales"];
  return cats.map(c => `<option value="${c}" ${c===selected?"selected":""}>${c}</option>`).join("");
}

function addProduct(){
  adminProducts.push({
    name:"Nuevo producto",
    category:"Streaming",
    price:"Consultar",
    duration:"30 días",
    activation:"Inmediata",
    image:"",
    icon:"⭐",
    description:"Descripción del producto."
  });
  renderEditor();
}

function removeProduct(index){
  if(confirm("¿Eliminar este producto?")){
    adminProducts.splice(index,1);
    renderEditor();
  }
}

function saveProducts(){
  setProducts(adminProducts);
  alert("Cambios guardados. Ya se verán en la tienda.");
}

function resetData(){
  if(confirm("¿Restaurar todos los productos iniciales?")){
    adminProducts = DEFAULT_PRODUCTS;
    setProducts(adminProducts);
    renderEditor();
  }
}

function exportData(){
  const data = JSON.stringify(adminProducts, null, 2);
  const blob = new Blob([data], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "stream-master-productos.json";
  a.click();
}

function escapeHTML(str){
  return String(str).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

checkSession();
