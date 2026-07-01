const PASSWORD = "streammaster2026";
let products = JSON.parse(localStorage.getItem("streamMasterProductsPRO")) || INITIAL_PRODUCTS;

function login(){
  if(document.getElementById("pass").value === PASSWORD){
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    renderEditor();
  } else {
    document.getElementById("msg").textContent = "Clave incorrecta.";
  }
}

function esc(s){ return String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }

function renderEditor(){
  const editor = document.getElementById("editor");
  editor.innerHTML = "";
  products.forEach((p,i)=>{
    const div = document.createElement("div");
    div.className = "edit";
    div.innerHTML = `
      <h3>${i+1}. ${esc(p.name)}</h3>
      <div class="edit-grid">
        <label><span>Nombre</span><input value="${esc(p.name)}" oninput="products[${i}].name=this.value"></label>
        <label><span>Categoría</span><input value="${esc(p.category)}" oninput="products[${i}].category=this.value"></label>
        <label><span>Precio</span><input value="${esc(p.price)}" oninput="products[${i}].price=this.value"></label>
        <label><span>Duración</span><input value="${esc(p.duration)}" oninput="products[${i}].duration=this.value"></label>
        <label><span>Activación</span><input value="${esc(p.activation)}" oninput="products[${i}].activation=this.value"></label>
        <label><span>Icono</span><input value="${esc(p.icon)}" oninput="products[${i}].icon=this.value"></label>
        <label><span>Imagen URL</span><input value="${esc(p.image)}" oninput="products[${i}].image=this.value"></label>
        <label><span>Ventas / popularidad</span><input type="number" value="${esc(p.sales || 0)}" oninput="products[${i}].sales=Number(this.value)"></label>
        <label><span>Destacado</span><select onchange="products[${i}].featured=this.value==='true'"><option value="true" ${p.featured?'selected':''}>Sí</option><option value="false" ${!p.featured?'selected':''}>No</option></select></label>
        <label><span>Oferta</span><select onchange="products[${i}].offer=this.value==='true'"><option value="true" ${p.offer?'selected':''}>Sí</option><option value="false" ${!p.offer?'selected':''}>No</option></select></label>
        <label><span>Descripción</span><textarea rows="5" oninput="products[${i}].description=this.value">${esc(p.description)}</textarea></label>
      </div>
      <button class="btn red" onclick="removeProduct(${i})">Eliminar producto</button>
    `;
    editor.appendChild(div);
  });
}

function addProduct(){
  products.push({name:"Nuevo producto",category:"Streaming",price:"Consultar",duration:"30 días",activation:"Inmediata",image:"",icon:"⭐",description:"Descripción del producto.",featured:false,offer:false,sales:0});
  renderEditor();
}

function removeProduct(i){
  if(confirm("¿Eliminar este producto?")){
    products.splice(i,1);
    renderEditor();
  }
}

function saveLocal(){
  localStorage.setItem("streamMasterProductsPRO", JSON.stringify(products));
  alert("Guardado en este navegador. Para publicarlo, descarga data.js y súbelo a GitHub.");
}

function resetAll(){
  if(confirm("¿Restaurar datos iniciales?")){
    products = INITIAL_PRODUCTS;
    localStorage.removeItem("streamMasterProductsPRO");
    renderEditor();
  }
}

function downloadData(){
  const content = "const WHATSAPP_NUMBER = '51992001097';\nconst INITIAL_PRODUCTS = " + JSON.stringify(products, null, 2) + ";\n";
  const blob = new Blob([content], {type:"text/javascript"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.js";
  a.click();
}
