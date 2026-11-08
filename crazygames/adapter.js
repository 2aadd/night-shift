(() => {
  let sdk, playing=false, reported=false, adPending=false, continueNight;

  function reportGameplay(){
    if(!sdk||playing===reported) return;
    try{
      sdk.game[playing?'gameplayStart':'gameplayStop']();
      reported=playing;
    }catch(error){
      console.warn('CrazyGames gameplay event unavailable',error);
    }
  }

  window.nightShiftPlatform={
    setPlaying(active){
      playing=active;
      reportGameplay();
    },
    nextNight(resume){
      if(adPending) continueNight=resume;
      else resume();
    },
    nightBreak(setAdState){
      // Local SDK requests display a demo overlay. Only request ads on CrazyGames.
      if(sdk?.environment!=='crazygames'||adPending) return;
      adPending=true;
      let finished=false,started=false;
      let timeout=setTimeout(finish,1500);
      function finish(){
        if(finished) return;
        finished=true;
        clearTimeout(timeout);
        adPending=false;
        const resume=continueNight;
        continueNight=undefined;
        if(started) setAdState(false);
        if(resume) resume();
        else if(started) document.querySelector('#start')?.focus({preventScroll:true});
      }
      try{
        const result=sdk.ad.requestAd('midgame',{
          adStarted(){
            if(finished||started) return;
            started=true;
            clearTimeout(timeout);
            timeout=setTimeout(finish,120000);
            setAdState(true);
          },
          adFinished:finish,
          adError:finish
        });
        Promise.resolve(result).catch(finish);
      }catch{
        finish();
      }
    }
  };

  const script=document.createElement('script');
  script.src='https://sdk.crazygames.com/crazygames-sdk-v3.js';
  script.onload=async()=>{
    try{
      const candidate=window.CrazyGames?.SDK;
      if(!candidate) return;
      await candidate.init();
      if(!['crazygames','local'].includes(candidate.environment)) return;
      sdk=candidate;
      reportGameplay();
    }catch(error){
      console.warn('CrazyGames SDK unavailable',error);
    }
  };
  document.head.append(script);
})();
