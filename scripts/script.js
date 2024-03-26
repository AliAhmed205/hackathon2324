// const randomButton     = document.getElementById('randomButton')
// const countryContainer = document.getElementById('countrySlot')
// const viewsContainer   = document.getElementById('viewSlot')
// const yearsContainer   = document.getElementById('yearSlot')
//
// const countries = ['NL', 'EN', 'DE', 'US', 'UK', 'FR', 'NO', 'SE', 'CA', 'JP', 'BE', 'AT', 'PT']
//
// const views = ['5777', '2345', '4821', '3999', '5032', '4200', '5566', '4011', '5863', '4689', '5023', '5298', '4599']
//
// const years = ['2013', '2014', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
//
// const fillSlots = () => {
//     createList(countries, countryContainer)
//     createList(views, viewsContainer)
//     createList(years, yearsContainer)
// }
//
// const createList = (array, container) => {
//     let list = document.createElement('ul')
//
//     array.forEach((item) => {
//         let li         = document.createElement('li')
//         li.textContent = item
//         list.appendChild(li)
//     })
//
//     container.appendChild(list)
// }
//
// fillSlots()
//
// const getRandomIndex = (max) => {
//     return Math.floor(Math.random() * max)
// }
//
// randomButton.addEventListener('click', () => {
//     const countryIndex = getRandomIndex(countries.length)
//     const viewIndex    = getRandomIndex(views.length)
//     const yearIndex    = getRandomIndex(years.length)
//
//     updateSlots(countryContainer, countryIndex)
//     updateSlots(viewsContainer, viewIndex)
//     updateSlots(yearsContainer, yearIndex)
// })
//
// const updateSlots = (container, index) => {
//     const ul  = container.querySelector('ul')
//     const lis = ul.querySelectorAll('li')
//
//     lis.forEach((li, i) => {
//         if (i === index) {
//             li.style.display = 'block'
//         } else {
//             li.style.display = 'none'
//         }
//     })
// }
