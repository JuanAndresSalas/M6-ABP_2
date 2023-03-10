//Configuración Básica
const express = require("express");
const app = express();

//Levantar servidor
app.listen(3000, function(){
    console.log("Servido en puerto 3000")
})

//carpeta pública
app.use(express.static("public"))

//Configuracion HBS
app.set("view engine","hbs")


//Rutas 
let fechaNac;
app.get("/astrologia-china",(req,res) =>{
    fechaNac = req.query.chino
    let anio = parseInt(fechaNac.split("-")[0]) //Obtener solo año
    let animal = calcularAnimal(anio)[0]
    let desc= calcularAnimal(anio)[1]
    
    res.render("astrologia-china",{
        fechaNac: fechaNac,
        signo: animal,
        caracteristicas: desc
       
     })
})

app.get("/zodiaco-occidental",(req,res) =>{
    fechaNac = req.query.zodiaco
    let signoZodiaco = calcularZodiaco(fechaNac)[0]
    let desc = calcularZodiaco(fechaNac)[1]
    res.render("zodiaco",{
        fechaNac: fechaNac,
        signo: signoZodiaco,
        caracteristicas:desc
       
     })
})

//Volver al inicio al presionar "calcular otra fecha"
app.get('/index', (req, res) => {
    res.render("index")
});

//Mostrar si hay error
app.all('*', (req , res) => {
    res.status(404).send("<h1>Pagina no encontrada</h1>")
    
})

//Funcion calcular animal astrología china
function calcularAnimal(anio) {
    const animales = ["Mono", "Gallo", "Perro", "Cerdo", "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra"];
    const descripcion = ["Ingenioso, divertido, astuto, curioso, pero también engañoso y egoísta.",
                        "Confiado, valiente, honesto, trabajador, pero también vanidoso y autoritario.",
                        "Leal, honesto, protector, trabajador, pero también terco y posesivo.",
                        "Generoso, amable, compasivo, tranquilo, pero también indulgente y perezoso.",
                        "Inteligente, ambicioso, trabajador, perspicaz, astuto, pero también egoísta y tacaño.",
                        "Paciente, trabajador, confiable, honesto, leal, pero también terco y conservador",
                        "Valiente, decidido, apasionado, aventurero, pero también impulsivo e imprudente.",
                        "Amable, modesto, sensible, reflexivo, pero también indeciso y reservado.",
                        "Poderoso, enérgico, ambicioso, carismático, pero también arrogante y autoritario.",
                        "Inteligente, sabio, intuitivo, misterioso, pero también astuto y vengativo.",
                        "Libre, enérgico, optimista, aventurero, pero también impaciente y superficial.",
                        "Creativa, artística, amable, sensible, pero también indecisa y tímida."]
    let cicloAnimales = anio % 12;
    return [animales[cicloAnimales],descripcion[cicloAnimales]];
}

//Funcion calcular zodiaco occidental
function calcularZodiaco(fechaNacimiento){
    let fechaNac = new Date(fechaNacimiento)
    let dia = fechaNac.getDate();
    let mes = fechaNac.getMonth() + 1;

    if((dia>=21&&mes==3)||(dia<=20&&mes==4)){
        return ['Aries',"Valiente, dinámico, ambicioso, impulsivo, pero también egoísta y agresivo."];
    }
    if((dia>=24&&mes==9)||(dia<=23&&mes==10)){
        return ['Libra',"Equilibrado, justo, amable, diplomático, pero también indeciso y superficial."];
    }
    if((dia>=21&&mes==4)||(dia<=21&&mes==5)){
        return ['Tauro',"Paciente, determinado, confiable, leal, pero también terco y posesivo."];
    } 
    if((dia>=24&&mes==10)||(dia<=22&&mes==11)){
        return ['Escorpio'," Apasionado, intenso, determinado, misterioso, pero también celoso y resentido."];
    }  
    if((dia>=22&&mes==5)||(dia<=21&&mes==6)){
        return ['Géminis',"Versátil, curioso, inteligente, comunicativo, pero también superficial y cambiante."];
    } 
    if((dia>=23&&mes==11)||(dia<=21&&mes==12)){
        return ['Sagitario',"Aventurero, optimista, entusiasta, filosófico, pero también imprudente y exagerado."];
    } 
    if((dia>=21&&mes==6)||(dia<=23&&mes==7)){
        return ['Cáncer',"Cariñoso, protector, emotivo, imaginativo, pero también manipulador y sensible."];
    } 
    if((dia>=22&&mes==12)||(dia<=20&&mes==1)){
        return ['Capricornio',"Ambicioso, trabajador, responsable, serio, pero también frío y pesimista"];
    } 
    if((dia>=24&&mes==7)||(dia<=23&&mes==8)){
        return ['Leo',"Generoso, creativo, entusiasta, carismático, pero también arrogante y egocéntrico."];
    }
    if((dia>=21&&mes==1)||(dia<=19&&mes==2)){
        return ['Acuario',"Original, independiente, humanitario, idealista, pero también excéntrico y rebelde."];
    }
    if((dia>=24&&mes==8)||(dia<=23&&mes==9)){
        return ['Virgo',"Práctico, ordenado, analítico, inteligente, pero también crítico y reservado."];
    }
    if((dia>=20&&mes==2)||(dia<=20&&mes==3)){
        return ['Piscis',"Sensible, compasivo, imaginativo, místico, pero también indeciso y escapista."];
    }      
} 