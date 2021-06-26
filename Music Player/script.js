const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const navButtons = document.querySelectorAll('.slider-btns div');
const dotEl = document.querySelector('.dots');
const musicBtn = document.getElementById('play-music-btn');
const musicCloseBtn = document.getElementById('music-btn-close');
const musicPlayBar = document.getElementById('music-play-bar');
const musicProgress = document.getElementById('music-progress');
const musicDuration = document.getElementById('music-duration');
const musicCurrentTime = document.getElementById('music-current-time');
const volumeBarState = document.getElementById('volume-bar-state');
const musicVolume = document.getElementById('music-volume');
let musicName = document.querySelector('#musicName');
let musicAuthor = document.querySelector('#musicAuthor');
let play = document.querySelector('#play');

let timeoutId;

function getNextPrev() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    let next, prev;

    if (activeIndex === slides.length - 1) {
        next = slides[0];
    } else {
        next = slides[activeIndex + 1];
    }

    if (activeIndex === 0) {
        prev = slides[slides.length-1];
    } else {
        prev = slides[activeIndex - 1];
    }
    return [next, prev];
}

function getPosition() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    const [next, prev] = getNextPrev();

    slides.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.style.transform = 'translateX(0)';
        } else if (slide === prev) {
            slide.style.transform = 'translateX(-100%)';
        } else if (slide === next) {
            slide.style.transform = 'translateX(100%)';
        } else {
            slide.style.transform = 'translate(100%)';
        }
    });
}

function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('next')) getNextSlide()
        else if (button.classList.contains('prev')) getPrevSlide();
    });
});

function getNextSlide() {
    clearTimeout(timeoutId);
    const current = document.querySelector('.slide.active');
    const [next, prev] = getNextPrev();

    current.classList.remove('active');
    current.style.transform = 'translate(-100%)';
    next.style.transform = 'translate(0)';
    next.classList.add('active');
    getPosition();
    getActiveDot();
    autoLoop();
}

function getPrevSlide() {
    clearTimeout(timeoutId);
    const current = document.querySelector('.slide.active');
    const [next, prev] = getNextPrev();

    current.classList.remove('active');
    current.style.transform = 'translateX(100%)';
    prev.style.transform = 'translateX(0)';
    prev.classList.add('active');
    getPosition();
    getActiveDot();
    autoLoop();
}

// dots functions
slides.forEach(slide => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotEl.appendChild(dot);
});

function getActiveDot() {
    const allDots = document.querySelectorAll('.dots .dot');
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);

    allDots.forEach(dot => {
        dot.classList.remove('active'); 
    });

    allDots[activeIndex].classList.add('active');
}

function functionalDots() {
    const allDots = document.querySelectorAll('.dots .dot');
    allDots.forEach((dot,index) => {
        dot.addEventListener('click', () => {
            getDotSlide(index);
        });
    });
}

function getDotSlide(index) {
    clearTimeout(timeoutId);
    slides.forEach(slide => {
        slide.classList.remove('active'); 
    });
    slides[index].classList.add('active');
    getPosition();
    getActiveDot();
    autoLoop();
}

function autoLoop() {
    timeoutId = setTimeout(() => {
        getNextSlide();
    },5000);
}

function showMusicPlayer() {
    const musicPlayer = document.querySelector('.footer-music-player');
    musicPlayer.classList.add('music-player-show');
}

function closeMusicPlayer() {
    const musicPlayer = document.querySelector('.footer-music-player');
    musicPlayer.classList.remove('music-player-show');
}

let timer;
let index = 0;
let playingSong = false;

//create a audio Element
let track = document.createElement('audio');

let allSongs = [
    {
        name: "Circles",
        path: "musics/Circles.mp3",
        singer: "Post Malone"
    },
    {
        name: "Rockstar",
        path: "musics/Rockstar.mp3",
        singer: "Post Malone"
    },
    {
        name: "Better Now",
        path: "musics/betternNow.mp3",
        singer: "Post Malone"
    },{
        name: "WoW",
        path: "musics/wow.mp3",
        singer: "Post Malone"
    }
];

function loadTrack(index) {
    clearInterval(timer);
    track.src = allSongs[index].path;
    track.innerHTML = allSongs[index].name;
    musicAuthor.innerHTML = allSongs[index].singer;
    musicName.innerHTML = allSongs[index].name;
    track.load();
    track.onloadedmetadata = function () {
        var totalDuration = track.duration;
        var time = new Date(totalDuration * 1000).toISOString().substr(11, 8);
        var timeArray = time.split(':');
        if (timeArray.length) {
            timeArray.splice(0, 1);
        }
        var totalDurationString = timeArray.join(':');
        musicDuration.innerHTML = totalDurationString;
    };
    timer = setInterval(rangeSlider, 1000);
}

loadTrack(index);

function playPauseMusic() {
    if (!playingSong) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    track.play();
    playingSong = true;
    play.innerHTML = '<span class="fa fa-5x fa-pause-circle-o"></span>'
}

function pauseSong() {
    track.pause();
    playingSong = false;
    play.innerHTML = '<span class="fa fa-5x fa-play-circle-o""></span>'
}


function nextMusic() {
    if (index < allSongs.length - 1) {
        index += 1;
        loadTrack(index);
        playSong();
    } else {
        index = 0;
        loadTrack(index);
        playSong();
    }
}

function prevMusic() {
     if (index > 0) {
        index -= 1;
        loadTrack(index);
        playSong();
    } else {
         index = allSongs.length;
        loadTrack(index);
        playSong();
    }
}

function updatebar(x) {
    var position = x - musicProgress.offsetLeft;
    var percentage = 100 * position / musicProgress.clientWidth;
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    musicPlayBar.style.width = percentage + "%";
    if (playingSong) {
        changeDuration(percentage);
    }
}

if(musicBtn){
    musicBtn.addEventListener('click', showMusicPlayer);
}

if (musicCloseBtn) {
    musicCloseBtn.addEventListener('click', closeMusicPlayer);
}

var timeDrag = false; /* Drag status */

if (musicPlayBar) {
    musicPlayBar.addEventListener('mousedown', (e) => {
        timeDrag = true;
        updatebar(e.pageX);
    });
    document.addEventListener('mouseup', (e) => {
        if (timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });
    document.addEventListener('mousemove', (e) => {
        if (timeDrag) {
            updatebar(e.pageX);
        }
    });
}

function changeDuration(val) {
    slider_position = track.duration * (val / 100);
	track.currentTime = slider_position;
}

function rangeSlider(){    
    // update slider position
    if (!isNaN(track.duration) && track.currentTime) {
        var totalDurationMin = track.duration / 60;
        var currentDurationMin = track.currentTime / 60;
        var percentage = (currentDurationMin / totalDurationMin) * 100;
        var time = new Date(track.currentTime * 1000).toISOString().substr(11, 8);
        var timeArray = time.split(':');
        if (timeArray.length) {
            timeArray.splice(0, 1);
        }
        var totalDurationString = timeArray.join(':');
        musicCurrentTime.innerHTML = totalDurationString;
        musicPlayBar.style.width = percentage + "%";     
    }
   
    if(track.ended){
        play.innerHTML = '<span class="fa fa-5x fa-play-circle-o""></span>';
	}
}

var volumeDrag = false

if (volumeBarState) {
    volumeBarState.addEventListener('mousedown', (e) => {
        volumeDrag = true;
        upVolumeBar(e.pageX);
    });
    document.addEventListener('mouseup', (e) => {
        if (volumeDrag) {
            volumeDrag = false;
            upVolumeBar(e.pageX);
        }
    });
    document.addEventListener('mousemove', (e) => {
        if (volumeDrag) {
            upVolumeBar(e.pageX);
        }
    });
}

function upVolumeBar(x) {
    var percentage = 60;
    if (x) {
       var position = x - musicVolume.offsetLeft;
        percentage = 100 * position / musicVolume.clientWidth;
        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        } 
    }
    volumeBarState.style.width = percentage + "%";
    volumeChange(percentage)
}

// change volume
function volumeChange(percentage) {
	track.volume = percentage / 100;
}

upVolumeBar();
getPosition();
getActiveDot();
functionalDots();
autoLoop();