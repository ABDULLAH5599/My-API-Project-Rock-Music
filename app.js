const searchSong = () => {
 
    const searchText= document.getElementById("search-field").value;
 
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySong(data.data))
    .catch(error => displayError("Something Went Wrong!! Please Try Again Later"))
}

const displaySong = songs => {
    const songItem= document.getElementById("SongitemList");
    songItem.innerHTML= " ";
  songs.forEach(song =>{
      const songDiv = document.createElement("div");
      songDiv.className= "single-result row align-items-center my-3 p-3";
      songDiv.innerHTML= `
    <div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
         <source src="${song.preview}" type="audio/mpeg">     
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
    <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div> 
 `
      songItem.appendChild(songDiv);
  });
  
}
const getLyric = (artist, title) =>{

const lyric= `https://api.lyrics.ovh/v1/${artist}/${title}`
fetch(lyric)
.then(res => res.json())
.then(data => displayLyrics(data.lyrics))


};
const displayLyrics = lyrics => {
     const getLyricsDiv= document.getElementById("single-lyrics");
     getLyricsDiv.innerText=lyrics;
}
const displayError = error =>{
     const errorDiv=document.getElementById("showError");
     errorDiv.innerText=error;
}