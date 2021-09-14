function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

async function getWeather() {
    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degree': '&#176',
    };

    const currentDiv = document.getElementById('current');
    const nextDiv = document.getElementById('upcoming');
    const location = document.getElementById('location');
    const cityName = location.value;
    location.value = '';

    while (currentDiv.children.length >= 1 && nextDiv.children.length >= 1) {
        currentDiv.removeChild(currentDiv.lastChild);
        nextDiv.removeChild(nextDiv.lastChild);
    }

    const code = await getCode(cityName);

    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcomming(code)
    ])


    document.getElementById('forecast').style.display = 'block';

    const forecastsDiv = createElement('div', undefined, 'forecasts');
    const conditionSymbol = current.forecast.condition;

    const spanConditonSymbol = createElement('span', undefined, 'condition symbol');
    spanConditonSymbol.innerHTML = symbols[conditionSymbol];

    forecastsDiv.appendChild(spanConditonSymbol);
    currentDiv.appendChild(forecastsDiv);

    const span = createElement('span', undefined, 'condition');
    const citySpan = createElement('span', `${current.name}`, 'forecast-data');
    const spanHighLow = createElement('span', undefined, 'forecast-data');
    spanHighLow.innerHTML = `${current.forecast.low}${symbols.Degree}/${current.forecast.high}${symbols.Degree}`;
    const spanCondition = createElement('span', `${current.forecast.condition}`, 'forecast-data');

    span.appendChild(citySpan);
    span.appendChild(spanHighLow);
    span.appendChild(spanCondition);

    forecastsDiv.appendChild(span);

    const divForecastInfo = createElement('div', undefined, 'forecast-info');

    nextDiv.appendChild(divForecastInfo);

    for (let index = 0; index < upcoming.forecast.length; index++) {
        createSpan(upcoming, index, symbols).map(e => divForecastInfo.appendChild(e))
    }

}

async function getCode(cityName) {
    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const response = await fetch(url);
        const data = await response.json();

        return data.find((currentDiv) => currentDiv.name.toLowerCase() == cityName.toLowerCase()).code;
    } catch (error) {
        alert(error)
    }
}

async function getCurrent(code) {
    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getUpcomming(code) {
    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

function createElement(type, text, attributes) {
    const result = document.createElement(type);
    if (text) {
        result.textContent = text;
    }
    if (attributes) {
        result.className = attributes;
    }

    return result;
}

function createSpan(upcoming, index, symbols) {
    const symbol = upcoming.forecast[index].condition;
    const low = upcoming.forecast[index].low;
    const high = upcoming.forecast[index].high;

    const spanSymbol = createElement('span', undefined, 'symbol');
    spanSymbol.innerHTML = symbols[symbol]
    const highLow = createElement('span', undefined, 'forecast-data');
    highLow.innerHTML = `${low}${symbols.Degree}/${high}${symbols.Degree}`
    const condition = createElement('span', symbol, 'forecast-data');

    return [spanSymbol, highLow, condition];
}