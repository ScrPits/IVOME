        // Get current time and format
        function getTime() {
            let date = new Date(),
                min = date.getMinutes(),
                sec = date.getSeconds(),
                hour = date.getHours();

            return "" + 
                (hour < 10 ? ("0" + hour) : hour) + ":" + 
                (min < 10 ? ("0" + min) : min) + ":" + 
                (sec < 10 ? ("0" + sec) : sec);
        }

        window.onload = () => {
            let xhr = new XMLHttpRequest();
            // Request to open weather map
            xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=92345,us&units=imperial&appid=e5b292ae2f9dae5f29e11499c2d82ece');
            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let json = JSON.parse(xhr.responseText);
                        console.log(json);
                        document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + " F";
                        document.getElementById("weather-description").innerHTML = json.weather[0].description;
                    } else {
                        console.log('error msg: ' + xhr.status);
                    }
                }
            }
            xhr.send();
            // Set up the clock
            document.getElementById("clock").innerHTML = getTime();
            // Set clock interval to tick clock
            setInterval( () => {
                document.getElementById("clock").innerHTML = getTime();
            },100);
        }

        document.addEventListener("keydown", event => {
            if (event.keyCode == 32) {          // Spacebar code to open search
                document.getElementById('search').style.display = 'flex';
                document.getElementById('search-field').focus();
            } else if (event.keyCode == 27) {   // Esc to close search
                document.getElementById('search-field').value = '';
                document.getElementById('search-field').blur();
                document.getElementById('search').style.display = 'none';
            }
        });