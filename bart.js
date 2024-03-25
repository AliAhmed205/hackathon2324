document.addEventListener('DOMContentLoaded', function () {
    let allData = []; // Store all the fetched data 

    // Fetch data from the JSON link
    fetch('https://cssday.nl/data/speakers.json')
        .then(response => response.json())
        .then(data => {
            allData = data; // Store fetched data
            displaySpeakers(data); // Display all speakers
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Show the error in the console
        });

    // Display speakers in the HTML
    function displaySpeakers(data) {
        const speakersContainer = document.getElementById('speakers-container');
        speakersContainer.innerHTML = ''; // Clear previous data

        // Check if there are speakers to display
        if (data.length === 0) {
            speakersContainer.textContent = 'No speakers found for the selected year.';
            return;
        }

        // Create a list to display speakers
        const speakersList = document.createElement('ul');
        data.forEach(speaker => {
            const speakerItem = document.createElement('li');
            let speakerDetails = speaker.name;

            if (speaker.talk && speaker.talk.title) { // Adjusted to access the title property
                speakerDetails += ` - "${speaker.talk.title}"`; // Using the title
            }

            // If there are other properties you wish to display, access them similarly
            speakerItem.textContent = speakerDetails;
            speakersList.appendChild(speakerItem);
        });


        speakersContainer.appendChild(speakersList);
    }

    // Event listener for the filter button
    document.getElementById('filter-button').addEventListener('click', () => {
        const selectedYear = document.getElementById('year-select').value;
        // const filteredSpeakers = selectedYear ? allData.filter(speaker => speaker.year && speaker.year.toString() === selectedYear) : allData;
        const filteredSpeakers = selectedYear ? allData.filter(speaker => speaker.edition && speaker.edition.year.toString() === selectedYear) : allData;

        displaySpeakers(filteredSpeakers);
    });

    document.getElementById('filter-button').addEventListener('click', () => {
        const selectedYear = document.getElementById('year-select').value;
        const selectedCountry = document.getElementById('country-select').value;

        const filteredSpeakers = allData.filter(speaker => {
            const matchesYear = selectedYear ? speaker.edition && speaker.edition.year.toString() === selectedYear : true;
            const matchesCountry = selectedCountry ? speaker.country === selectedCountry : true;
            return matchesYear && matchesCountry;
        });

        displaySpeakers(filteredSpeakers);
    });

});
