//-----things to do in the shopping cart
//add items 2.ok
//remove items
//show/hide the cart on click 1.ok
//show hide cart when it has no items , or goes from 0 to 1
//get sum of items
//save items /load saved items
import items from "./items.json";
import formatCurrency from "./util/formatCurrency";
import addGlobalEventListener from "./util/addGlobalEventListener";
// import { json } from "stream/consumers";

const cartButton = document.querySelector("[data-cart-button]");
const cartWrapper = document.querySelector("[data-cart-items-wrapper]");
let shoppingCart = [];
const IMAGE_URL = "https://dummyimage.com/210x130";
const cartItemTemplate = document.querySelector("#cart-item-template");
const cartItemContainer = document.querySelector("[data-cart-items-container]");
const cartQuantity = document.querySelector("[data-cart-quantity]");
const cartTotal = document.querySelector("[data-cart-total]");
const cart = document.querySelector("[data-cart]");
const deleteFromCart = document.querySelector("[data-remove-from-cart-button]");
const SESSION_STORAGE_KEY = `SHOPPING_CART-cart`;

export function setupShoppingCart() {
  addGlobalEventListener("click", "[data-remove-from-cart-button]", (e) => {
    const idOfItem = e.target.closest("[data-item]").dataset.ItemID;
    removeFromCart(parseInt(idOfItem));
  });
  shoppingCart = loadCart();
  renderCart();

  //show/hide the cart on click
  cartButton.addEventListener("click", () => {
    cartWrapper.classList.toggle("invisible");
  });
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart));
}
function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return JSON.parse(cart || []);
}
//add items to the cart
//handle multiple of the same item in the cart
//get sum of items
export function addItemToCart(id) {
  //cart button quantity
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }
  renderCart();
  saveCart();
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem === null) return;

  shoppingCart = shoppingCart.filter((entry) => {
    entry.id !== id;
  });
  renderCart();
  saveCart();
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart();
  } else {
    showCart();
  }
  renderCartItems();
}

function hideCart() {
  cart.classList.add("invisible");
  cartWrapper.classList.add("invisible");
}

function showCart() {
  cart.classList.remove("invisible");
}

function renderCartItems() {
  cartItemContainer.innerHTML = "";

  cartQuantity.innerHTML = shoppingCart.length; //changing quantity items of cart

  //getting total value of items on cart
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((i) => entry.id === i.id);
    return sum + item.priceCents * entry.quantity; //whathever return here will be added to "sum" and then do the next loop until items are over
  }, 0);

  cartTotal.innerText = formatCurrency(totalCents);

  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);

    const ContainerID = cartItem.querySelector("[data-item]");
    ContainerID.dataset.ItemID = item.id;

    const name = cartItem.querySelector("[data-name]");
    name.innerHTML = item.name;

    const image = cartItem.querySelector("[data-image]");
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-quantity]");
      quantity.innerText = `x${entry.quantity}`;
    }

    const price = cartItem.querySelector("[data-price]");
    price.innerHTML = formatCurrency(item.priceCents * entry.quantity);
    // console.log(item);

    cartItemContainer.appendChild(cartItem);
  });
}
