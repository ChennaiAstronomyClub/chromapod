const handleApod = (apod) => {
    const { title, explanation: description } = apod;
    let { url } = apod;
    const copyright = apod.copyright ? `<br>Copyright: ${apod.copyright}` : '';
    
    const isVideo = url.includes('youtube') || url.includes('vimeo');
    const isHtml = url.endsWith('.html');
  
    if (!isVideo && !isHtml) {
      $('#apod').attr('src', url);
    } else {
      if (!url.startsWith('https')) {
        url = `https://${url}`;
      }

      $('img').replaceWith(
        `<iframe id="apod" src="${url}" class="apod-iframe"></iframe>`
      );
    }
  
    $('#title').html(title);
    $('#description').html(`${description}${copyright}`); 

    $('#info-icon').hover(function() {
      document.getElementById('info-dialog').showModal();
    }); 

    $('#info-dialog').click(function() {
      document.getElementById('info-dialog').close();
    }); 
  };
  
  $(document).ready(() => {
    const API = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
    const delayedDate = new Date((new Date()).getTime() - 10*60000);
    const dateString = delayedDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
    const [todaysDate] = dateString.split(',');
    const apodDate = localStorage.getItem('apodDate');
  
    // Use the API response in localStorage if the API response has already been obtained.
    if (apodDate == todaysDate) {
      const apod = JSON.parse(localStorage.getItem('apod'));
  
      handleApod(apod);
    } else {
      $.ajax({
        url : API,
        dataType: 'json',
        success: function(response) {
          localStorage.setItem('apod', JSON.stringify(response));
          localStorage.setItem('apodDate', todaysDate);
  
          handleApod(response);
        },
        error: function() {
          $('#apod').attr('src', 'fallback.jpg');
          $('#title').html('Star Trails');
          $('#description').html('APOD is unreachable. But CAC isn\'t. Here is a star trail taken at Nagalapuram by Sidharth Srinivasan.');
        }
      });
    }
  });
  