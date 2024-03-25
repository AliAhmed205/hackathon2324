const slotSymbols = [
    ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '🙂'],
    ['🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
    ['⭐️', '🌟', '✨', '💫', '⚡️', '☄️', '🌠', '🌌', '🌙', '🌕', '🌖', '🌗']
];

function createSymbolElement(symbol) {
    const div = document.createElement('div');
    div.classList.add('symbol');
    div.textContent = symbol;
    return div;
}

// make a function that will be called when the lever is clicked, add a class to the button and remove it when the animation is done
// add a class to the button when the animation is done
const lever = document.getElementById('lever');

lever.addEventListener('click', () => {
    lever.classList.add('spinning');
    setTimeout(() => {
        lever.classList.remove('spinning');
    }, 800);
})



let spun = false;
function spin() {

    if (spun) {
        reset();
    }
    const slots = document.querySelectorAll('.slot');
    let completedSlots = 0;

    slots.forEach((slot, index) => {
        const symbols = slot.querySelector('.symbols');
        const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
        const symbolCount = symbols.childElementCount;

        // symbols.innerHTML = '';

        // symbols.appendChild(createSymbolElement('❓'));

        for (let i = 0; i < 3; i++) {
            slotSymbols[index].forEach(symbol => {
                symbols.appendChild(createSymbolElement(symbol));
            });
        }

        const totalDistance = symbolCount * symbolHeight;
        const randomOffset = -Math.floor(Math.random() * symbolCount) * symbolHeight;
        symbols.style.top = `${randomOffset}px`;

        symbols.addEventListener('transitionend', () => {
            completedSlots++;
            if (completedSlots === slots.length) {
                logDisplayedSymbols();
            }
        }, { once: true });
    });

    spun = true;
}

function reset() {
    const slots = document.querySelectorAll('.slot');

    slots.forEach(slot => {
        const symbols = slot.querySelector('.symbols');
        symbols.style.transition = 'none';
        symbols.style.top = '0';
        symbols.offsetHeight;
        symbols.style.transition = '';
    });
}

function logDisplayedSymbols() {
    const slots = document.querySelectorAll('.slot');
    const displayedSymbols = [];

    slots.forEach((slot, index) => {
        const symbols = slot.querySelector('.symbols');
        const symbolIndex = Math.abs(parseInt(symbols.style.top, 10)) / slot.clientHeight;
        const displayedSymbolIndex = Math.round(symbolIndex) % slotSymbols[index].length;
        const displayedSymbol = slotSymbols[index][displayedSymbolIndex];
        displayedSymbols.push(displayedSymbol);
    });

    console.log(displayedSymbols);
}

spin();