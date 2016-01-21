$(document).ready(function() {

    var API = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
        apod;

    $.ajax({

        url : API,
        dataType: 'json',
        success: function(response) {

            apod = response;
            var title = apod['title'],
                description = apod['explanation'],
                url = apod['url']; 
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

    $('#info-icon').click(function() {
        document.getElementById('info-dialog').showModal();
    }); 

    $('#info-dialog').click(function() {
        document.getElementById('info-dialog').close();
    }); 

});
