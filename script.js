const cards = document.querySelectorAll('.memory-card');

     let hasFlipCard = false ;
     let lockBoard = false ;
     let firstCard, secondCard ;
     let counter = 0 ;
     let noc = 0 ;
     var elm = document.getElementById("timer");
     var interval ;
     document.body.style.background = "url('img/bg1.jpg')"; 

function timer() {
    var then = new Date().getTime();    
     interval = setInterval(()=>{
    var distance = then + Number(elm.getAttribute("data")) - new Date().getTime();
    var minutes = Math.floor((distance % (1000*60*60))/(1000*60));
        var seconds = Math.floor((distance % (1000*60))/1000);
    
    elm.innerHTML = minutes+":"+seconds ;

    if(distance <= 0){
        clearInterval(interval); 
        swal({
            title: "Sorry! You Lose.",
            text: "Play Again ?",
             closeOnClickOutside: false,
             buttons: true,
             dangerMode: true,
        }).then((playAgain) => {
  if (playAgain) {
       document.location.reload();
  } else {
    swal("I hope You Liked this Game",{
        icon:"info",
        buttons:false,
        closeOnClickOutside: false,
    });
            setTimeout(()=>location.href="index.html",3000);
      }
  });   
      }
    }, 1000);
  }

    document.addEventListener("DOMContentLoaded", timer);


function flipcard(){
             if(lockBoard)
                 return ;
     
     if(this === firstCard)
         return ;
    
        this.classList.add('flip');
               if(!hasFlipCard){
                      hasFlipCard = true ;
                      firstCard = this ;
                       return ;
          }
    
                secondCard = this ;
                   
                if(firstCard.dataset.framework === secondCard.dataset.framework){
                    firstCard.removeEventListener('click',flipcard);
                    secondCard.removeEventListener('click',flipcard);
                    resetBoard();
                    counter += 2;
                    if(counter == noc){  
                                clearInterval(interval); 
                        swal({
                            icon :"success",
                           title: "Hurrey! You Won.",
                           text: "Want to Play Next Level ?",
                           closeOnClickOutside: false,
                           buttons: true,
                           dangerMode: true,
                       }).then((yes) => {
                         if (yes) {
                                 nextLevel();
                               } else {
                                 swal("I hope You Liked this Game",{
                                    icon:"info",
                                    buttons:false,
                                   closeOnClickOutside: false,
                               });
                         setTimeout(()=>location.href="index.html",3000);
                        }
                });
          }
                    
            } else{
                    lockBoard = true ;
                    setTimeout(()=> {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        resetBoard();
                    },1500);
                    
                }
           }


function resetBoard(){
    firstCard = null;
    secondCard = null ;
    hasFlipCard = false ;
    lockBoard = false ;
}

(function shuffle(){cards.forEach(card =>{
           let randomPos = Math.floor(Math.random() * 30);
    card.style.order = randomPos ;
    noc++ ;
              });
                   })();



cards.forEach(card => card.addEventListener('click',flipcard));
