import { menuArray } from "./data"

const foodOrderArray = [0, 0, 0]
const menuSection = document.getElementById('menu-section')
const orderSection = document.getElementById('order-section')
const orderSummary = document.getElementById('order-summary')
const cardDetailsModal = document.getElementById('card-details-modal')
const cardDetailsForm =document.getElementById('card-details-form')
const orderMessage = document.getElementById('order-message')
let totalPrice = 0

document.addEventListener("click", handleClickEvent)
cardDetailsForm.addEventListener("submit", submitPayment)

function handleClickEvent(event) {
    const addBtn = event.target.closest('.add-btn')
    const removeBtn = event.target.closest('.remove-btn')
    if (addBtn) {
        addItem(addBtn.id)
    } else if (removeBtn) {
        removeItem(removeBtn.id)
    } else if (event.target.id === 'order-btn') {
        cardDetailsModal.showModal()
    }
}

function showFoodItems() {
    let menu = ''
    for (let item of menuArray) {
        menu += `
            <article id="${item.id}" class="food-container">
                <div class="food-item">
                    <div class="emoji-wrapper">
                    <span class="food-emoji">${item.emoji}</span>
                    </div>
                    <div class="food-info">
                        <h2 class="food-name">${item.name}</h2>
                        <p class="food-ingredients">${item.ingredients.join(', ')}</p>
                        <span class="food-price">$${item.price}</span>
                    </div>
                </div>
                <div class="btn-container">
                    <button id="${item.id}" class="add-btn">
                        <span class="plus-icon">+</span>
                    </button>
                </div>
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
        let order = '<h2 id="order-title">Your Order</h2>'
        for (let foodItem of menuArray) {
            if (foodOrderArray[foodItem.id] > 0) {
                order += `
                    <article class="order-container">
                        <div class="name-container">
                            <span class="order-name">${foodItem.name} *${foodOrderArray[foodItem.id]}</span>
                            <button id="${foodItem.id}" class="remove-btn">remove</button>
                        </div>
                        <span class="order-price">$${foodItem.price * foodOrderArray[foodItem.id]}</span>
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
            <span id="total-text">Total Price:</span>
            <span id="total-value">$${totalPrice}</span>
        </article>
        <button id="order-btn">Complete order</button>`
}

function addItem(foodId) {
    foodOrderArray[foodId]++
    showOrder()
}

function removeItem(foodId) {
    foodOrderArray[foodId]--
    showOrder()
}

function showOrderMessage(name) {
    orderMessage.innerHTML = `<p>Thanks, ${name}! Your order is on its way!</p>`
}

function submitPayment(event) {
    event.preventDefault()
    const cardDetails = {
        name: document.getElementById('card-name').value,
        cardNumber: document.getElementById('card-number').value,
        cardCvv: document.getElementById('card-cvv').value
    }
    console.log(cardDetails)
    cardDetailsModal.close()
    cardDetailsForm.reset()
    showOrderMessage(cardDetails.name.split(" ")[0])
    return cardDetails
}

showFoodItems()