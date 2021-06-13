let music = document.querySelector('audio')
let prevBTN = document.querySelector('#prev')
let playBTN = document.querySelector('#play')
let nextBTN = document.querySelector('#next')

let title = document.querySelector('#title')
let artist = document.querySelector('#artist')
let img = document.querySelector('img')

let progress = document.querySelector('#progress')
let progressContainer = document.querySelector('#progress-container')

let durationEl = document.querySelector('#duration')
let currentTimeEl = document.querySelector('#current-time')



const songs = [
    {
        name:'justtwoofus',
        displayName:"Just the two of us",
        artist:'Bill Withers'
    },
    {
        name:'Levitating',
        displayName:"Levitating",
        artist:'Dua Lipa'
    },
    {
        name:'staywithme',
        displayName:"Stay with me",
        artist:'Miki Matsubara'
    },
]

// Check if playing
let isPlaying = false;

// Play 
const playSong = () => {
    music.play()
    isPlaying=true
    playBTN.setAttribute('title',"Pause")
    playBTN.classList.replace('fa-play','fa-pause')
}


//Pause
const pauseSong = () => {
    music.pause()
    isPlaying=false
    playBTN.setAttribute('title',"Play")
    playBTN.classList.replace('fa-pause','fa-play')
}


// Play or Pause
playBTN.addEventListener('click',()=>isPlaying ? pauseSong() : playSong())

// Update dom

const loadSong= (song)=>{
    title.textContent = song.displayName;
    artist.textContent = song.artist; 
    music.src = `Music/${song.name}.mp3`
    img.src = `Cover/${song.name}.jpg`
}

let songIndex = 0;

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong()
}

const prevSong = () => {
    if(songIndex< 0){
        songIndex=songs.length - 1
    }
    songIndex--;
    loadSong(songs[songIndex]);
    playSong()
}


// onload site 
loadSong(songs[0])



// Update Progresbar and time
const updateProgressBar = (e) => {
    if(isPlaying){
        const {duration,currentTime} = e.srcElement
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`
        //DUration minutes
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds && durationMinutes) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
       

        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
       
    }
}

const  setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    let clickX = e.offsetX
    const {duration} = music
    let time = (clickX/width) * duration
    music.currentTime = time 
}


prevBTN.addEventListener('click',prevSong)
nextBTN.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgressBar)
progressContainer.addEventListener('click',setProgressBar)