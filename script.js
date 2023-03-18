let $ = document

let playBtn = $.querySelector('.changer')
let audioElm = $.querySelector('audio')
let isPlaying = false

let prevBtn = $.getElementById('prevbtn')
let nextBtn = $.getElementById('nextbtn')

let coverImg = $.querySelector('img')
let ArtName = $.getElementById('Aname')
let SoName = $.getElementById('Sname')


let progress = $.querySelector('.progress')
let progressContainer = $.querySelector('.progress-container')
let durElm = $.querySelector('#duration-time')
let curElm = $.querySelector('#current-time')
const musicList = [

    {
        path:
      "audio2.mp3",
    displayName: "My Leach",
    artist: "Cranberries",
    cover:
      "cover-10.jpg",
    },

    {
        path:
      "audio3.mp3",
    displayName: "Bloodline",
    artist: "The Petros",
    cover:
      "cover-1.jpg",
    },

    
    

   
    
]

function playSong(){
    audioElm.play();
    playBtn.classList.add('uil-pause')
    isPlaying = true
}

function pauseSong(){
    audioElm.pause()
    playBtn.classList.remove('uil-pause')
    playBtn.classList.add('uil-play')
    isPlaying = false
}


playBtn.addEventListener('click' , function(){

    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }

})

// next and previous buttons mechanism //

let musicIndex = 0


function loadSong(event){

    console.log(event)

    ArtName.textContent = event.displayName
    SoName.textContent = event.artist
    audioElm.src = event.path
    coverImg.src = event.cover
}

function changeCover(event){

    coverImg.src = event

}


function next(){

    musicIndex++;

    if(musicIndex > musicList.length - 1)
    {
        musicIndex = 0
    }
    loadSong(musicList[musicIndex])
    playSong()
}
function previous(){

    musicIndex--;

    if(musicIndex < 0){

        musicIndex = musicList.length - 1
    }
    else{
        musicIndex = 0
    }
    loadSong(musicList[musicIndex])
    playSong()

    

}


// progress bar changes //


function updateProgress(e){

    const {duration , currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100;
    totalPercent = Math.floor(progressPercent)
    progress.style.width = `${totalPercent}%`


    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)

    if(durationSeconds < 10){

        durationSeconds = "0" + durationSeconds
    }

    if(durationSeconds){
        durElm.textContent = durationMinutes + ":" + durationSeconds

    }


    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)

    if(currentSeconds < 10){

        currentSeconds = "0" + currentSeconds
    }

    curElm.textContent = currentMinutes + ":" + currentSeconds

}

function setProgress(e){

    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audioElm.duration 
    audioElm.currentTime = (clickX / width) * duration
}

audioElm.addEventListener('timeupdate' , updateProgress)
progressContainer.addEventListener('click' , setProgress)
audioElm.addEventListener('ended' , next)


// timeLine Update //


