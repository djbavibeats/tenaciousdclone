var modal = document.getElementById("modal");

let pageY = 0;
let pageX = 0;
let loading = false;


let mobile;

window.onclick = function(event) {
    let video = document.getElementById("myVid");
    console.log(video)
    console.log("HEYyy")
    document.getElementById('myVid').play();
}

$('[id=door]').each(function() {
    var outerThis = $(this);
    loading = true;
    outerThis.click(function(e) {
        if ($(this).hasClass('active')) {
            let num = e.target.classList[1];
            let content = 
            console.log(e.pageX);
            pageX = e.pageX;
            pageY = e.pageY;
            $('#modal').animate({ top: pageY, left: pageX }, "eastInOutCubic", function() {               
                $('#dsp').css({ 'visibility': 'hidden' })
                $('#modal').animate({ width: '100%', height: '100%', top: "0%", left: "0%" }, 500, function(){ 
                    $( "#dynamicCopy" ).load( `./assets/html/${num}.html`); 
                    $( "#body" ).css({ 'overflow': 'hidden' })
                    
                    
                    
                    if (!mobile) {
                        // document.getElementById('dynamicCopy').innerHTML = `<iframe id="loading" allowfullscreen='false' webkitallowfullscreen='false' mozallowfullscreen='false' playsinline src="https://www.dropbox.com/s/t9fzi6itk5grn7p/Tenacious%20D%20Reacts%20V3.mp4?raw=1" width="100%" height="500px" frameBorder="0" style="border: 0;"></iframe>`
                    } else {
                        // document.getElementById('dynamicCopy').innerHTML = `<iframe id="loading" allowfullscreen='false' webkitallowfullscreen='false' mozallowfullscreen='false' playslinline src="https://www.dropbox.com/s/t9fzi6itk5grn7p/Tenacious%20D%20Reacts%20V3.mp4?raw=1" width="100%" height="300px" frameBorder="0" style="border: 0;"></iframe>`
                    }                
                });
                document.getElementById("modal").style.display = "block";
            })  
        } else {
            console.log("Not active!")
            
        }
    })
});

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

window.onclick = function(event) {
    if(document.getElementById('myVideo').playing){ // checks if element is playing right now
        // Do anything you want to
        console.log("Already playing")
    } else {
        console.log(document.getElementById('myVideo'));
    }
    document.getElementById('myVideo').play();

    if (event.target == modal) {
        console.log("WHERE")
        $('#modal').animate({ width: '0%', height: '0%', top: pageY, left: pageX }, 'easeInOutCubic', function(){ 
            modal.style.display = "none";
            document.getElementById('dynamicCopy').innerHTML = ``
            $('#dsp').css({ 'visibility': 'visible' })
            $( "#body" ).css({ 'overflow': 'auto' })

        });
        $('#dynamicPhoto').animate({ minHeight: '0vh' }, 'easeInOutCubic', function() {});
    }
}

console.log(document.getElementById('exit-modal'));
function closeModal() {
    console.log("here")
    $('#modal').animate({ width: '0%', height: '0%', top: pageY, left: pageX }, 'easeInOutCubic', function(){ 
        modal.style.display = "none";
        document.getElementById('dynamicCopy').innerHTML = ``
        $('#dsp').css({ 'visibility': 'visible' })
        $( "#body" ).css({ 'overflow': 'auto' })

    });
    $('#dynamicPhoto').animate({ minHeight: '0vh' }, 'easeInOutCubic', function() {});

}

function submitForm() {
    let email = document.getElementById('email').value;
    let dspSubmit;
    if (document.querySelector('input[name = "dsp"]:checked')) {
        dspSubmit = document.querySelector('input[name = "dsp"]:checked').value;
    } else {
        dspSubmit = "spotify";
    }
    
    document.cookie = `email_signup=${email}`;
    document.cookie = `dsp=${dspSubmit}`;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let info = {
            email: email,
            dsp: [ dspSubmit ]
        }
   
        fetch('https://api.sendinblue.com/v3/contacts?limit=50&offset=0&sort=desc', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'api-key': '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'


            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                'email': email
            }) 
        }).then(resp => {
            resp.json().then(data => {
                if (data.code === "duplicate_parameter") {

                } else {

                }
            });
        })

        document.getElementById('landing-modal').style.display = 'none';
        document.getElementById('site-link').style.display = 'block';
        loadStreaming(dspSubmit);
    } else {
        alert("Please enter a valid email!")
    }
}


$(window).resize(function() {
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile')
        if (window.matchMedia("(orientation: portrait)").matches) {
            console.log('portrait')
            mobile = true;
    
            let dsp = document.getElementById('dsp');
            console.log(dsp);
            document.getElementById('background').insertAdjacentElement('afterend', dsp);
            
            $( "#dsp-header" ).css({ 'display': 'none' });
            let background = document.querySelector('.background');

            $( "#dsp" ).css({
                'position': 'relative',
                'display': 'block',
                'zIndex': '1',
                'width': '100%',
                'left': '0',
                'top': '0',
                'maxWidth': 'none',
                'margin-top': '110vh'
            })

            $( "#mobile" ).css({
                'display': 'block'
            })

            $( "#desktop" ).css({
                'display': 'none'
            })
            $( "#myVideo").css({
                'display': 'none'
            })
        }
    
        if (window.matchMedia("(orientation: landscape)").matches) {
            console.log('landscape')
            mobile = true;
    
            let dsp = document.getElementById('dsp');
            console.log(dsp);
            document.getElementById('background').insertAdjacentElement('afterend', dsp);
            
            $( "#dsp-header" ).css({ 'display': 'none' });
            let background = document.querySelector('.background');

            $( "#dsp" ).css({
                'position': 'relative',
                'display': 'block',
                'zIndex': '1',
                'width': '100%',
                'left': '0',
                'top': '0',
                'maxWidth': 'none',
                'margin-top': background.offsetWidth - 150
            })

            $( "#mobile" ).css({
                'display': 'none'
            })

            $( "#desktop" ).css({
                'display': 'block'
            })
            $( "#myVideo").css({
                'display': 'block'
            })
        }
    
    } else {
        if (/iPad/i.test(navigator.userAgent)) {
            console.log("ipad")
            mobile = true;
            let dsp = document.getElementById('dsp');
            console.log(dsp);
            document.getElementById('background').insertAdjacentElement('afterend', dsp);
            
            $( "#dsp-header" ).css({ 'display': 'none' });
            let background = document.querySelector('.background');
            if (window.matchMedia("(orientation: landscape)").matches) {
                $( "#dsp" ).css({
                    'position': 'relative',
                    'display': 'block',
                    'zIndex': '1',
                    'width': '100%',
                    'left': '0',
                    'top': '0',
                    'maxWidth': 'none',
                    'margin-top': background.offsetHeight
                })
            } else if (window.matchMedia("(orientation: portrait)").matches) {
                $( "#dsp" ).css({
                    'position': 'relative',
                    'display': 'block',
                    'zIndex': '1',
                    'width': '100%',
                    'left': '0',
                    'top': '0',
                    'maxWidth': 'none',
                    'margin-top': background.offsetHeight                })
            }
        } else {
            console.log('desktop')
            mobile = false;
            $( "#dsp" ).draggable({ cursor: "move", cursorAt: { top: 10, left: 50 } });
        }
    }
    }).resize();

function loadStreaming(platformName) {
    console.log(platformName)
    switch(platformName) {
        case('spotify'):
            if (mobile) {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe id="spotify" src="https://open.spotify.com/embed/album/1AckkxSo39144vOBrJ1GkS?theme=0" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
            } else {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe id="spotify" src="https://open.spotify.com/embed/album/1AckkxSo39144vOBrJ1GkS?theme=0" width="300" height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
            }
            break;
        case('apple'):
            if (mobile) {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe src="https://embed.music.apple.com/us/album/tenacious-d/385553664?app=music&amp;itsct=music_box_player&amp;itscg=30200&amp;ct=albums_tenacious_d&amp;ls=1" height="300px" frameborder="0" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="autoplay *; encrypted-media *;" style="width: 100%; max-width: 100%; overflow: hidden; border-radius: 10px; background: transparent;"></iframe>` 
            } else {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe src="https://embed.music.apple.com/us/album/tenacious-d/385553664?app=music&amp;itsct=music_box_player&amp;itscg=30200&amp;ct=albums_tenacious_d&amp;ls=1" height="300px" frameborder="0" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="autoplay *; encrypted-media *;" style="width: 100%; max-width: 300px; overflow: hidden; border-radius: 10px; background: transparent;"></iframe>` 
            }
            break;
        case('tidal'):
            if (mobile) {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe src="https://embed.tidal.com/tracks/5119732" allowfullscreen="allowfullscreen" frameborder="0" style="width:100%;height:96px"></iframe>` 
            } else {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe src="https://embed.tidal.com/tracks/5119732" allowfullscreen="allowfullscreen" frameborder="0" style="width:300px;height:96px"></iframe>` 
            }
            break;
        case('amazon'):
            if (mobile) {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe id='AmazonMusicEmbedB003YOASY2' src='https://music.amazon.com/embed/B003YOASY2/?id=QbILIUuadD&marketplaceId=ATVPDKIKX0DER&musicTerritory=US' width='100%' height='100px' style='border:1px solid rgba(0, 0, 0, 0.12);max-width:'></iframe>`
            } else {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe id='AmazonMusicEmbedB003YOASY2' src='https://music.amazon.com/embed/B003YOASY2/?id=QbILIUuadD&marketplaceId=ATVPDKIKX0DER&musicTerritory=US' width='100%' height='300px' style='border:1px solid rgba(0, 0, 0, 0.12);max-width:'></iframe>`
            }
            break;
        default:
            if (mobile) {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe id="spotify" src="https://open.spotify.com/embed/album/1AckkxSo39144vOBrJ1GkS?theme=0" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
            } else {
                document.getElementById("dsp").innerHTML = `<div id="dsp-header">Tenacious D</div><iframe id="spotify" src="https://open.spotify.com/embed/album/1AckkxSo39144vOBrJ1GkS?theme=0" width="300" height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
            }
            break;
    }
}

if (getCookie('email_signup')) {
    document.getElementById('landing-modal').style.display = 'none';
    loadStreaming(getCookie('dsp'))
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}