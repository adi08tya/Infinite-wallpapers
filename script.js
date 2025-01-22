const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let count = 5;
let apiUrl = `https://picsum.photos/v2/list?page=2&limit=${count}`
let photosArray =[];
let ready = false;
let imagesloaded = 0;
let totalImages=0;
// check if all images were loaded
function imageLoaded(){ 
    imagesloaded++;
    if(imagesloaded===totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://picsum.photos/v2/list?page=2&limit=${count}`;
        // console.log( "ready");    
    }
}
// helper function to set attribute
function setAttribute(element,attributes){
    for(const key in attributes){
       element.setAttribute(key,attributes[key]);
    }   
}

function displayphotos(){ 
    totalImages = photosArray.length;
    // console.log("total "+ totalImages);  
  photosArray.forEach((photo)=>{
    //   create<a> to link src 
    const item = document.createElement('a');
    // item.setAttribute('href',photo.source_url);
    // item.setAttribute('target','_blank');
    setAttribute(item,{
        href:photo.url,
        target:'_blank'
    })
    // create image for photo
    const img = document.createElement('img')
    // img.setAttribute('src',photo.url)
    // img.setAttribute('alt', photo.tags.join(','))
    // img.setAttribute('title', photo.tags.join(','))
    setAttribute(img,{
        src:photo.download_url,
        alt:photo.author,
        title:photo.author
    })
    //   const btn = document.createElement('button')
    //   btn.innerHTML='<i class="fa-solid fa-file-arrow-down"></i>';
    // check when each is finished loading
    img.addEventListener('load', imageLoaded)
      //    put image inside anchor then put both inside image container element
     item.appendChild(img);
     imageContainer.appendChild(item);
  })
}
async function getPhotos() {
    // console.log(apiUrl);
    imagesloaded=0;
    try{
     const response =await fetch(apiUrl);
     photosArray= await response.json();
     console.log(photosArray);
     
     displayphotos();  
    }catch(error){

    }
} 
// check if scrolling near bottom of page , Load more photos
window.addEventListener('scroll',()=>{
    // console.log("scrolled");
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
    }
})


// on load
getPhotos();