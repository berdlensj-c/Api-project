const ENTER = 13

document.addEventListener('DOMContentLoaded', function () {
    
    //loads user playlist if there is one 
    if(localStorage.getItem("playlist")!=null){
        let playlistString = localStorage.getItem("playlist");
        playlist = JSON.parse(playlistString);
        makePlaylistTable();
    }

    document.getElementById('submit_button').addEventListener('click', getSong)
    document.querySelector('table').addEventListener('click', event=>{
        if(event.target.id.includes("d")){
            moveDown(event.target)
        }else if(event.target.id.includes("u")){
            moveUp(event.target)
        }else if(event.target.id.includes("r")){
            removeSong(event.target)
        }
    })

    document.getElementById('songTable').addEventListener('click', function (event) {
        if (event.target && event.target.nodeName == 'INPUT') {
            addSong(event);
        }
    })
    //add key handler for the document as a whole, not separate elements.
    document.addEventListener('keyup', handleKeyUp)

})
//listens for window close and save users playlist 
window.addEventListener('beforeunload', function(event) {
    
    this.localStorage.setItem("playlist",JSON.stringify(playlist))

});




function handleKeyUp(event, songName) {
    event.preventDefault()
    if (event.keyCode === ENTER) {
        document.getElementById("submit_button").click()
    }
}