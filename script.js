//weather display key and url
const apiKey="b9be05036910e516023d7e450880e99f";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//city image key and url
const apiImages="fMRssPeE9eZ0hpChsrZSbIfUsOegmQitAAdFRL7bcNs";
const urlImages="https://api.unsplash.com/search/photos?";

//DOM elements selection 
const searchBox= document.querySelector(".search input");
const searchButton= document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");

//fetches weather data using open weather upi
async function weatherApi(city){
    const response = await fetch (apiUrl + city + `&appid=${apiKey}`);

    //404 error handling
    if(response.status== 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
        document.body.style.backgroundImage = "";
    }


    else{
        //parsing raw json string to JS object
        var data= await response.json();

    console.log(data);

    //updating info
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) +"  °C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed+ "km/h";

    //updating weather icon
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src= "images/clouds.png";
    }

    else if(data.weather[0].main == "Clear"){
        weatherIcon.src= "images/clear.png";
    }

    else if(data.weather[0].main == "Rain"){
        weatherIcon.src= "images/rain.png";
    }

    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src= "images/drizzle.png";
    }

    else if(data.weather[0].main == "Mist"){
        weatherIcon.src= "images/mist.png";
    }

    //showing weather details & hiding error msg
    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";
    
    //calling function to change the background
    imagesApi(searchBox.value.trim());
    }

    
}

//fetches city image using unsplash api
async function imagesApi(city) {
    const responseImg = await fetch (`${urlImages}query=${city}&client_id=${apiImages}`);
    var dataImg= await responseImg.json();
    console.log(dataImg);

    //handeling error
    if (!responseImg.ok) {
        console.error("Error fetching images from Unsplash.");
        return;
    }

    if (dataImg.results.length> 0){
        //takes image from unsplash api
        const imageUrl = dataImg.results[0].urls.full;

        //change the bg
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize="cover";
        document.body.style.backgroundPosition="center";

    }

    //keeping the bg solid color if img not found
    else{
        document.body.style.backgroundImage = "";
    }

}


//event listener for click
searchButton.addEventListener('click', ()=>{
    weatherApi(searchBox.value);
   
})

//event listener for 'enter'
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        weatherApi(searchBox.value);
    }

});


