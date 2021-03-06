fetch(
  "https://kapil-jindal-store.myshopify.com/products/apple-iphone-11-pro.json"
)
  .then(function (response) {
    if (response.ok) {
      return response.json(); // convert it to a pure JavaScript object
    }
    return Promise.reject(response);
  })
  .then(function (data) {
    //Process Your data
    showProduct(data);
  })

  .catch(function (error) {
    console.warn("something went wrong", error);
  });

let AppleProducts;
function showProduct(productData) {
  AppleProducts = productData;
  var variant_images = AppleProducts.product.images;
  var array_getvalues = {};
  var variant_id = [];
  var common_images = [];
  var all_iamges = [];
  variant_images.forEach(imageValues);
  function imageValues(value) {
    all_iamges.push(value.src);
    if (value.variant_ids > 0) {
      variant_id = value["variant_ids"];
    }
    if (variant_id.length == 0) {
      common_images.push(value.src);
    }
    variant_id.forEach((id) => {
      if (typeof array_getvalues[id] == "undefined") {
        array_getvalues[id] = [value.src];
      } else {
        array_getvalues[id].push(value.src);
      }
    });
  }
  console.log(array_getvalues, all_iamges);

  var option = Object.keys(array_getvalues);

  var select = document.querySelector("#showsOptions");
  option.forEach(add_option);

  function add_option(ids) {
    var optionTag = document.createElement("option");
    optionTag.setAttribute("value", ids);
    optionTag.innerHTML = ids;
    select.appendChild(optionTag);
    document.querySelector("#showsOptions");
    //   document.querySelector("#showsoption").dispatchEvent(new Evenet("change"));
    select.addEventListener("change", get_imagesrc);
  }
  function get_imagesrc() {
    selectdKey = select.value;
    var show_image = array_getvalues[selectdKey];
    var select_image = document.getElementById("gallery_images");

    document.getElementById("gallery_images").childNodes.forEach((div) => {
      div.remove();
    });

     show_image.forEach(image_src);
    function image_src(src) {
        console.log(src);
      var image_container = document.createElement("div");
      var img_tag = document.createElement("img");
      img_tag.setAttribute("src", src);

      image_container.appendChild(img_tag);
      select_image.appendChild(image_container);
    }
  }
}
