$(document).ready(function() {

    var API = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
        date = new Date(),
        todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString(),
        apodDate = localStorage.getItem('apodDate');

    // Use the API response in localStorage if the API response has already been obtained.
    if (apodDate == todaysDate) {

        var apod = JSON.parse(localStorage.getItem('apod')),
            title = apod['title'],
            description = apod['explanation'],
            url = apod['url']; 

        $("#apod").attr("src", url);
        $('#title').html(title);
        $('#description').html(description); 

    }

    else {

        $.ajax({

            url : API,
            dataType: 'json',
            success: function(response) {

                apod = response;
                var title = apod['title'],
                    description = apod['explanation'],
                    url = apod['url']; 

                // Save API response in localStorage along with date to avoid API calls on every new tab.
                localStorage.setItem('apod', JSON.stringify(apod));
                localStorage.setItem('apodDate', todaysDate);

                $("#apod").attr("src", url);
                $('#title').html(title);
                $('#description').html(description);   

            },
            error: function() {

                $("#apod").attr("src", "fallback.jpg");
                $('#title').html("Star Trails");
                $('#description').html("APOD is unreachable. But CAC isn't. Here is a star trail taken at Nagalapuram by Sidharth Srinivasan.");
            
            }

        });

    }

    $('#info-icon').click(function() {
        document.getElementById('info-dialog').showModal();
    }); 

    $('#info-dialog').click(function() {
        document.getElementById('info-dialog').close();
    }); 

});
