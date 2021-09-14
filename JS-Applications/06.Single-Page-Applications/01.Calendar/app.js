const monthNames = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
}

const yearSelect = document.getElementById('years');

const years = Array.from(document.querySelectorAll('.monthCalendar')).reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {}) 

const months = Array.from(document.querySelectorAll('.daysCalendar')).reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {}) 

function displaySection(section) {
    document.body.innerHTML = '';
    document.body.appendChild(section);
}

displaySection(yearSelect);

yearSelect.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('date') || ev.target.classList.contains('day')) {
        ev.stopImmediatePropagation();
        const yearID = `year-${ev.target.textContent.trim()}`;
        displaySection(years[yearID]);
    }
})

document.body.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'CAPTION') {
        const sectionID = ev.target.parentNode.parentNode.id;
        
        if (sectionID.includes('year-')) {
            displaySection(yearSelect);
        } else if (sectionID.includes('month-')) {
            const yearID = `year-${sectionID.split('-')[1]}`;
            
            displaySection(years[yearID]);
        }
    } else if (ev.target.tagName == 'TD' || ev.target.tagName == 'DIV') {
        const monthName = ev.target.textContent.trim();

        if (monthNames.hasOwnProperty(monthName)) {
            let parent = ev.target.parentNode;

            while (parent.tagName != 'TABLE') {
                parent = parent.parentNode;
            }
            const year = parent.querySelector('caption').textContent.trim();
            const monthID = `month-${year}-${monthNames[monthName]}`;

            displaySection(months[monthID]);
        }
    }
})