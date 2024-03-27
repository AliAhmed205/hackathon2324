document.addEventListener('DOMContentLoaded', function () {
    let allData = [] // Store all the fetched data
    let yearColors = {}

    const svgAnimation = document.querySelectorAll('svg path');
    const svgPathAnim = document.querySelectorAll('svg path.new-color');

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

        svgAnimation.forEach(path => {
            path.classList.remove("new-color");
        });

        const randomYear = getRandomItem(Object.keys(yearColors));
        console.log(randomYear);

        // Adding a slight delay to ensure the class removal is processed before re-adding it.
        setTimeout(() => {
            // Update the color property with the new color.
            document.documentElement.style.setProperty('--svg-color', yearColors[randomYear]);

            svgAnimation.forEach(path => {
                // Force a reflow to ensure the animation restarts.

                // Re-add the "new-color" class to trigger the animation.
                path.classList.add("new-color");
            });
        }, 100);

        document.documentElement.style.setProperty('--svg-color', yearColors[randomYear])



        document.body.setAttribute("style", "height: 100%; margin-top: 5rem; margin-bottom: 10rem;");

        // change color

        const speakersForYear = allData.filter(speaker => speaker.edition && speaker.edition.year === parseInt(randomYear))
        const availableCountries = [...new Set(speakersForYear.map(speaker => speaker.country))]

        const randomCountry = getRandomItem(availableCountries)
        const speakersForYearAndCountry = speakersForYear.filter(speaker => speaker.country === randomCountry)

        displaySpeakers(speakersForYearAndCountry)

    })

    // !TODO EXCLUDE 2024 SPEAKERS

    function displaySpeakers(data) {
        const speakersContainer = document.getElementById('speakers-container')
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

                let speakerName = document.createElement('h2')
                speakerName.textContent = speaker.name

                // Create an avatar image
                const avatarImage = document.createElement('img')
                // image of the speaker
                avatarImage.src = speaker.avatar
                // alt text
                avatarImage.alt = speaker.name

                const speakerTitle = document.createElement('h3')
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

            // add transition


            // The color of the svg changes when the lever is clicked
            // The color changes instandly now, I want to make this fill go from left to right during 2 sec
            // document.documentElement.style.setProperty('--svg-color', yearColors[randomYear])



            return acc
        }, {})
    }
})
