import { menuArray } from "./data"

const foodOrderArray = [0, 0, 0]
const menuSection = document.getElementById('menu-section')
const orderSection = document.getElementById('order-section')
const orderSummary = document.getElementById('order-summary')
let totalPrice = 0

document.addEventListener("click", handleClickEvent)

function handleClickEvent(event) {
    const btnClicked = event.target
    if (btnClicked.classList.contains('add-btn')) {
        addItem(btnClicked.id)
    } else if (btnClicked.classList.contains('remove-btn')) {
        removeItem(btnClicked.id)
    }
}

function showFoodItems() {
    let menu = ''
    for (let item of menuArray) {
        menu += `
            <article id="${item.id}">
                <div class="food-item">
                    <span class="food-emoji">${item.emoji}</span>
                    <div class="food-info">
                        <h2 class="food-name">${item.name}</h2>
                        <p class="food-ingredients">${item.ingredients.join(', ')}</p
                        <span class="food-price">$${item.price}</span>
                    </div>
                </div>
                <button id="${item.id}" class="add-btn">+</button>
            </article>
            <hr>`
    }
    menuSection.innerHTML = menu
}

function showOrder() {
    const isAllZero = foodOrderArray.every(numOrders => numOrders === 0)
    if (isAllZero) {
        orderSection.innerHTML = ''
        orderSummary.innerHTML = ''
    } else {
        let order = ''
        for (let foodItem of menuArray) {
            if (foodOrderArray[foodItem.id] > 0) {
                order += `
                    <article class="order-item">
                        <div class="name-btn-container">
                            <span class="order-name">${foodItem.name} *${foodOrderArray[foodItem.id]}</span>
                            <button id="${foodItem.id}" class="remove-btn">remove</button>
                        <div>
                        <span class="order-price">$${foodItem.price}</span>
                    </article>`
            }
        }
        orderSection.innerHTML = order

        totalPrice = foodOrderArray.reduce((total, currOrder, index) => 
            total + menuArray[index].price * foodOrderArray[index], 0)

        ShowOrderSummary(totalPrice)
    }
}

function ShowOrderSummary(totalPrice) {
    orderSummary.innerHTML =`
        <hr>
        <article class="order-total">
            <span>Total Price:</span>
            <span>$${totalPrice}</span>
        </article>
        <button id="order-btn">Complete Order</button>`
}

function addItem(foodId) {
    foodOrderArray[foodId]++
    showOrder()
}

function removeItem(foodId) {
    foodOrderArray[foodId]--
    showOrder()
}

showFoodItems()