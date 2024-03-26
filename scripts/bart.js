document.addEventListener('DOMContentLoaded', function () {
    let allData = []; // Store all the fetched data 
    let yearColors = {};

    // Fetch data from the JSON link
    fetch('https://cssday.nl/data/speakers.json')
        .then(response => response.json())
        .then(data => {
            allData = data; // Store fetched data
            displaySpeakers(data); // Display all speakers
            updateCountryOptions(data); // Update the country options
            updateYearColors(data); // Update the year colors
            updateYearOptions(data);

        })
        .catch(error => {
            console.error('Error fetching data:', error); // Show the error in the console
        });

    function updateYearOptions(data) {
        const yearSelect = document.getElementById('year-select');
        const allYears = data.map(speaker => speaker.edition.year)
            .filter((year, index, self) => year && self.indexOf(year) === index)
            .sort((a, b) => a - b); // Sorteer jaren in oplopende volgorde

        yearSelect.innerHTML = '<option value="">All</option>'; // Reset en voeg de 'All' optie toe

        allYears.forEach(year => {
            const option = document.createElement('option');
            option.value = option.textContent = year;
            yearSelect.appendChild(option);
        });
    }



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

            // const svgMarkup = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233.16 262.3">
            // <defs>
            // <style>
            //       .cls-1 {
            //         fill: #265aa6;
            //         stroke-width: 0px;
            //       }
            // </style>
            // </defs>
            // <polygon class="cls-1" points="211.3 236.8 116.58 262.3 21.86 236.8 0 0 233.16 0 211.3 236.8"/>
            // </svg>`;

            // speakerItem.innerHTML = svgMarkup;


            let speakerName = document.createElement('h2');
            speakerName.textContent = speaker.name;


            // Create an avatar image
            const avatarImage = document.createElement('img');
            // image of the speaker
            avatarImage.src = speaker.avatar;
            // alt text
            avatarImage.alt = speaker.name;


            const speakerTitle = document.createElement('h3');
            speakerTitle.textContent = speaker.talk.title;


            // create description
            const speakerDescription = document.createElement('p');
            speakerDescription.textContent = speaker.talk.description;


            // showen


            speakersList.appendChild(speakerItem);

            speakerItem.appendChild(speakerName);

            speakerItem.appendChild(avatarImage);

            speakerItem.appendChild(speakerTitle);

            speakerItem.appendChild(speakerDescription);


        });

        speakersContainer.appendChild(speakersList);
    }

    // dynamic years
    function updateCountryOptions(data, selectedYear) {
        const countrySelect = document.getElementById('country-select');
        let filteredData = data;

        // Als er een jaar geselecteerd is, filter dan de data op basis van dat jaar
        if (selectedYear) {
            filteredData = data.filter(speaker => speaker.edition && speaker.edition.year.toString() === selectedYear);
        }

        const allCountries = filteredData.map(speaker => speaker.country)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort();

        countrySelect.innerHTML = '<option value="">All</option>'; // Reset en voeg de 'All' optie toe

        allCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    function updateYearColors(data) {
        yearColors = data.reduce((acc, speaker) => {
            if (speaker.edition && speaker.edition.year && speaker.edition.color && speaker.edition.color.hex) {
                acc[speaker.edition.year] = speaker.edition.color.hex;
            }
            return acc;
        }, {});
    }


    document.getElementById('year-select').addEventListener('change', () => {
        const selectedYear = document.getElementById('year-select').value;
        const fill = yearColors[selectedYear];
        document.querySelectorAll('svg').forEach(svg => {
            svg.style.fill = fill;
        });

        updateCountryOptions(allData, selectedYear);
        document.getElementById('country-select').value = '';

    });



    document.getElementById('filter-button').addEventListener('click', () => {
        const selectedYear = document.getElementById('year-select').value;
        const selectedCountry = document.getElementById('country-select').value;

        const filteredSpeakers = allData.filter(speaker => {
            // Check if the speaker matches the selected year and country 
            // If no year or country is selected, all speakers should be displayed
            // If a year or country is selected, only speakers that match the selected year and/or country should be displayed

            // Deze regel controleert of de spreker overeenkomt met het geselecteerde jaar. 
            // Als selectedYear leeg is (wat betekent dat de gebruiker 'All' of niets heeft geselecteerd), 
            // of als het jaar van de spreker (speaker.edition.year) overeenkomt met selectedYear, 
            // dan wordt matchesYear true. Anders is het false.
            const matchesYear = !selectedYear || (speaker.edition && speaker.edition.year.toString() === selectedYear);

            // If a country is selected, only speakers that match the selected country should be displayed
            const matchesCountry = !selectedCountry || speaker.country === selectedCountry;
            // Return true if the speaker matches the selected year and country
            return matchesYear && matchesCountry;
        });

        displaySpeakers(filteredSpeakers);
    });

});
