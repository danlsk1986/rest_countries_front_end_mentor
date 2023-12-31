// Variables
const url = `https://restcountries.com/v3.1/region/Europe`;
const dropdown = document.querySelector("#dropdown");
const paginador = document.querySelector('.paginador');
let currentPage = 1;
const resultadosPorPagina = 8;
const lightOrDark = document.querySelector('#lightOrDark');
const hoja_de_estilos = document.querySelector('#hoja_de_estilos');
const moon = document.querySelector('#moon');

// ...

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    showAllCountries(url);
})

lightOrDark.addEventListener('click', toogleThemes);
dropdown.addEventListener("click", toggleMenu);
options.addEventListener('click', selectRegion);
search.addEventListener('keydown', getInputValue);
paginador.addEventListener('click', cambiarPagina);

// ...

async function showAllCountries(url) {
    const response = await fetch(url);
    const data = await response.json();

    // Almacena todos los resultados
    variableGlobal = data;

    // Renderiza los países de la página actual
    renderizarPagina(currentPage);
    
    // Actualiza el paginador
    actualizarPaginador();
}

async function showCountry(url) {
    const response = await fetch(url);
    const data = await response.json();

    // Almacena todos los resultados
    variableGlobal = data;

    // Renderiza los países de la página actual
    renderizarPais();
}

function toogleThemes(){    
    if(hoja_de_estilos.href.includes('light')){
        hoja_de_estilos.href = 'css/dark_style.css';
        moon.classList.add('fa-solid');
        moon.classList.remove('fa-regular');        
    }
    else {
        hoja_de_estilos.href = 'css/light_style.css';
        moon.classList.add('fa-regular');
        moon.classList.remove('fa-solid');        
    }    
}

function renderizarPagina(page) {
    const inicio = (page - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    
    for (let index = inicio; index < fin && index < variableGlobal.length; index++) {
        const imgAPI = variableGlobal[index].flags.png;
        const nameAPI = variableGlobal[index].name.common;
        const populationAPI = variableGlobal[index].population;
        const regionAPI = variableGlobal[index].region;
        const capitalAPI = variableGlobal[index].capital[0];

        const country = document.querySelectorAll('.country')[index - inicio];
        const imgSrc = country.querySelector('.country_flag img');
        const names = country.querySelector('.country_name');
        const population = country.querySelector('.population');
        const region = country.querySelector('.region');
        const capital = country.querySelector('.capital');

        imgSrc.setAttribute('src', imgAPI);
        names.innerText = nameAPI;
        population.innerText = populationAPI;
        region.innerText = regionAPI;
        capital.innerText = capitalAPI;
    }
}

function renderizarPais() {        
    for (let index in variableGlobal) {
        const imgAPI = variableGlobal[index].flags.png;
        const nativeNameAPI = variableGlobal[index].altSpellings[1];
        const nameAPI = variableGlobal[index].name.common;
        const populationAPI = variableGlobal[index].population;
        const regionAPI = variableGlobal[index].region;
        const subRegionAPI = variableGlobal[index].subregion;
        const capitalAPI = variableGlobal[index].capital[0];

        const tldAPI = variableGlobal[index].tld[0];
        const currenciesAPI = variableGlobal[index].currencies;
        const languagesAPI = variableGlobal[index].languages;
        const borderAPI = variableGlobal[index].borders;

        
              
        const imgSrc = document.querySelector('.detail_country_flag img');
        const name = document.querySelector('.detail_country_name');
        const detailName = document.querySelector('.detail_native_name');
        const population = document.querySelector('.detail_population');
        const region = document.querySelector('.detail_region');
        const subregion = document.querySelector('.detail_subregion');
        const capital = document.querySelector('.detail_capital');

        const tld = document.querySelector('.top_level_domain');
        const currencies = document.querySelector('.currencies');
        const languages = document.querySelector('.languages');
        const country_list = document.querySelector('.country_list');

        imgSrc.setAttribute('src', imgAPI);
        name.innerText = nameAPI;
        detailName.innerText = nativeNameAPI;
        population.innerText = populationAPI;
        region.innerText = regionAPI;
        subregion.innerText = subRegionAPI;
        capital.innerText = capitalAPI;

        tld.innerText = tldAPI;
        currencies.innerText = currenciesAPI[Object.keys(currenciesAPI)[0]].name;
     
        let indice = 0;
        let totalIteraciones = Object.keys(languagesAPI).length; // Obtener el total de claves en el objeto

        for (let codigo in languagesAPI) {             
            languages.innerText += indice < totalIteraciones - 1 ? 
            `${languagesAPI[codigo]}, ` : `${languagesAPI[codigo]}`;
            indice++;
        }


        let country_index = 0;
        let totalPaises = Object.keys(borderAPI).length;

        for (let index in borderAPI) {             
            // country_list.innerText += country_index < totalPaises - 1 ? 
            // `${borderAPI[index]}, ` : `${borderAPI[index]}`;
            // country_index++;

             // Create a new paragraph element
            let box = document.createElement("span");

            // Set the text content of the paragraph
            box.textContent = borderAPI[index];

            // Append the paragraph to the body of the document
            country_list.appendChild(box);


            console.log(borderAPI[index]);
        }

        


        
    }
}

function actualizarPaginador() {
    const totalPaginas = Math.ceil(variableGlobal.length / resultadosPorPagina);
    paginador.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        li.classList.add('pagina');
        li.dataset.pagina = i;
        paginador.appendChild(li);
    }

    // Resalta la página actual en el paginador
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => {
        pagina.classList.remove('pagina-actual');
        if (parseInt(pagina.textContent) === currentPage) {
            pagina.classList.add('pagina-actual');
        }
    });
}

function cambiarPagina(e) {
    if (e.target.classList.contains('pagina')) {
        const nuevaPagina = parseInt(e.target.textContent);
        if (nuevaPagina !== currentPage) {
            currentPage = nuevaPagina;
            renderizarPagina(currentPage);
            actualizarPaginador();
        }
    }
}

function toggleMenu(){   
    if(options.style.display == 'none'){
        options.style.display = 'block';
    } 
    else {
        options.style.display = 'none';
    }    
}

function selectRegion(e){
    //Avoid anyu weird issue
    const region = e.target.innerText;
    if(region.length < 10){        
        showAllCountries(`https://restcountries.com/v3.1/region/${region}`)
    }     
}

function getInputValue(e){
    if(e.keyCode == 13){
        try {
            const country = search.value;            
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.container_details').style = 'display: flex; flex-direction: column; justify-content:space-between; margin: 0; gap: 1rem; padding: 4rem';
            showCountry(`https://restcountries.com/v3.1/name/${country}`);

        } catch (error) {
            console.log('Hubo un error intenta de nuevo..');
        }        
        
        // Clean the input after the search
        setTimeout(() => {
            e.target.value = '';
        }, 1000)
    }    
}