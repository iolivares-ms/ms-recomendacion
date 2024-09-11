ptypes = [{name:"SI | Panamá",pp:50},
    {name:"SI | Classic",pp:40},
    {name:"SI | Premium",pp:30},
    {name:"SI | Access",pp:20},
    {name:"SI | Afinidad",pp:10},
    {name:"SI | Urgencias Médicas",pp:5},
    {name:"SC | Colectivo",pp:20},
    {name:"AU | Perdida Total",pp:30},
    {name:"AU | Cobertura Amplia",pp:20},
    {name:"AU | Rcv",pp:10},
    {name:"MA | Ap",pp:20},
    {name:"MA | Vida",pp:30},
    {name:"MA | Funerario",pp:10},
    {name:"MA | Pago Unico Cancer",pp:10},
    {name:"MA | Renta",pp:30},
    {name:"PA | Combinado",pp:50},
    {name:"PA | Incendio",pp:20},
    {name:"PA | Responsabilidad",pp:10},
    {name:"PA | Todo Riesgo",pp:50},
    {name:"PA | Riesgos Diversos",pp:30},
    {name:"PA | Fianza",pp:20},
    {name:"PA | Pyme",pp:10},
    {name:"PA | Otros",pp:10},
    ]


function hello(){
    console.log("Hola mundo")
    fetch("https://6pphj52jjf.execute-api.us-east-2.amazonaws.com/Dev", {
        method: "POST",
        body: JSON.stringify({
          user_info: {
    demographic: "Hombre 25 años",
    name: "Isaac Olivares"
  },
  products: [
    {
      plan: "Vida",
      segmento: "Masivos",
      nro: 1,
      antigüedad: 1
    },
    {
      plan: "Funerario",
      segmento: "Masivos",
      nro: 1,
      antigüedad: 1
    }
  ]
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => {
        

            const obj = JSON.parse(json.body);
            console.log(obj)
        });
}

hello()