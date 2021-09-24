// fetch('https://kapil-jindal-store.myshopify.com/products/apple-iphone-11-pro.json')
//     .then(response => response.json())
//     .then(data => console.log(data));

//     const main = async (numb) => {
//         let data = await fetch(`https://kapil-jindal-store.myshopify.com/products/apple-iphone-11-pro.json`);
//         let imageData = await data.json();
//         showProduct = imageData.results;
//         createImage(showProduct);
//       };



fetch('https://kapil-jindal-store.myshopify.com/products/apple-iphone-11-pro.json')
.then(function(response){
     if(response.ok){
    return response.json();// convert it to a pure JavaScript object
}
return Promise.reject(response);
})
.then(function(data){
     //Process Your data  
     showProduct(data);

     })
 
.catch(function(error) {
    console.warn("something went wrong", error);
  });


  let AppleProducts;
  function showProduct (productData){
      AppleProducts = productData;
      var variant_images = AppleProducts.product.images;
      var array_getvalues = {};
      var variant_id = [];
      var common_images = [];
      var all_iamges = [];
      variant_images.forEach(imageValues);
      function imageValues(value){
          all_iamges.push(value.src);
          if(value.variant_ids>0){
              variant_id = value["variant_ids"];

          }
          if(variant_id.length == 0){
              common_images.push(value.src);
          }
          variant_id.forEach((id) =>{
              if (typeof array_getvalues[id] == 'undefined'){
                  array_getvalues[id] = [value.src];

              }else{
                  array_getvalues[id].push(value.src);
              }
          });

      }
      console.log(array_getvalues, all_iamges);
      
      var option = Object.keys(array_getvalues);


      var select = document.querySelector("#showsOptions");
      option.forEach(add_option);


      function add_option(ids){
          var optionTag =  document.createElement("option");
          optionTag.setAttribute("value",ids);
          optionTag.innerHTML  = ids;
          select.appendChild(optionTag);
        //   document.querySelector("#showsOptions");
        //   document.querySelector("#showsoption").dispatchEvent(new Evenet("change"));
          select.addEventListener("change" , get_imagesrc)
      }
    function get_imagesrc() {
        selectdKey = select.value;
        var show_image =array_getvalues[selectdKey];
        var select_image = document.getElementById("gallery_images");
        select_image.querySelectorall("#gallery_images").forEach((div) => {
          div.remove();
        

        
      });

      show_image.forEach(image_src);
       function image_src(src){
           var image_container = document.createElement("div");
           var img_tag = document.createElement("img");
           img_tag.setAttribute("src" , src);
           image_container.appendChild(img_tag);
           select_image.appendChild(image_container);
       }
      }


    

  }




    // var all_image = {};
    // var commen_image  =[];
    // var Variant_image =[];
    
    // function create_commen_image() {
    //   finalImage.forEach((image, index) => {
    //     commen_image[index] = image.product_type;
    //   });
    //   return commen_image;
    // }
    
    // function get_image(variant_image, commen_image) {
    //     console.log(variant_image);
    //     console.log(commen_image);
    //     image = 0;
    //     for (let key in variant_image) {
    //       if (variant_image[key] == commen_image[key]) {
    //         get_image++;
    //       }
    //     }
    //     return iamge;
    //   }
      