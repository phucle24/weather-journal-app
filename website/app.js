/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// baseURL and Key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=96f838b91ec8f4421f1034981eb6ac8e&units=imperial';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apiKey)

        .then(function (data) {
            postData('/addData', { date: newDate, temp: data.main.temp, content: feelings });
        })
        .then(function () {
            updateUI();
        })
}

// GET API weather
const getWeather = async (baseURL, newZip, key) => {

    const res = await fetch(baseURL + newZip + key)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("Cannot get data", error);
    }
}

// POST API weather
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Can not post data", error);
    }
}

// Updating UI Elements
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("Cannot update UI elements", error);
    }
}