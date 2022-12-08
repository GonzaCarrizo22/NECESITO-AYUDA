function getCharacters(done) {
    const results = fetch('https://rickandmortyapi.com/api/character');

    results
        .then(Response => Response.json())
        .then(data => {
            done(data)
        });
    
}

getCharacters(data => {

    data.results.forEach(personaje => {

        const article = document.createRange().createContextualFragment(/*html*/`
         <article>

            <div class="image-container">
                <img src="${personaje.image}" alt="Personaje">
            </div>

            <h2>${personaje.name}</h2>
            <span>${personaje.status}</span>
            
        </article>

        `);

        const main = document.querySelector("main");

        main.append(article)
        });

});    

// funcion para saber el contenido de un objeto o un string
function isEmpty(node){
    if(typeof node === 'object'){
        return !node.hasChildNodes();
    }else{
        return node === "";
    }
}
// funcion para vaciar el contenedor donde se muestran los personajes
function removeCharactersOfContainer(){
    const main = document.querySelector("main");
    while(main.hasChildNodes()){
        main.removeChild(main.firstChild);
    }
}
// se hace sincrona debido a que la api no es sincrona
async function getCharacterByName(){
    const characterName = document.getElementById("formulario").value;
    const main = document.querySelector("main");
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay)); // permite soncronizar
    getCharacters(data => {
        data.results.forEach(personaje => {
            const name = personaje.name.toLowerCase();
            if(name.includes(characterName.toLowerCase())){
                const article = document.createRange().createContextualFragment(/*html*/`
                    <article>

                        <div class="image-container">
                            <img src="${personaje.image}" alt="Personaje">
                        </div>

                        <h2>${personaje.name}</h2>
                        <span>${personaje.status}</span>
                        
                    </article>

                `);
                main.append(article);
            }
        });
    });
    await sleep(100); // sincronizamos 
    // control de no conincidencias
    if(isEmpty(main)){
        const h1 = document.createElement("h1");
        h1.innerHTML = "No se encontraron personajes.";
        main.append(h1);
    }
    
}
// evento del boton buscar
document.getElementById("boton").addEventListener("click",function(){
    if(!isEmpty(document.getElementById("formulario").value)){
        removeCharactersOfContainer();
        getCharacterByName();
    }
});

        