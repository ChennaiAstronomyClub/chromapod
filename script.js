$(document).ready(function() {

    var API = 'https://api.nasa.gov/planetary/apod?api_key=0MpJMpfJRaJ0pERmJnXVFQBFqH832R8eAn3gIlft',
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


    // img = $('#apod');
    // img.load(function(argument) {
    //     console.log('caching');
    //     var apod = document.getElementById("apod"),
    //         date = new Date(),
    //         todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString(),
    //         imgCanvas = document.createElement("canvas"),
    //         imgContext = imgCanvas.getContext("2d");
    //     console.log(apod);
    //     // Make sure canvas is as big as the picture
    //     imgCanvas.width = apod.width;
    //     imgCanvas.height = apod.height;
    //     console.log(apod.height);
    //     // Draw image into canvas element
    //     imgContext.drawImage(apod, 0, 0, apod.width, apod.height);

    //     // Save image as a data URL
    //     localStorage.setItem('apod', imgCanvas.toDataURL("image/png"));

    //     // Set date for localStorage
    //     localStorage.setItem('date', todaysDate);

    //     console.log('finished caching');
    //     console.log(localStorage.getItem('apod'));
    // });


});
