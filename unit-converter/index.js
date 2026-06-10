/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
 const input = document.getElementById('input')
 const convertBtn = document.getElementById("convert-btn")
 const lenConversion = document.getElementById('len-conversion')
 const volConversion = document.getElementById('vol-conversion')
 const massConversion = document.getElementById('mass-conversion')
 const convItems = [lenConversion, volConversion, massConversion]
 
 
 convertBtn.addEventListener("click", function() {
    let usrInput = Number(input.value)
    getConversion(usrInput)
 })
 
 function getConversion(usrInput) {
    for (let i = 0; i < convItems.length; i++) {
        if (convItems[i].id === 'len-conversion') {
            convItems[i].textContent = `${usrInput} meters = ${(usrInput * 3.281).toFixed(3)} feet | ${usrInput} feet = ${(usrInput / 3.281).toFixed(3)} meters`
        } else if (convItems[i].id === 'vol-conversion') {
            convItems[i].textContent = `${usrInput} liters = ${(usrInput * 0.264).toFixed(3)} gallons | ${(usrInput)} gallons = ${(usrInput / 0.264).toFixed(3)} liters`
        } else {
            convItems[i].textContent = `${usrInput} kilos = ${(usrInput * 2.204).toFixed(3)} pounds | ${usrInput} pounds = ${(usrInput / 2.204).toFixed(3)} kilos`
        }
    }
 }