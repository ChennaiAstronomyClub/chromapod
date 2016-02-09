$(document).ready(function() {

    var API = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
        date = new Date(),
        delayedDate = new Date(date.getTime() - 10*60000),
        dateString = delayedDate.toLocaleString('en-US', { timeZone: 'America/New_York' }),
        todaysDate = dateString.split(',')[0]
        apodDate = localStorage.getItem('apodDate');

    // Use the API response in localStorage if the API response has already been obtained.
    if (apodDate == todaysDate) {

        var apod = JSON.parse(localStorage.getItem('apod')),
            title = apod['title'],
            description = apod['explanation'],
            url = apod['url'],
            copyright = ((apod['copyright'] === undefined) ? '' : '<br>Copyright: ' + apod['copyright']); 

        $("#apod").attr("src", url);
        $('#title').html(title);
        $('#description').html(description + copyright); 

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
                    copyright = ((apod['copyright'] === undefined) ? '' : '<br>Copyright: ' + apod['copyright']); 

                // Save API response in localStorage along with date to avoid API calls on every new tab.
                localStorage.setItem('apod', JSON.stringify(apod));
                localStorage.setItem('apodDate', todaysDate);

                if (url.indexOf('youtube') == -1) {
                    $("#apod").attr("src", url);
                }
                else {
                    $("img").replaceWith('<iframe id="apod" src="' + 
                        url + '" style="border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;position: fixed;"></iframe>');
                }
                
                $('#title').html(title);
                $('#description').html(description + copyright);

            },
            error: function() {

                $("#apod").attr("src", "fallback.jpg");
                $('#title').html("Star Trails");
                $('#description').html("APOD is unreachable. But CAC isn't. Here is a star trail taken at Nagalapuram by Sidharth Srinivasan.");
            
            }

        });

    }

    $('#info-icon').hover(function() {
        document.getElementById('info-dialog').showModal();
    }); 

    $('#info-dialog').click(function() {
        document.getElementById('info-dialog').close();
    }); 

});
