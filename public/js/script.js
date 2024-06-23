
//stores important songs data 
function songObj(songName, artist, picture) {
    this.songName = songName
    this.artist = artist
    this.picture = picture

}
songsTable = []
playlist = []

//get users songs 
function getSong() {

    let songName = document.getElementById('song').value
    if (songName === '') {
        return alert('Please enter a song')
    }


    let response
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = JSON.parse(xhr.responseText)
            makeTable(response.results, songName)
        }
    }

    xhr.open('GET', `/songs?title=${songName}`, true)
    xhr.send()
}

//makes song table 
function makeTable(songs, songName) {


    let songDiv = document.getElementById('songTable')
    let title = document.getElementById('songName')
    let count = 0
    songDiv.innerHTML = '';
    title.textContent = `Songs matching: ${songName}`
    songs.forEach(element => {
        let newItem = document.createElement("input");
        let obj = new songObj(element.trackName, element.artistName, element.artworkUrl60)
        newItem.type = 'button'
        newItem.value = '+'
        newItem.id = `${count}`
        songsTable.push(obj)
        songDiv.innerHTML += `<tr>  <td>${newItem.outerHTML} </td> <td>${element.trackName}</td><td>${element.artistName}</td> <td> <img src=${element.artworkUrl60}></td></tr>`;
        count++
    })

    
}

//makes a table for user playlist 
function makePlaylistTable() {
    var table = document.getElementById("playlistTable")
    table.innerHTML = ''
    var count = 0;


    playlist.forEach(element => {
        var remove = createButton('r', count)
        var up = createButton('u', count)
        var down = createButton('d', count)


        table.innerHTML += `<tr>  <td>${up.outerHTML} ${down.outerHTML} ${remove.outerHTML} </td><td>${element.songName}</td><td>${element.artist}</td> <td> <img src=${element.picture}></td></tr>`;
        count++;
    });

}

