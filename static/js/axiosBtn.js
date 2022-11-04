

function axiosGame() {
    
    axios({
        method: 'get',
        url: '/game',
        params: '',
    })
    .then((res) => {
        // let mainVedio = document.querySelectorAll('.mainVideo');
        // for (i=0; i=mainVedio.length; i++){
        //     mainVedio[i].classList.add('dpnone');
        // }
        let gameFrame = document.querySelectorAll('.game');
        
        for (i = 0; i < 8; i++){
            gameFrame[i].src = `https://www.youtube.com/embed/${res.data.videoId[i]}`
        }
        
    })
}

