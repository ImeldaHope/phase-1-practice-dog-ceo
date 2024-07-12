// console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";


document.addEventListener('DOMContentLoaded', () => {
    imageFetch();
    breedFetch();    
})

function imageFetch(){
    fetch(imgUrl)
    .then(res => res.json())
    .then(data =>{
        data.message.forEach( imageUrl => {
            const li = document.createElement('li');
            li.style.listStyle = 'none';                       
            const img = document.createElement('img');
            img.style.width = '300px';
            img.style.height = '300px';
            img.src = imageUrl;
            li.appendChild(img);
            const container = document.querySelector('#dog-image-container');
            container.style.display = 'flex';
            container.appendChild(li);
        })        
    })
}

function breedFetch(){
    const breedContainer = document.querySelector('#dog-breeds');

    fetch(breedUrl)
    .then(res => res.json())
    .then((breed) => {
        Object.keys(breed.message).map((breedName) => {
            const list = document.createElement('li');
            list.textContent =`${breedName} `;
            list.style.listStyle = 'none'; 
            list.style.padding ='10px';
            list.style.margin ='5px';
            list.style.backgroundColor = '#d3d3d3';
            list.style.borderRadius = '30px';            
            list.style.boxSizing = 'border-box';             
            list.style.textAlign = 'center';
            list.addEventListener('click', () => {
                if(list.style.color === ''){
                    list.style.color = '#ff0000';
                }else {
                    list.style.color ='';
                }                
            })           
            
            breedContainer.style.display = 'grid';
            breedContainer.style.gridTemplateColumns = 'repeat(8, 1fr)'; 
            breedContainer.style.gridGap = '10px';
            breedContainer.style.width = '20%';
            breedContainer.appendChild(list);
        }) 

        const filters = document.querySelector('#breed-dropdown');
                        
        filters.addEventListener('change', () => {
            const selectedLetter = filters.value.toLowerCase();
            const dogs = breedContainer.querySelectorAll('li');

            dogs.forEach(dog => {
                const breedName = dog.textContent.toLowerCase();
                
                if(selectedLetter === '' || breedName.startsWith(selectedLetter)){
                    dog.style.display = 'block';
                } else {
                    dog.style.display = 'none';
                }
            })
        })        
    })
}
