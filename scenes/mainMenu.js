document.addEventListener("DOMContentLoaded", function() {

  const SceneManager = {
    currentScene: "menuScene",
    scenes: {
      menuScene: {bg: '../image/homeScreen.png', element: document.getElementById("menuScene")},
      optionScene: {bg: '../image/homeScreen2.png', element: document.getElementById("optionScene")},
      blackScene: {bg: '../image/blackScreen.jpg', element: document.getElementById("blackScene")},
      bedScene: {bg: '../image/bedroomBG.png', element: document.getElementById("bedScene")},
      parkScene: {bg: '../image/parkBG.png', element: document.getElementById("parkScene")},
      cafeScene: {bg: '../image/cafeBG.png', element: document.getElementById("cafeScene")},
      partyScene: {bg: '../image/partyBG.png', element: document.getElementById("partyScene")},
      end1Scene: {bg: '../image/end3.png', element: document.getElementById("end1Scene")},
      end2Scene: {bg: '../image/end2.png', element: document.getElementById("end2Scene")},
      end3Scene: {bg: '../image/end1.png', element: document.getElementById("end3Scene")}
    },
    switch(sceneId) {
      Object.values(this.scenes).forEach(scene => {
        if (scene.element) scene.element.classList.remove('active');
      }); 
      const scene = this.scenes[sceneId];
      if (scene) {
        scene.element.classList.add("active");
        document.body.style.backgroundImage = `url('${scene.bg}')`;
        this.currentScene = sceneId;

        //resets the indices when switching scenes
        if(sceneId === 'bedScene') {
          bedStepIndex = 0;
          clickCount = 0;
          overlayActive = false;
          if (diagBox) diagBox.style.display = 'none';
          if (overlay) overlay.style.display = 'none';
          if (characterName) characterName.style.display = 'none';
          if (characterDiag) characterDiag.style.display = 'none';
          choiceContainer.style.display = 'none';
        }
        if(sceneId === 'parkScene') {
          parkStepIndex = 0;
          clickCount = 0;
          overlayActive = false;
          if (diagBox) diagBox.style.display = 'none';
          if (overlay) overlay.style.display = 'none';
          if (characterName) characterName.style.display = 'none';
          if (characterDiag) characterDiag.style.display = 'none';
          choiceContainer.style.display = 'none';
        }
        if(sceneId === 'cafeScene') {
          cafeStepIndex = 0;
          clickCount = 0;
          overlayActive = false;
          if (diagBox) diagBox.style.display = 'none';
          if (overlay) overlay.style.display = 'none';
          if (characterName) characterName.style.display = 'none';
          if (characterDiag) characterDiag.style.display = 'none';
          choiceContainer.style.display = 'none';
        }
        if(sceneId === 'partyScene') {
          partyStepIndex = 0;
          clickCount = 0;
          overlayActive = false;
          if (diagBox) diagBox.style.display = 'none';
          if (overlay) overlay.style.display = 'none';
          if (characterName) characterName.style.display = 'none';
          if (characterDiag) characterDiag.style.display = 'none';
          choiceContainer.style.display = 'none';
        }
      }
    }
  };

  document.querySelectorAll('[data-scene]').forEach(button => {
    button.addEventListener('click', function() {
      const sceneId = this.getAttribute('data-scene');
      SceneManager.switch(sceneId);
    });
  });

  const singlePlayerBtn = document.querySelector('.button:first-child');
  if (singlePlayerBtn && !singlePlayerBtn.hasAttribute('data-scene')) {
    singlePlayerBtn.addEventListener('click', function() {
      SceneManager.switch('optionScene');
    });
  }

  const playerData = {
    name: "",
  };
  let playerPoints = 0;

  document.getElementById("gameStart").addEventListener("click", function() {
      const name = document.getElementById("nameInput").value;
      const dob = document.getElementById("dobInput").value;
      const hobby = document.querySelector("input[name='hobby']:checked");
      const habits = document.querySelectorAll("input[name='habit']:checked");

      if (!name || !dob || !hobby || habits.length === 0) {
        document.getElementById("output").innerText = "Please fill in all fields";
        return;
      }
      
      playerData.name = name;
      
      SceneManager.switch("blackScene");
  });
  
  //gets the elements
  const bedScreen = document.getElementById("bedScene");
  const parkScreen = document.getElementById("parkScene");
  const cafeScreen = document.getElementById("cafeScene");
  const partyScreen = document.getElementById("partyScene");
  const end1Screen = document.getElementById("end1Scene");
  const end2Screen = document.getElementById("end2Scene");
  const end3Screen = document.getElementById("end3Scene");

  const overlay = document.getElementById('overlay');
  const popUpImage = document.getElementById('popUpImage');
  const diagBox = document.getElementById('dialogueBox');
  
  const characterName = document.querySelector('.characterName');
  const characterDiag = document.querySelector('.dialogueText');
  const dialogueContent = document.querySelector('.dialogueContent');

  //to create choice container once
  const choiceContainer = document.createElement('div');
  choiceContainer.id = 'choiceContainer';
  choiceContainer.style.display = 'none';
  choiceContainer.style.marginTop = '20px';
  choiceContainer.style.textAlign = 'center';
  
  //adding to dialogue content
  if (dialogueContent) {
    dialogueContent.appendChild(choiceContainer);
  }

  //initializing variables
  let bedStepIndex = 0;
  let parkStepIndex = 0;
  let cafeStepIndex = 0;
  let partyStepIndex = 0;
  let end1StepIndex = 0;
  let end2StepIndex = 0;
  let end3StepIndex = 0;
  let overlayActive = false;
  let clickCount = 0;

  //hiding everything initially
  if (diagBox) diagBox.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  if (characterName) characterName.style.display = 'none';
  if (characterDiag) characterDiag.style.display = 'none';

  //BED SEQUENCE
  const bedSequence = [
    { type: 'dialogue', character: "player", text: "I need to get coffee..." },
    { type: 'overlay', image: '../image/coffeeMugUnpressed.png' },
    { type: 'overlay', image: '../image/coffeeMugPressed.png' }, 
    { type: 'dialogue', character: "player", text: "Oh no! The mug is broken!" },
    { type: 'overlay', image: '../image/shatteredMug1.png' },
    { type: 'dialogue', character: "Narrator", text: "You're getting a text." },
    { type: 'dialogue', character: "Friend", text: "Hey??? We're supposed to be going out to the party later today! Do I need to break down ur door???" },
    { type: 'dialogue', character: "player", text: "\u{1F44D}" },
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "u haven't been responding to anything. u sure ur okay?",
      choices: [
        { text: "Not great. Trying to do better.", points: 1 },
        { text: "I'm doing fine ig", points: 0 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Is this about Charlie?" },
    { type: 'dialogue', character: "player", text: "Yeah, things haven't been great recently." },
    { type: 'dialogue', character: "Friend", text: "With you or between y'all??" },
    { type: 'dialogue', character: "player", text: "Both." },
    { type: 'dialogue', character: "player", text: "Haven't been doing too hot." },
    { type: 'dialogue', character: "Friend", text: "If you need anything, I'm here for you. I think you should get out and about before the party." },
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "If you want, we could do something right now?",
      choices: [
        { text: "...", points: 0 },
        { text: "Yeah I think I need to get out.", points: 1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "A stroll in the park would be perfect right now." },
    { type: 'dialogue', character: "player", text: "Fine..." },
    { type: 'dialogue', character: "Friend", text:"Great!!! I'll see you in a bit! We can talk more about it there too, if you want." },
    { type: 'dialogue', character: "player", text: "See you." }
  ];

  //PARK SEQUENCE
  const parkSequence = [
    { type: 'dialogue', character: "player", text: "I need to put on a coat."},
    { type: 'dialogue', character: "player", text: "Here we go."},
    { type: 'dialogue', character: "Narrator", text: "You should leave for the park now."},
    { type: 'dialogue', character: "player", text: "Where are they?"},
    { type: 'dialogue', character: "player", text: "There they are."},
    { type: 'dialogue', character: "player", text: "Hey"},
    { type: 'dialogue', character: "Friend", text: "Hey"},
    { type: 'dialogue', character: "Narrator", text: "Queue the uncomfortable silence."},
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "You doing good?",
      choices: [
        { text: "...", points: 0 },
        { text: "Nah, not really.", points: 1 },
        { text: "...sorry for not really being around.", points: 1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Let's go on a walk."},
    { type: 'dialogue', character: "player", text: "Okay..."},
    { type: 'dialogue', character: "Friend", text: "And let's talk."},
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "Have you been eating well, sleeping well?",
      choices: [
        { text: "Fine.", points: 0 },
        { text: "It's been kind of hard.", points: 1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Okay, that's fine."},
    { type: 'dialogue', character: "Friend", text: "You should at least get out more. Being indoors all day isn't great for you."},
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "Are you still hurting from the fight?",
      choices: [
        { text: "No.", points: 0 },
        { text: "...yeah.", points: 1 }
      ]
    },
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "You gonna talk to them again?",
      choices: [
        { text: "Don't plan to.", points: 0 },
        { text: "I'd like to.", points: 1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Well, I wanted to make sure that you're all good. Either way, you should clear up your head. I gotta run some errands, you should stop by the cafe."},
    { type: 'dialogue', character: "Friend", text: "It's nice out today too, good you got some fresh air. I'll see-ya at the party."},
    { type: 'dialogue', character: "player", text: "Bye, thanks."},
    { type: 'dialogue', character: "Friend", text: "Bye-ya!"}
  ];

  //CAFE SEQUENCE
  const cafeSequence = [
    { type: 'dialogue', character: "Narrator", text: "It's time to get to the cafe."},
    { type: 'dialogue', character: "Narrator", text: "That way to the cafe"},
    { type: 'dialogue', character: "Narrator", text: "Go and order something."},
    { type: 'dialogue', character: "player", text: "..."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "Hey, how ya doing! Haven't seen you in a hot second!",
      choices: [
        { text: "Doing fine, just went outta town for a bit.", points: 0},
        { text: "Haven't been out too much", points: 1}
      ]
    },
    { type: 'dialogue', character: "Barista", text: "I mean, I've seen ya walk by every day. But I haven't seen ya walk into the shop."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "Anyway, pick your order.",
      choices: [
        { text: "Espresso"},
        { text: "Americano"},
        { text: "Cappucino"},
        { text: "Latte"}
      ]
    },
    { type: 'dialogue', character: "Barista", text: "I know when something's up with you, how's it been?"},
    { type: 'dialogue', character: "player", text: "It's been pretty rough, yeah."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "Is it something with Charlie? They seem down too.",
      choices: [
        { text: "...maybe.", points: 0},
        { text: "Yeah, it is.", points: 1 }
      ]
    },
    { type: 'dialogue', character: "Barista", text: "Aren't ya'll dating?"},
    { type: 'dialogue', character: "player", text: "We...had a fight."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "About what?",
      choices: [
        { text: "They were making one outta thin air.", points: 0},
        { text: "I can't even remember...", points: 1 }
      ]
    },
    { type: 'dialogue', character: "Barista", text: "That really sucks. I've been through similar stuff."},
    { type: 'dialogue', character: "Barista", text: "It's tough in the beginning, but you got this."},
    { type: 'dialogue', character: "Barista", text: "Well here's your coffee, nice choice by the way. Drink up and I hope things go better for you."},
    { type: 'dialogue', character: "player", text: "Thanks."},
  ];

  //PARTY SEQUENCE
  const partySequence = [

  { type: 'dialogue', character: "Friend", text: "Are u here??? I'm waiting for you."},
  { type: 'dialogue', character:"player", text: "Soon, my bus gets off in a couple of stops."},
  { type: 'dialogue', character: "Friend", text: "OK, how r ud oing?"},
  { type: 'dialogue', character: "player", text: "Type a bit slower."},
  { type: 'dialogue', character: "Friend", text: "I said how r u doing?"},
  { type: 'dialogue', character: "player", text: "Fine, we met and talked it out a bit."},
  { type: 'dialogue', character: "Friend", text: "Oh, how did that go?"},
  { type: 'dialogue', character: "player", text: "Fine, I'd much rather party right now instead of talking about it."},
  { type: 'dialogue', character: "Friend", text: "All good."},
  { type: 'dialogue', character: "player", text: "I'm about to get off."},
  { type: 'dialogue', character: "Friend", text: "See you in a sec!!!"},
  { type: 'dialogue', character: "Narrator", text: "You arrive at the party."},
  { type: 'dialogue', character: "Friend", text: "Have fun and walk around, meet someone new. Don't be so down!"},
  { type: 'dialogue', character: "player", text: "I'll have fun."},
  { type: 'dialogue', character: "Narrator", text: "You mingle around the party."},
  { type: 'dialogue', character: "Narrator", text: "Uh oh."},
  { type: 'dialogue', character: "Narrator", text: "It's them."},
  { type: 'dialogue', character: "Charlie", text: "Did you follow me here?"},
  { type: 'dialogue', character: "player", text: "No! My friend invited me here."},
  { type: 'dialogue', character: "Charlie", text: "Did your friend stalk me for you?"},
  { type: 'dialogue', character: "player", text: "..."},
  { type: 'dialogue', character: "Charlie", text: "Sorry."},
  { type: 'dialogue', character: "player", text: "Could we just party without this being a problem?"},
  { type: 'dialogue', character: "Charlie", text: "You sure you can make it not be a problem?"},
  { type: 'dialogue', character: "player", text: "Yeah. Can you?"},
  { type: 'dialogue', character: "Charlie", text: "Yeah."},
  { type: 'dialogue', character: "player", text: "We should talk about this later."},
  { type: 'dialogue', character: "Charlie", text: "Okay, I'll see you later."},
  { type: 'dialogue', character: "Narrator", text: "You go party elsewhere."},
  { type: 'dialogue', character: "Narrator", text: "Hours later..."},

  { type: 'dialogue', character: "Friend", text: "Hey, it's time you get back home."},
  { type: 'dialogue', character: "player", text: "I'm having fun though!"},
  { type: 'dialogue', character: "Friend", text: "The host wants people out soon, we kinda have to get going."},
  { type: 'dialogue', character: "player", text: "Fine... let's get going!"},
  { type: 'dialogue', character: "Friend", text: "Come along with me, come on."},
  { type: 'dialogue', character: "Narrator", text: "You head home."}
  ];

  //Ending 1
  const end1Sequence = [
  { type: 'dialogue', character: "player", text: "*Should I text them?*"},
  { type: 'dialogue', character: "player", text: "*...No. It's fine.*"},
  { type: 'dialogue', character: "Narrator", text: "You put your phone down and try to move on without saying anything."},
  { type: 'dialogue', character: "Narrator", text: "Ignoring how you felt didn't make it disappear."},
  { type: 'dialogue', character: "Narrator", text: "The lack of closure followed you into the next relationship..."},
  { type: 'dialogue', character: "Narrator", text: "and the next relationship, and the next..."},
  { type: 'dialogue', character: "Narrator", text: "Each one ended for different reasons, but the same unresolved patterns.."},
  { type: 'dialogue', character: "Narrator", text: "kept showing up. Over time, the weight of all those unfinished conversations..."},
  { type: 'dialogue', character: "Narrator", text: "left you more guarded and more tired than before."}
  ];

  //Ending 2
  const end2Sequence = [
  { type: 'dialogue', character: "player", text: "*I should text them.*" },
  { type: 'dialogue', character: "player", text: "*I don't like how we left things.*" },
  { type: 'dialogue', character: "player", text: "Hey. Do you have a minute to talk?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. What's up?" },
  { type: 'dialogue', character: "player", text: "I've been thinking about everything." },
  { type: 'dialogue', character: "player", text: "I didn't handle things well." },
  { type: 'dialogue', character: "player", text: "I picked fights I didn't need to and made stuff harder than it had to be." },
  { type: 'dialogue', character: "Charlie", text: "I appreciate you saying that." },
  { type: 'dialogue', character: "Charlie", text: "I could've handled things better too." },
  { type: 'dialogue', character: "player", text: "Maybe we could talk in person? Tomorrow?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. That sounds good." },
  { type: 'dialogue', character: "Narrator", text: "You met up the next day and decided to try again." },
  { type: 'dialogue', character: "Narrator", text: "It didn't last forever, but for a while, things felt steady and easy between you guys." },
  ];

  //Ending 3
  const end3Sequence = [
  { type: 'dialogue', character: "player", text: "*I shouldn't let it just end like that.*" },
  { type: 'dialogue', character: "player", text: "Hey. Can we talk for a minute?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. What's up?" },
  { type: 'dialogue', character: "player", text: "I've been thinking about how things ended." },
  { type: 'dialogue', character: "player", text: "I'm sorry for how I handled it." },
  { type: 'dialogue', character: "player", text: "I don't want us to leave it on a bad note." },
  { type: 'dialogue', character: "player", text: "I want things to be mended over ended." },
  { type: 'dialogue', character: "Charlie", text: "Okay..." },
  { type: 'dialogue', character: "Charlie", text: "I'm sorry too." },
  { type: 'dialogue', character: "Charlie", text: "I didn't deal with it very well either." },
  { type: 'dialogue', character: "Charlie", text: "I don't want things to be weird between us." },
  { type: 'dialogue', character: "player", text: "Maybe we could just stay in touch." },
  { type: 'dialogue', character: "player", text: "We don't have to try again." },
  { type: 'dialogue', character: "player", text: "Just... be on good terms. Does that sound okay?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. I'd like that." }, 
  { type: 'dialogue', character: "Narrator", text: "You and Charlie went your separate ways. With some distance..."},
  { type: 'dialogue', character: "Narrator", text: "you both recognized the parts of the relationship that weren't healthy and accepted..."},
  { type: 'dialogue', character: "Narrator", text: "that you guys didn't work as a couple. Over time, they moved on and stayed friends."}
  ];

  function showChoices(choices, sceneType) {
    //clearing previous choices
    choiceContainer.innerHTML = '';
    
    //buttons for each choice
    choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      
      btn.style.display = 'block';
      btn.style.width = '80%';
      btn.style.margin = '10px auto';
      btn.style.padding = '10px';
      btn.style.backgroundColor = '#e1a4a4';
      btn.style.border = '2px solid rgb(92, 19, 33)';
      btn.style.borderRadius = '5px';
      btn.style.cursor = 'pointer';
      btn.style.fontFamily = 'Cabin Sketch, sans-serif';
      btn.style.fontSize = '17px';
      
      btn.onmouseover = () => btn.style.backgroundColor = '#b76f6f';
      btn.onmouseout = () => btn.style.backgroundColor = '#e1a4a4';
      
      btn.onclick = (e) => {
        e.stopPropagation();
        
        playerPoints += choice.points || 0;
        console.log("Total points:", playerPoints);
        
        //hiding the choices and dialogue
        choiceContainer.style.display = 'none';
        diagBox.style.display = 'none';
        if (characterName) characterName.style.display = 'none';
        if (characterDiag) characterDiag.style.display = 'none';

        
        //move to next step based on scene
        if (sceneType === 'bed') {
          bedStepIndex++;
        } else if (sceneType === 'park') {
          parkStepIndex++;
        } else if (sceneType === 'cafe') {
          cafeStepIndex++;
        } else if (sceneType === 'party') {
          partyStepIndex++;
        }
        clickCount = 0;
      };
      
      choiceContainer.appendChild(btn);
    });
    
    //dialogue text hidden, show choices
    if (characterDiag) characterDiag.style.display = 'none';
    choiceContainer.style.display = 'block';
  }

  function showOverlay(step) {
    if (!step) return;

    //dialogue box hidden when overlay is active
    if (diagBox) diagBox.style.display = 'none';
    if (characterName) characterName.style.display = 'none';
    if (characterDiag) characterDiag.style.display = 'none';
    choiceContainer.style.display = 'none';

    if (popUpImage) popUpImage.src = step.image;
    if (overlay) {
      overlay.style.display = 'block';
      overlayActive = true;
      clickCount = 0;
    }
  }

  function hideOverlay() {
    overlay.style.display = 'none';
    overlayActive = false;
    clickCount = 0; // ← RESET HERE!!!!!!!!!!
}

  // OVERLAY CLICK HANDLER!!
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      e.stopPropagation();
      
      //if clicking on the image itself
      if (e.target === popUpImage) {
        if (popUpImage.src.includes('Unpressed')) {
          popUpImage.src = popUpImage.src.replace('Unpressed', 'Pressed');
          console.log("Image pressed");
          return;
        }
      }
      
      //any other clicksss, closes overlay
      hideOverlay();
      
      //advances the right scene index 
      if (SceneManager.currentScene === 'bedScene') {
        bedStepIndex++;
      } else if (SceneManager.currentScene === 'parkScene') {
        parkStepIndex++;
      } else if (SceneManager.currentScene === 'cafeScene') {
        cafeStepIndex++;
      } else if (SceneManager.currentScene === 'partyScene') {
        partyStepIndex++;
      }
      
      //if next step is overlay, show immediately :)))
      let nextStep;
      if (SceneManager.currentScene === 'bedScene') {
        nextStep = bedSequence[bedStepIndex];
      } else if (SceneManager.currentScene === 'parkScene') {
        nextStep = parkSequence[parkStepIndex];
      } else if (SceneManager.currentScene === 'cafeScene') {
        nextStep = cafeSequence[cafeStepIndex];
      } else if (SceneManager.currentScene === 'partyScene') {
        nextStep = partySequence[partyStepIndex];
      }
        
      if (nextStep && nextStep.type === 'overlay') {
        showOverlay(nextStep);
      }
    });
  }

  // BED SCREEN CLICK HANDLER
  if (bedScreen) {
    bedScreen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'bedScene') return;
      if (overlayActive ) return; 
      console.log("Bed click - stepIndex:", bedStepIndex, "clickCount:", clickCount, "overlayActive:", overlayActive);
      console.log("Current step:", bedSequence[bedStepIndex]);

      if (overlayActive) return;

      const step = bedSequence[bedStepIndex];
      
      if (!step) {
        diagBox.style.display = 'none';
        SceneManager.switch("parkScene");
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'bed');
          } else {
            bedStepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = bedSequence[bedStepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }

  // PARK SCREEN CLICK HANDLER
  if (parkScreen) {
    parkScreen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'parkScene') return;
      console.log("Park click - stepIndex:", parkStepIndex, "clickCount:", clickCount, "overlayActive:", overlayActive);
      console.log("Current step:", parkSequence[parkStepIndex]);
      if (overlayActive) return; 


      const step = parkSequence[parkStepIndex];
      if (!step) {
        diagBox.style.display = 'none';
        SceneManager.switch("cafeScene");
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'park');
          } else {
            parkStepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = parkSequence[parkStepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
          
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }

  // CAFE SCREEN CLICK HANDLER
  if (cafeScreen) {
    cafeScreen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'cafeScene') return;
      if (overlayActive) return; 
      console.log("Bed click - stepIndex:", cafeStepIndex, "clickCount:", clickCount, "overlayActive:", overlayActive);
      console.log("Current step:", cafeSequence[cafeStepIndex]);

      if (overlayActive) return;

      const step = cafeSequence[cafeStepIndex];
      
      if (!step) {
        diagBox.style.display = 'none';
        SceneManager.switch("partyScene");
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'cafe');
          } else {
            cafeStepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = cafeSequence[cafeStepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }

  // PARTY SCREEN CLICK HANDLER
  if (partyScreen) {
    partyScreen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'partyScene') return;

      if (overlayActive) return;

      const step = partySequence[partyStepIndex];
      if (!step) {
        diagBox.style.display = 'none';
        if (playerPoints <= 4) {
          SceneManager.switch("end1Scene");
        } else if ( playerPoints <= 8) {
          SceneManager.switch("end2Scene"); 
        } else {
          SceneManager.switch("end3Scene");
        }
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'party');
          } else {
            partyStepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = partySequence[partyStepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }

  // ENDING 1 CLICK HANDLER
  if (end1Screen) {
    end1Screen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'end1Scene') return;

      if (overlayActive) return;

      const step = end1Sequence[end1StepIndex];
      if (!step) {
        diagBox.style.display = 'none';
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'end1');
          } else {
            end1StepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = end1Sequence[end1StepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }

  // ENDING 2 CLICK HANDLER
  if (end2Screen) {
    end2Screen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'end2Scene') return;

      if (overlayActive) return;

      const step = end2Sequence[end2StepIndex];
      if (!step) {
        diagBox.style.display = 'none';
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'end2');
          } else {
            end2StepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = end2Sequence[end2StepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }

  // ENDING 3 CLICK HANDLER
  if (end3Screen) {
    end3Screen.addEventListener('click', function() {
      if (SceneManager.currentScene !== 'end3Scene') return;

      if (overlayActive) return;

      const step = end3Sequence[end3StepIndex];
      if (!step) {
        diagBox.style.display = 'none';
        return;
      }

      if (step.type === 'dialogue') {
        //click 1 shows dialogue box and name
        if (clickCount === 0) {
          diagBox.style.display = 'block';
          characterName.textContent = step.character === "player" ? playerData.name : step.character;
          characterName.style.display = 'block';
          characterDiag.textContent = step.text;
          characterDiag.style.display = 'none';
          clickCount = 1;
        }
        //click 2 shows the dialogue text
        else if (clickCount === 1) {
          characterDiag.style.display = 'block';
          clickCount = 2;
        }
        //click 3 is for choices or next step
        else if (clickCount === 2) {
          if (step.choices) {
            showChoices(step.choices, 'end3');
          } else {
            end3StepIndex++;
            if (characterName) characterName.style.display = 'none';
            if (characterDiag) characterDiag.style.display = 'none';
            diagBox.style.display = 'none';
            clickCount = 0;

            //if next step is overlay then show immediately
            const nextStep = end3Sequence[end3StepIndex];
            if (nextStep && nextStep.type === 'overlay') {
              showOverlay(nextStep);
            }
          }
        }
      } 
      else if (step.type === 'overlay') {
        showOverlay(step);
      }
    });
  }
});

  /*
  
  const cafeDiag = [
    { character: "Narrator", text: "It's time to get to the cafe."},
    { character: "Narrator", text: "That way to the cafe"},
    { character: "Narrator", text: "Go and order something."},
    { character: playerData.name, text: "..."},
    { character: "Barista", text: "Hey, how ya doing! Haven't seen you in a hot second!"},
    { character: playerData.name, text: "(Option 1: Doing fine, just went outta town for a bit.) (+1 Option 2: Haven't been out too much)},
    { character: "Barista", text: "I mean, I've seen ya walk by every day. But I haven't seen ya walk into the shop."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "Anyway, pick your order.",
      choices: [
        { text: "Espresso"},
        { text: "Espresso"},
        { text: Cappucino"},
        { text: "Latte"}
      ]
    },
    { character: "Barista", text: "I know when something's up with you, how'ss it been?"},
    { character: playerData.name, text: "It's been pretty rough, yeah."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "Is it something with Charlie? They seem down too.",
      choices: [
        { text: "...maybe."},
        { text: "Yeah, it is.", points: +1 }
      ]
    },
    { character: "Barista", text: "Aren't ya'll dating?"},
    { character: playerData.name, text: "We...had a fight."},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "About what?",
      choices: [
        { text: "They were making one outta thin air."},
        { text: "I can't even remember...", points: +1 }
      ]
    },
    { character: "Barista", text: "That really sucks. I've been through similar stuff."},
    { character: "Barista", text: ""},
    { 
      type: 'dialogue', 
      character: "Barista", 
      text: "About what?",
      choices: [
        { text: "They were making one outta thin air."},
        { text: "I can't even remember...", points: +1 }
      ]
    },
    { character: "Barista", text: "Well here's your coffee, nice choice by the way. Drink up and I hope things go better for you."},
    { character: playerData.name, text: "Thanks."},
  ];

const partyDiag = [
  { character: "Friend", text: "Are u here??? I’m waiting for you."},
  { character: playerData.name, text: "Soon, my bus gets off in a couple of stops."},
  { character: "Friend", text: "OK, how r ud oing?"},
  { character: playerData.name, text: "Type a bit slower."},
  { character: "Friend", text: "I said how r u doing?"},
  { character: playerData.name, text: "Fine, we met and talked it out a bit."},
  { character: "Friend", text: "Oh, how did that go?"},
  { character: playerData.name, text: "Fine, I’d much rather party right now instead of talking about it."},
  { character: "Friend", text: "All good."},
  { character: playerData.name, text: "I’m about to get off."},
  { character: "Friend", text: "See you in a sec!!!"},
  { character: "Narrator", text: "You arrive at the party."},
  { character: "Friend", text: "Have fun and walk around, meet someone new. Don’t be so down!"},
  { character: playerData.name, text: "I’ll have fun."},
  { character: "Narrator", text: "You mingle around the party."},
  { character: "Narrator", text: "Uh oh."},
  { character: "Narrator", text: "It’s them."},
  { character: "Charlie", text: "Did you follow me here?"},
  { character: playerData.name, text: "No! My friend invited me here."},
  { character: "Charlie", text: "Did your friend stalk me for you?"},
  { character: playerData.name, text: "..."},
  { character: "Charlie", text: "Sorry."},
  { character: playerData.name, text: "Could we just party without this being a problem?"},
  { character: "Charlie", text: "You sure you can make it not be a problem?"},
  { character: playerData.name, text: "Yeah. Can you?"},
  { character: "Charlie", text: "Yeah."},
  { character: playerData.name, text: "We should talk about this later."},
  { character: "Charlie", text: "Okay, I’ll see you later."},
  { character: "Narrator", text: "You go party elsewhere."},
  { character: "Narrator", text: "Hours later..."},

  { character: "Friend", text: "Hey, it’s time you get back home."},
  { character: playerData.name, text: "I’m having fun though!"},
  { character: "Friend", text: "The host wants people out soon, we kinda have to get going."},
  { character: playerData.name, text: "Fine… let’s get going!"},
  { character: "Friend", text: "Come along with me, come on."},
  { character: "Narrator", text: "You head home."}
];


const end1Diag = [
  { type: 'dialogue', character: "player", text: "*Should I text them?*"},
  { type: 'dialogue', character: "player", text: "*…No. It’s fine.*"},
  { type: 'dialogue', character: "Narrator", text: "You put your phone down and try to move on without saying anything."},
  { type: 'dialogue', character: "Narrator", text: "Ignoring how you felt didn’t make it disappear."},
  { type: 'dialogue', character: "Narrator", text: "The lack of closure followed you into the next relationship, and the next relationshipp, and the next. Eachone ended for different reasons, but the same unresolved patterns kept showing up. Over time, the weight of all those unfinished conversations left ${charData.name} more guarded and more tired than before."}
];

const end2Diag = [
  { type: 'dialogue', character: "player", text: "*I should text them.*" },
  { type: 'dialogue', character: "player", text: "*I don’t like how we left things.*" },
  { type: 'dialogue', character: "player", text: "Hey. Do you have a minute to talk?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. What’s up?" },
  { type: 'dialogue', character: "player", text: "I’ve been thinking about everything." },
  { type: 'dialogue', character: "player", text: "I didn’t handle things well." },
  { type: 'dialogue', character: "player", text: "I picked fights I didn’t need to and made stuff harder than it had to be." },
  { type: 'dialogue', character: "Charlie", text: "I appreciate you saying that." },
  { type: 'dialogue', character: "Charlie", text: "I could’ve handled things better too." },
  { type: 'dialogue', character: "player", text: "Maybe we could talk in person? Tomorrow?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. That sounds good." },
  { type: 'dialogue', character: "Narrator", text: "You met up the next day and decided to try again." },
  { type: 'dialogue', character: "Narrator", text: "It didn’t last forever, but for a while, things felt steady and easy between them." },
];

const end3Diag = [
  { type: 'dialogue', character: "player", text: "*I shouldn’t let it just end like that.*" },
  { type: 'dialogue', character: "player", text: "Hey. Can we talk for a minute?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. What’s up?" },
  { type: 'dialogue', character: "player", text: "I’ve been thinking about how things ended." },
  { type: 'dialogue', character: "player", text: "I’m sorry for how I handled it." },
  { type: 'dialogue', character: "player", text: "I don’t want us to leave it on a bad note." },
  { type: 'dialogue', character: "player", text: "I want things to be mended over ended." },
  { type: 'dialogue', character: "Charlie", text: "Okay…" },
  { type: 'dialogue', character: "Charlie", text: "I’m sorry too." },
  { type: 'dialogue', character: "Charlie", text: "I didn’t deal with it very well either." },
  { type: 'dialogue', character: "Charlie", text: "I don’t want things to be weird between us." },
  { type: 'dialogue', character: "player", text: "Maybe we could just stay in touch." },
  { type: 'dialogue', character: "player", text: "We don’t have to try again." },
  { type: 'dialogue', character: "player", text: "Just… be on good terms. Does that sound okay?" },
  { type: 'dialogue', character: "Charlie", text: "Yeah. I’d like that." }, 
  { type: 'dialogue', character: "Narrator", text: "${playerData.name} and Charlie went their separate ways. With some distance, they both recognized the parts of the relationship that weren't healthy and accepted that they didn't work as a couple. Over time, they moved on and stayed friends."},
];
  /*

function randomAvatar(seed) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed + Math.random()}`;
}

// Random Background
function randomBackground(seed) {
    return `https://picsum.photos/seed/${seed + Math.random()}/800/600`;
}

// DOM Elements
const insightBox = document.getElementById("insightBox");
const aiChatBox = document.getElementById("aiChatBox");
const insightContent = document.getElementById("insightContent");
const chatMessages = document.getElementById("chatMessages");

// Show Insight
document.getElementById("playerInsightBtn").onclick = () => {
    insightBox.style.backgroundImage = `url('${randomBackground("insight")}')`;
    insightContent.innerHTML = `
        <h2>Your Relationship Insight</h2>
        <p>You tend to value emotional depth and communication.</p>
        <p>You seek partners who understand your personal growth journey.</p>
    `;
    showPopup(insightBox);
    hidePopup(aiChatBox);
};

// Show Chat
document.getElementById("aiChatBtn").onclick = () => {
    aiChatBox.style.backgroundImage = `url('${randomBackground("chat")}')`;
    chatMessages.innerHTML = "";
    showPopup(aiChatBox);
    hidePopup(insightBox);
};

// Popup controls
function showPopup(box) {
    box.style.display = "flex";
    setTimeout(() => box.classList.add("show"), 10);
}

function hidePopup(box) {
    box.classList.remove("show");
    setTimeout(() => box.style.display = "none", 300);
}

function closePopup(id) {
    hidePopup(document.getElementById(id));
}

// Typing animation
function typeMessage(text, className) {
    const msg = document.createElement("div");
    msg.className = `chatMessage ${className}`;

    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = className === "playerMessage"
        ? randomAvatar("player")
        : randomAvatar("ai");

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    if (className === "playerMessage") {
        msg.appendChild(bubble);
        msg.appendChild(avatar);
    } else {
        msg.appendChild(avatar);
        msg.appendChild(bubble);
    }

    chatMessages.appendChild(msg);

    let i = 0;
    function type() {
        if (i < text.length) {
            bubble.textContent += text.charAt(i);
            i++;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(type, 20);
        }
    }
    type();
}

// Send Message
document.getElementById("askAI").onclick = async () => {
    const input = document.getElementById("aiQuestion");
    const question = input.value.trim();
    if (!question) return;

    typeMessage(question, "playerMessage");
    input.value = "";

    try {
        const res = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });

        const data = await res.json();
        typeMessage(data.answer, "aiMessage");

    } catch {
        typeMessage("AI server is not connected.", "aiMessage");
    }
  };
fetch("http://localhost:3000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
});

  */ 
