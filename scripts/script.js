

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
