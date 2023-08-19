import items from "./items.json";
import formatCurrency from "./util/formatCurrency";
import { addItemToCart } from "./shoppingCart";
import addGlobalEventListener from "./util/addGlobalEventListener";

const storeItemTemplate = document.querySelector("#store-item-template");
const catalogue = document.querySelector("[data-store-container]");
const IMAGE_URL = "https://dummyimage.com/420x260";

export function setupStore() {
  if (catalogue == null) return;
  addGlobalEventListener("click", "[data-add-to-cart-button]", (e) => {
    const idOfItem = e.target.closest("[data-store-item]").dataset.ItemID;
    addItemToCart(parseInt(idOfItem));
  });
  items.forEach(renderStoreItem);
}

//populating the store item with the items.json database file
//1.created a template for each item of the store with all place holder needed a store item
function renderStoreItem(item) {
  //acessing the html inside template created
  const storeItem = storeItemTemplate.content.cloneNode(true);
  //selecting the container of the item and adding an ID to it
  const ContainerID = storeItem.querySelector("[data-store-item]");
  ContainerID.dataset.ItemID = item.id;
  //selecting name,category html data elements to relate to the item.json file
  const name = storeItem.querySelector("[data-name]");
  name.innerHTML = item.name;
  const category = storeItem.querySelector("[data-category]");
  category.innerHTML = item.category;
  //selecting image html, setting the src="" of the image item.imagecolor from item.json object and IMAGE_URL as pre saving from html url
  const image = storeItem.querySelector("[data-image]");
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;
  //setting price, Intl stand for international has features to set currencies, translating
  const price = storeItem.querySelector("[data-price]");
  price.innerHTML = formatCurrency(item.priceCents);
  catalogue.appendChild(storeItem);
}
