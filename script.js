
//example time string: 1969-07-21T00:00:00Z
const dateInputted = document.querySelector("#submit");
const queryField = document.querySelector("#date");
const nasaImage = document.querySelector("#nasaImage");
const nasaVideo = document.querySelector("#nasaVideo");
const nasaAudio = document.querySelector("#nasaAudio");


dateInputted.addEventListener("click", async (e) => {
  //formatting input date
  let date = queryField.value;
  date += "T00:00:00Z"

  //removing hidden class
  nasaImage.classList.remove("is-hidden");
  nasaVideo.classList.remove("is-hidden");
  nasaAudio.classList.remove("is-hidden");
  
  //image and description api call
  const apiURL = `https://images-api.nasa.gov/search?date_created=${date}`
  const response = await fetch(apiURL);
  const dataObj = await response.json();

  //video api call
  const apiURLVideo = `https://images-api.nasa.gov/search?media_type=video&date_created=${date}`
  const responseVideo = await fetch(apiURLVideo);
  const dataObj2 = await responseVideo.json();
  
  //audio api call
  const apiAudioURL = `https://images-api.nasa.gov/search?media_type=audio&date_created=${date}`
  const responseAud = await fetch(apiAudioURL);
  const dataObj3 = await responseAud.json();

  //adding image
  let descrip = `<p> No image for this date </p>`
  let imgHTML = ""
  if (dataObj.collection.items.length > 0) {
    let imgURL = dataObj.collection.items[0].links[0].href
    let description = dataObj.collection.items[0].data[0].description
  
    imgHTML = `<img src="${imgURL}"/>`;
    descrip = `<p> ${description} </p>`;

  }

  //adding video
  let videoDescrip = `<p> No video for this date </p>`
  let video = ""
  if (dataObj2.collection.items.length > 0) {
    let videoURL = dataObj2.collection.items[0].href
    
    const responseVid = await fetch(videoURL);
    const vidObj = await responseVid.json();
    
    let vidURL = vidObj[2]
    vidURL = vidURL.replace("http", "https")
    
    videoDescrip1 = dataObj2.collection.items[0].data[0].description

    const captions = dataObj2.collection.items[0].links[1].href

    video =
    `<video width="600" controls> 
    <source src="${vidURL}" type="video/mp4"> 
    </video>`
    videoDescrip = `<p> ${videoDescrip1} </p>`
    //<track label="English" kind="subtitles" srclang="en" src="${captions}" default>
  }

  //adding audio
  let audio = `<p> No audio for this date </p>`
  if (dataObj3.collection.items.length > 0) {
    let audioURL = dataObj3.collection.items[0].href
    
    const responseAud = await fetch(audioURL);
    const audObj = await responseAud.json();
    
    let audURL1 = audObj[0]
    audURL = audURL1.replace("http", "https")
    
    audio = `<audio controls class = "center">
    <source src="${audURL}" type="audio/mpeg">
    </audio>`
  }

  //embedding HTML
  imageHolderDiv.innerHTML = descrip
  imageHolder.innerHTML = imgHTML
  videoHolderDiv.innerHTML = videoDescrip
  videoHolder.innerHTML = video 
  audioHolderDiv.innerHTML = audio

  
if (queryField.value > totalDate.valueOf()) {
  console.log("invalid date"); 
  
}
  
})

// Formatting the date in (yyy-mm-dd)
// Finds the current date (local)
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

// if month or day is less than 10
if(cMonth < 10) {
  cMonth = '0' + cMonth.toString();
}
if(cDay < 10) {
  cDay = '0' + cDay.toString();
}
var totalDate = (cYear + "-" + cMonth + "-" + cDay);
console.log(totalDate);
// Gets the selected date on console.log it
var selectedDate = new Date(this).valueOf();
  