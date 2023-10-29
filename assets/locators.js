class Locator {
  $filter = document.querySelectorAll(".storeifyapp_stores_tags_filter");
  constructor() {
    this.bindLocator();
  }

  bindLocator() {
    let $stores = document.querySelectorAll("[data-store-url]");

    $stores.forEach((store) => {
      store.addEventListener("click", (e) => {
        let url = e.target.getAttribute("data-store-url");
        if (url) window.location.href = url;
        else
          window.location.href =
            e.target.parentElement.getAttribute("data-store-url");
      });
    });
  }
  static filters() {
    this.$filter = document.querySelectorAll(".storeifyapp_stores_tags_filter");

    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("key");

    if (param == "ecommerce") {
      document.querySelector(".storeify-stl-header").style.display = "none";
    } else {
      document.querySelector("#stores-tags-filter").style.display = "none";
      document.querySelector(
        ".chose-search-slt [value='store']"
      ).style.display = "none";
      document.querySelector("#getbylocal").style.display = "none";
    }

    let $header = document.querySelector("#results-slt");
    let $tagElements = Locator.addTagsContainer($header);
    let exists = false;
    this.$filter.forEach((element) => {
      if (element.value.indexOf("category_") !== -1) {
        let $tagItem = document.createElement("div");
        $tagItem.classList = "item";
        $tagItem.innerHTML = `<span class="item-category-dealer" > ${element.value.replace(
          "category_",
          ""
        )} <input  name="category_dealer" type="checkbox"> <span class="checkmark"></span></span>`;
        $tagItem.addEventListener("click", (e) => {
          let $clickedInput = e.target.querySelector(
            ".item-category-dealer input"
          );
          if ($clickedInput) {
            $clickedInput.checked = !$clickedInput.checked;
          } else {
            e.checked = !e.checked;
          }

          element.parentElement.click();
          setTimeout(()=>{
            Locator.bindingDetail(param)
            Locator.bindingPopupInMap(param);
          },1000)
          
        });
        $tagElements.appendChild($tagItem);
        return;
      }
      if (param == element.value) {
        element.parentElement.click();
        exists = true;
      }
    });

    if (!exists) {
      let $app = document.querySelector("#storeifyapps-storelocator-shortcode");
      var alert = document.createElement("div");
      alert.className = "store-locator-empty";
      alert.innerText = `DEALEARS NOT FOUND`;
      $app.parentNode.insertBefore(alert, $app.nextSibling);
      $app.style.display = "none";
      document.querySelector(".lds-roller").style.display = "none";
    } else {
      setTimeout(() => {
        document
          .querySelector("#storeifyapps-storelocator-shortcode")
          .classList.add("active");
        if (param == "ecommerce") {
          document.querySelector(".map-tab-ggmap").style.display = "none";
          document.querySelector(".map-tab-result").style.width = "100%";
          let $slider = document.querySelector("#main-slider-storelocator");
          $slider.style.display = "grid";
          $slider.style.minHeight = "auto";
          $slider.style.height = "auto";
          $slider.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
          $slider
            .querySelectorAll(".item.thumbnail")
            .forEach(($item) => ($item.style.height = 400));
          document.querySelector("#sl-tab-list").click();
          document.querySelector(".map-tab-mobile-bnt").style.display = "none";
        }
        Locator.bindingDetail(param);
        document
          .querySelector("#reset-search")
          .addEventListener("click", (e) => {
            setTimeout(() => {
              let $selected = Array.from($filter).find((f) => f.value == param);
              $selected.parentElement.click();
            }, 1000);
          });
        Locator.bindingPopupInMap(param);
        document.querySelector(".lds-roller").style.display = "none";
      }, 500);
    }
  }
  static bindingDetail(param) {
    document
      .querySelectorAll("#results-slt .item.thumbnail")
      .forEach((element) => {
        element.addEventListener("click", () => {
          if (param === "ecommerce") {
            document.querySelector(".popup-locator-form").style.display =
              "flex";
          }
          else{
            if(document.querySelector('.contact-us-popup')){
              document.querySelector('.contact-us-popup').remove();
            }
                var link = document.createElement("div");
                link.className = "contact-us-popup";
                link.innerText = `Contact`;
                link.addEventListener("click", () => {
                  document.querySelector(".popup-locator-form").style.display =
                    "flex";
                });

                Locator.showForm(param);
                setTimeout(()=>document.querySelector(".table-store-marker").appendChild(link),1000)
              
            
          }
        });
      });
  }
 
  static bindingPopupInMap(locator_type) {
    
    document
      .querySelectorAll('.bootstrap-storeifyapps [role="button"]')
      .forEach((element) => {
      
          element.addEventListener("click", () => {
            if(document.querySelector('.contact-us-popup')){
              document.querySelector('.contact-us-popup').remove();
            }
            var link = document.createElement("div");
            link.className = "contact-us-popup";
            link.innerText = `Contact`;
            link.addEventListener("click", () => {
              document.querySelector(".popup-locator-form").style.display =
                "flex";
          
                Locator.showForm(locator_type)
            });
            document.querySelector(".table-store-marker").appendChild(link);
          });
        
    
      });
  }
  static showForm(param){
    switch (param) {
      case "installer":
         document.getElementById("general-contact-form").style.display = 'block'
        break;
        case "retailer":
          document.getElementById("general-contact-form").style.display = 'block'
         break;
         case "distributor":
          document.getElementById("dealer-locator-form").style.display = 'block'
      default:
        break;
    }
  }
  static addTagsContainer($header) {
    let tagElements = document.createElement("div");
    tagElements.className = "tags";
    $header.parentElement.prepend(tagElements);
    return tagElements;
  }
}
