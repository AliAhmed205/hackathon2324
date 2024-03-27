randomButton.addEventListener('click', () => {
    const countryIndex = getRandomIndex(countries.length)
    const viewIndex    = getRandomIndex(views.length)
    const yearIndex    = getRandomIndex(years.length)

    updateSlots(countryContainer, countryIndex)
    updateSlots(viewsContainer, viewIndex)
    updateSlots(yearsContainer, yearIndex)
})

const updateSlots = (container, index) => {
    const ul  = container.querySelector('ul')
    const lis = ul.querySelectorAll('li')

    lis.forEach((li, i) => {
        if (i === index) {
            li.style.display = 'block'
        } else {
            li.style.display = 'none'
        }
    })
}
