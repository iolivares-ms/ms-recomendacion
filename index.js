ptypes = [{name:"Panamá",selected:false,segment:"Salud Individual"},
    {name:"Classic",selected:false,segment:"Salud Individual"},
    {name:"Premium",selected:false,segment:"Salud Individual"},
    {name:"Access",selected:false,segment:"Salud Individual"},
    {name:"Afinidad",selected:false,segment:"Salud Individual"},
    {name:"Urgencias Médicas",selected:false,segment:"Salud Individual"},
    {name:"Colectivo",selected:false,segment:"Salud Colectivo"},
    {name:"Perdida Total",selected:false,segment:"Automóvil"},
    {name:"Cobertura Amplia",selected:false,segment:"Automóvil"},
    {name:"Rcv",selected:false,segment:"Automóvil"},
    {name:"Ap",selected:false,segment:"Masivos"},
    {name:"Vida",selected:false,segment:"Masivos"},
    {name:"Funerario",selected:false,segment:"Masivos"},
    {name:"Pago Unico Cancer",selected:false,segment:"Masivos"},
    {name:"Renta",selected:false,segment:"Masivos"},
    {name:"Combinado",selected:false,segment:"Patrimoniales"},
    {name:"Incendio",selected:false,segment:"Patrimoniales"},
    {name:"Responsabilidad",selected:false,segment:"Patrimoniales"},
    {name:"Todo Riesgo",selected:false,segment:"Patrimoniales"},
    {name:"Riesgos Diversos",selected:false,segment:"Patrimoniales"},
    {name:"Fianza",selected:false,segment:"Patrimoniales"},
    {name:"Pyme",selected:false,segment:"Patrimoniales"},
    {name:"Otros",selected:false,segment:"Patrimoniales"},
    ]

isloading = false


function getRecomendation(apisend){
    fetch("https://6pphj52jjf.execute-api.us-east-2.amazonaws.com/Dev", {
        method: "POST",
        body: JSON.stringify(apisend),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => {
            updateLoader(false)

            const obj = JSON.parse(json.body);
            showResult(obj)
            console.log(obj)
        });
}

function showResult(response){
  points = response.basic_points
  productName = response.final_recomendation.product
  score = response.final_recomendation.score
  upgrade = response.final_recomendation.upgrade
  written = response.written_recomendation
  tendency = response.final_recomendation.detail[0]
  prima = response.final_recomendation.detail[0]
  cobertura = response.final_recomendation.detail[0]

  html = `<div class="flex-column">
                    <div class="flex-row">
                        <h2>Producto Recomendado: </h2>
                        <h2>${productName}</h2>
                    </div>
                    <div class="flex-row">
                        <h2>Puntaje: </h2>
                        <h2>${score}</h2>
                    </div>

                    

                    <div class="flex-row">
                        <p class="ai-text">${written.replaceAll(".","<br /><br />")}</p>
                    </div>
                </div>`
  const node = new DOMParser().parseFromString(html, "text/html").body
  .firstElementChild;
  document.getElementById("result-container").appendChild(node)

}

function loadProductsGrid(){

  for (let i = 0; i<ptypes.length; i++) {

     html = `<div class="grid-item">
                    <p>${ptypes[i].name}</p>
                    <input type="checkbox" class="checkbox" onclick="updateProducts(this)" id=${i}>
                </div>`

    const node = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
    document.getElementById("grid").appendChild(node)
  }

}

function updateProducts(checkbox){
  ptypes[checkbox.id].selected = checkbox.checked
  updateLoader(false)
}

function updateLoader(shouldActivate){
  if (shouldActivate &&(!isloading)){
    apisend = buildApiEvent()
    const myNode = document.getElementById("result-container");
    myNode.innerHTML = '';
    isloading=true
    html = `<div class="loader"></div>`
    const node = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
    document.getElementById("loader-container").appendChild(node)

    getRecomendation(apisend)


  } else if (!shouldActivate){
    const myNode = document.getElementById("loader-container");
    myNode.innerHTML = '';
    isloading=false
  }
}

function buildApiEvent(){
  parameters = {
    user_info: {
      demographic: getDemographic(),
      name: document.getElementById("nombre").value
    },
    products:[]
  }

  for (let i = 0; i<ptypes.length; i++) {
    if (ptypes[i].selected){
      product = {
        plan: ptypes[i].name,
        segmento: ptypes[i].segment,
        nro: 1,
        antigüedad: 1
      }
      parameters.products.push(product)
    }
  }
  return parameters
}

function getDemographic(){
  demographic = ''
  age = document.getElementById("edad").value
  gender = document.getElementById("gender").value

  demographic = gender+" "+String(age)+" años"
  return demographic
}

loadProductsGrid()
// hello()