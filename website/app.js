/* Global Variables */
const appid = '49b9b809e566d9d0cb35f31930cdff2e'
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const zipInput = document.getElementById('zip');
const userInput = document.getElementById('feelings')
const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const contentHolder = document.getElementById('content')
const postURL = 'http://localhost:8000'
const getURL = 'http://localhost:8000/all'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// A function to call fetch on OpenWeatherMap
const getWeather = async (baseURL, zip = '94040,us', api) => {
  const url = `http://${baseURL}zip=${zip}&appid=${api}`
  const response = await fetch(url)
  let jsonResponse = await response.json()
  return jsonResponse
}

//A function to post data with user input
const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}

// A funtion to update UI
const updateUI = async () => {
  const response = await fetch(getURL)
  const jsonResponse = await response.json()
  dateHolder.innerHTML = `<span class="entry-item">Date: </span>${jsonResponse.date}`
  contentHolder.innerHTML = `<span class="entry-item">You feel: </span>${jsonResponse.userResponse}`
  tempHolder.innerHTML = `<span class="entry-item">Temperature: </span>${jsonResponse.temperature}`
}

// The handleClick event handler
const handleClick = async () => {
  const weatherData = await getWeather(baseURL, zipInput.value, appid)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userInput.value
  }
  await postData(postURL, data)
  updateUI()
}

//Add event listener for the element with the id of 'generate'
const ele = document.getElementById('generate')
ele.addEventListener('click', handleClick)
