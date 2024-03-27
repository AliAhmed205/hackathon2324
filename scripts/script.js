document.addEventListener('DOMContentLoaded', function() {
    let allData    = [] // Store all the fetched data
    let yearColors = {}

    // Fetch data from the JSON link
    fetch('https://cssday.nl/data/speakers.json')
        .then(response => response.json())
        .then(data => {
            allData = data // Store fetched data
            updateYearColors(data) // Update the year colors
        })
        .catch(error => {
            console.error('Error fetching data:', error) // Show the error in the console
        })

    // FUNCTION TO RANDOMIZE ITEM FROM A GIVEN ARRAY
    const getRandomItem = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    document.getElementById('lever').addEventListener('click', () => {

        const randomYear = getRandomItem(Object.keys(yearColors))
        console.log(randomYear)

        const speakersForYear    = allData.filter(speaker => speaker.edition && speaker.edition.year === parseInt(randomYear))
        const availableCountries = [...new Set(speakersForYear.map(speaker => speaker.country))]

        const randomCountry             = getRandomItem(availableCountries)

        // const randomSpeaker = getRandomItem(speakersForYear.filter(speaker => speaker.country === randomCountry))
        // displaySpeakers([randomSpeaker])

        const speakersForYearAndCountry = speakersForYear.filter(speaker => speaker.country === randomCountry)
        displaySpeakers(speakersForYearAndCountry)

    })

    // !TODO EXCLUDE 2024 SPEAKERS

    function displaySpeakers(data) {
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

                let speakerName         = document.createElement('h2')
                speakerName.textContent = speaker.name

                // Create an avatar image
                const avatarImage = document.createElement('img')
                // image of the speaker
                avatarImage.src   = speaker.avatar
                // alt text
                avatarImage.alt   = speaker.name

                const speakerTitle       = document.createElement('h3')
                speakerTitle.textContent = speaker.talk.title

                // create description
                // const speakerDescription = document.createElement('p')
                //
                // if (speaker.day === false) {
                //     speakerDescription.textContent = 'Upcoming'
                // } else if (speaker.talk.description === false) {
                //     speakerDescription.textContent = ''
                // } else {
                //     speakerDescription.textContent = speaker.talk.description
                // }
                speakersList.appendChild(speakerItem)
                speakerItem.appendChild(speakerName)
                speakerItem.appendChild(avatarImage)
                speakerItem.appendChild(speakerTitle)
                // speakerItem.appendChild(speakerDescription)
            }
        })
        speakersContainer.appendChild(speakersList)
    }

    function updateYearColors(data) {
        yearColors = data.reduce((acc, speaker) => {
            if (speaker.edition && speaker.edition.year && speaker.edition.color && speaker.edition.color.hex) {
                acc[speaker.edition.year] = speaker.edition.color.hex
            }
            return acc
        }, {})
    }
})
