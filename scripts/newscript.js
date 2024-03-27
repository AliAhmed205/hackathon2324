const countrySlot  = document.getElementById('countrySlot')
const yearSlot     = document.getElementById('yearSlot')
const svgAnimation = document.querySelectorAll('svg path')
let allData
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

const countryImageArray = [
    './assets/images/yearbadges/2013.svg',
    './assets/images/yearbadges/2014.svg',
    './assets/images/yearbadges/2015.svg',
    './assets/images/yearbadges/2016.svg',
    './assets/images/yearbadges/2017.svg',
    './assets/images/yearbadges/2018.svg',
    './assets/images/yearbadges/2019.svg',
    './assets/images/yearbadges/2022.svg',
    './assets/images/yearbadges/2023.svg',
    './assets/images/yearbadges/2024.svg'
]

const yearImageArray = [
    './assets/images/yearbadges/2024.svg',
    './assets/images/yearbadges/2023.svg',
    './assets/images/yearbadges/2022.svg',
    './assets/images/yearbadges/2019.svg',
    './assets/images/yearbadges/2018.svg',
    './assets/images/yearbadges/2017.svg',
    './assets/images/yearbadges/2016.svg',
    './assets/images/yearbadges/2015.svg',
    './assets/images/yearbadges/2014.svg',
    './assets/images/yearbadges/2013.svg',
]

// MAKE ARRAYS FROM THE FETCHED DATA
const getCountriesAndYears = (data) => {
    countries = [...new Set(data.filter(item => item).map(item => item.country))]
    years     = [...new Set(data.filter(item => item).map(item => item.edition.year))]

    fillSlots(countries, years)
}

const getColours = (data) => {
    colours = [...new Set(data.filter(item => item.name).map(item => item.edition.color.hex))]
}

// FILL THE SLOTS WITH THE DATA
const fillSlots = (countries, years) => {
    createList(countries, countrySlot, countryImageArray)
    createList(years, yearSlot, yearImageArray)
}

// CREATE LISTS FROM ARRAYS
const createList = (array, container, imageArray) => {
    let list = document.createElement('ul')

    array.forEach((item, index) => {
        let li         = document.createElement('li')

        let img = document.createElement('img')

        img.src = imageArray[index]
        img.alt = item

        li.appendChild(img)

        list.appendChild(li)
    })

    container.appendChild(list)
}

// UPDATE THE LIST ITEMS FROM FILTERED ITEMS
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

    const yearContainer = document.getElementById('titleYear')
    yearContainer.innerHTML = ''
    const speakerYear = document.createElement("h1");
    speakerYear.textContent = randomYear.value;

    yearContainer.appendChild(speakerYear);

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
    speakersContainer.innerHTML = '' // Clear previous data

    // Check if there are speakers to display
    if (data.length === 0) {
        speakersContainer.textContent = 'No speakers found for the selected year.'
        return
    }

    // Create a list to display speakers
    const speakersList = document.createElement('ul')
    data.forEach(speaker => {

        if (speaker.avatar) {

            const speakerItem = document.createElement('li')

            const speakerInfo = document.createElement('div')
            const speakerSubject = document.createElement('div')
            const speakerStats = document.createElement('div')

            const speakerStatsList = document.createElement('ul')
            const speakerStatsListItem1 = document.createElement('li')
            const speakerStatsListItem2 = document.createElement('li')
            const speakerStatsListItem3 = document.createElement('li')
            const speakerStatsListItem4 = document.createElement('li')

            const speakerYear = document.createElement('h1')
            speakerYear.textContent = speaker.edition.year

            const speakerName = document.createElement('h2')
            speakerName.textContent = speaker.name

            const avatarImage = document.createElement('img')
            avatarImage.src   = speaker.avatar // image of speaker
            avatarImage.alt   = speaker.name // alt text

            const speakerTitle       = document.createElement('h3')
            speakerTitle.textContent = speaker.talk.title

            const speakerDesc       = document.createElement('p')
            speakerDesc.textContent = speaker.talk.description

            const speakerDayTitle = document.createElement('h2')
            speakerDayTitle.innerHTML = "Day"
            const speakerDayNum = document.createElement('p')
            speakerDayNum.textContent = speaker.day

            const speakerViewsTitle = document.createElement('h2')
            speakerViewsTitle.innerHTML = "Views"
            const speakerViewsNum = document.createElement('p')
            speakerViewsNum.textContent = speaker.talk.video.views

            const speakerLikesTitle = document.createElement('h2')
            speakerLikesTitle.innerHTML = "Likes"
            const speakerLikesNum = document.createElement('p')
            speakerLikesNum.textContent = speaker.talk.video.likes

            const speakerWatchTitle = document.createElement('h2');
            speakerWatchTitle.innerHTML = "Watch";
            const speakerWatchNum = document.createElement('a');
            speakerWatchNum.setAttribute('href', speaker.talk.video['youtube-link']);
            speakerWatchNum.textContent = 'Video';

            speakersList.appendChild(speakerItem)
            speakerItem.appendChild(speakerInfo)
            speakerItem.appendChild(speakerSubject)
            speakerItem.appendChild(speakerStats)
            speakerInfo.appendChild(speakerName)
            speakerInfo.appendChild(avatarImage)
            speakerSubject.appendChild(speakerTitle)
            speakerSubject.appendChild(speakerDesc)
            speakerStats.appendChild(speakerStatsList)
            speakerStatsList.appendChild(speakerStatsListItem1)
            speakerStatsList.appendChild(speakerStatsListItem2)
            speakerStatsList.appendChild(speakerStatsListItem3)
            speakerStatsList.appendChild(speakerStatsListItem4)
            speakerStatsListItem1.appendChild(speakerDayTitle)
            speakerStatsListItem1.appendChild(speakerDayNum)
            speakerStatsListItem2.appendChild(speakerViewsTitle)
            speakerStatsListItem2.appendChild(speakerViewsNum)
            speakerStatsListItem3.appendChild(speakerLikesTitle)
            speakerStatsListItem3.appendChild(speakerLikesNum)
            speakerStatsListItem4.appendChild(speakerWatchTitle)
            speakerStatsListItem4.appendChild(speakerWatchNum)
        }
    })
    speakersContainer.appendChild(speakersList)
}
