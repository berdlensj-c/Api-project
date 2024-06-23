//adds songs to playlist 
function addSong(event) {
    var id = event.target.id
    playlist.push(songsTable[id])
   
    makePlaylistTable()
}
//removes songs from playlist 
function removeSong(event) {
    
    var id = parseInt(event.id.substring(1));
    playlist.splice(id, 1);
    
    makePlaylistTable()
}

//moves song 1 up from the current position 
function moveUp(event) {
    var id = parseInt(event.id.substring(1))
    if (id != 0) {
        const temp = playlist[id]
        playlist[id] = playlist[id - 1]
        playlist[id - 1] = temp
    }
    
    makePlaylistTable()

}
//moves song 1 down from current position 
function moveDown(event) {
    var id = parseInt(event.id.substring(1))
    if (id+1 < playlist.length) {
        const temp = playlist[id]
        playlist[id] = playlist[id + 1]
        playlist[id + 1] = temp
    }
    
    makePlaylistTable()
}

function createButton(text,count) {
    const button = document.createElement('input')
    button.type = "button"
   

    if(text.includes('u')){
        button.value = '\u2191'
        button.id = `u${count}`
       
    }else if(text.includes('d')){
        button.value = '\u2193'
        button.id = `d${count}`
        
    }else{
        button.value = '-'
        button.id = `r${count}`
        
    }

    return button
}
