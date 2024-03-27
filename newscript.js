const countrySlot  = document.getElementById('countrySlot')
const yearSlot     = document.getElementById('yearSlot')
const svgAnimation = document.querySelectorAll('svg path')
let allData = []
let countries
let years
let colours

// FETCH DATA
fetch('https://cssday.nl/data/speakers.json')
    .then(response => response.json())
    .then(data => {
        allData = data
        // console.log(allData)
        getColours(data)
        getCountriesAndYears(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })

// MAKE ARRAYS FROM THE FETCHED DATA
const getCountriesAndYears = (data) => {
    countries = [...new Set(data.filter(item => item).map(item => item.country))]
    years     = [...new Set(data.filter(item => item).map(item => item.edition.year))]

    fillSlots(countries, years)
}

const getColours = (data) => {
    colours = [...new Set(data.filter(item => item.name).map(item => item.edition.color.hex))]
    // console.log(colours)
}

// FILL THE SLOTS WITH THE DATA
const fillSlots = (countries, years) => {
    createList(countries, countrySlot)
    createList(years, yearSlot)
}

// CREATE LISTS FROM ARRAYS
const createList = (array, container) => {
    let list = document.createElement('ul')

    array.forEach((item) => {
        let li         = document.createElement('li')
        li.textContent = item
        list.appendChild(li)
    })

    container.appendChild(list)
}

const updateList = (array, container) => {
    container.innerHTML = ''
    let list            = document.createElement('ul')

    array.forEach((item) => {
        let li = document.createElement('li')

        li.textContent = item

        list.appendChild(li)
    })

    container.appendChild(list)
}

// FUNCTION TO RANDOMIZE ITEM IN A GIVEN ARRAY
const getRandomItem = (array) => {
    let index = Math.floor(Math.random() * array.length)
    let value = array[index]

    return { value, index }
}

// LEVER FUNCTIONALITY FOR SPINNING
const lever = document.getElementById('lever')

lever.addEventListener('click', () => {

    document.getElementById('speakers-container').innerHTML = ''

    svgAnimation.forEach(path => {
        path.classList.remove('new-color')
    })

    lever.classList.add('spinning')
    setTimeout(() => {
        lever.classList.remove('spinning')
    }, 800)

    const randomYear = getRandomItem(years)

    const speakersForYear = allData.filter(speaker => speaker.edition && speaker.edition.year === parseInt(randomYear.value))

    const availableCountries = [...new Set(speakersForYear.map(speaker => speaker.country))]

    updateList(availableCountries, countrySlot)

    const randomCountry             = getRandomItem(availableCountries)
    const speakersForYearAndCountry = speakersForYear.filter(speaker => speaker.country === randomCountry.value)

    // Adding a slight delay to ensure the class removal is processed before re-adding it.
    setTimeout(() => {
        document.documentElement.style.setProperty('--svg-color', colours[randomYear.index])

        svgAnimation.forEach(path => {
            path.classList.add('new-color')

        })
    }, 1000)

    spinSlot(yearSlot, randomYear.index)
    spinSlot(countrySlot, randomCountry.index)

    document.body.setAttribute('style', 'height: 100%; margin-top: 5rem; margin-bottom: 10rem;')
    document.documentElement.style.setProperty('--svg-color', colours[randomYear.index])

    setTimeout(() => {
        displaySpeakers(speakersForYearAndCountry)
    }, 2000)

})

// FUNCTION TO SPIN THE SLOTS IN THE WHEEL
const spinSlot = (elementId, index) => {
    const ul = elementId

    ul.style.setProperty('--aantal', 0)

    setTimeout(() => {
        ul.style.setProperty('--duur', 2)
        ul.style.setProperty('--aantal', index)

        ul.addEventListener('transitionend', () => {
            ul.style.setProperty('--duur', 0)
        })

    }, 1)
}

// FUNCTION TO DISPLAY THE CORRECT SPEAKERS
const displaySpeakers = (data) => {
    const speakersContainer     = document.getElementById('speakers-container')
    speakersContainer.innerHTML = ''

    if (data.length === 0) {
        speakersContainer.textContent = 'No speakers found for the selected year.'
        return
    }

    const speakersList = document.createElement('ul')
    data.forEach(speaker => {

        if (speaker.avatar) {
            const speakerItem = document.createElement('li')

            let speakerYear         = document.createElement('p')
            speakerYear.textContent = speaker.edition.date

            let speakerCountry         = document.createElement('p')
            speakerCountry.textContent = speaker.country

            let speakerName         = document.createElement('h2')
            speakerName.textContent = speaker.name

            const avatarImage = document.createElement('img')
            avatarImage.src   = speaker.avatar
            avatarImage.alt   = speaker.name

            const speakerTitle       = document.createElement('h3')
            speakerTitle.textContent = speaker.talk.title

            const speakerDescription = document.createElement('p')

            if (speaker.day === false) {
                speakerDescription.textContent = 'Upcoming'
            } else if (speaker.talk.description === false) {
                speakerDescription.textContent = ''
            } else {
                speakerDescription.textContent = speaker.talk.description
            }

            speakersList.appendChild(speakerItem)
            speakerItem.appendChild(speakerCountry)
            speakerItem.appendChild(speakerYear)
            speakerItem.appendChild(speakerName)
            speakerItem.appendChild(avatarImage)
            speakerItem.appendChild(speakerTitle)
            speakerItem.appendChild(speakerDescription)
        }
    })
    speakersContainer.appendChild(speakersList)
}