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
        const randomYear = getRandomItem(Object.keys(yearColors));
        console.log(randomYear);
    
        const yearContainer = document.getElementById('titleYear');
    
        // Remove any existing <h1> elements from the yearContainer
        yearContainer.innerHTML = '';
    
        const speakerYear = document.createElement("h1");
        speakerYear.textContent = randomYear;
        yearContainer.appendChild(speakerYear);
    
        const speakersForYear = allData.filter(speaker => speaker.edition && speaker.edition.year === parseInt(randomYear));
        const availableCountries = [...new Set(speakersForYear.map(speaker => speaker.country))];
    
        const randomCountry = getRandomItem(availableCountries);
        const speakersForYearAndCountry = speakersForYear.filter(speaker => speaker.country === randomCountry);
    
        displaySpeakers(speakersForYearAndCountry);
    });
    

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
