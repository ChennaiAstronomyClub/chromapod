$(document).ready(function() {

    var API = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
        date = new Date(),
        todaysDate = (date.getUTCMonth() + 1).toString() + date.getUTCDate().toString(),
        apodDate = localStorage.getItem('apodDate');

    // Use the API response in localStorage if the API response has already been obtained.
    if (apodDate == todaysDate) {

        var apod = JSON.parse(localStorage.getItem('apod')),
            title = apod['title'],
            description = apod['explanation'],
            url = apod['url'],
            copyright = apod['copyright']; 

        $("#apod").attr("src", url);
        $('#title').html(title);
        $('#description').html(description + '<br>Copyright: ' + copyright); 

    }

    else {

        $.ajax({

            url : API,
            dataType: 'json',
            success: function(response) {

                apod = response;
                var title = apod['title'],
                    description = apod['explanation'],
                    url = apod['url'],
                    copyright = apod['copyright'];  

                // Save API response in localStorage along with date to avoid API calls on every new tab.
                localStorage.setItem('apod', JSON.stringify(apod));
                localStorage.setItem('apodDate', todaysDate);

                $("#apod").attr("src", url);
                $('#title').html(title);
                $('#description').html(description + '<br>Copyright: ' + copyright);

            },
            error: function() {

                $("#apod").attr("src", "fallback.jpg");
                $('#title').html("Star Trails");
                $('#description').html("APOD is unreachable. But CAC isn't. Here is a star trail taken at Nagalapuram by Sidharth Srinivasan.");
            
            }

        });

    }

    $('#info-icon').hover(function() {
        $('info-dialog')[0].showModal();
    }); 

    $('#info-dialog').click(function() {
        $('info-dialog')[0].close();
    }); 

});
