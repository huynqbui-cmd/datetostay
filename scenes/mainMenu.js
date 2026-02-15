document.addEventListener("DOMContentLoaded", function() {

  const SceneManager = {
    currentScene: "menuScene",
    scenes: {
      menuScene: {bg: '../image/homeScreen.png', element: document.getElementById("menuScene")},
      optionScene: {bg: '../image/homeScreen2.png', element: document.getElementById("optionScene")},
      blackScene: {bg: '../image/blackScreen.jpg', element: document.getElementById("blackScene")},
      bedScene: {bg: '../image/bedroomBG.png', element: document.getElementById("bedScene")},
      parkScene: {bg: '../image/parkBG.png', element: document.getElementById("parkScene")}
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
        { text: "Not great. Trying to do better.", points: +1 },
        { text: "I'm doing fine ig"}
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Is this about Charlie" },
    { type: 'dialogue', character: "player", text: "Yeah, things haven't been great recently." },
    { type: 'dialogue', character: "Friend", text: "With you or between y'all??" },
    { type: 'dialogue', character: "player", text: "Both." },
    { type: 'dialogue', character: "player", text: "Haven't been doing too hot." },
    { type: 'dialogue', character: "Friend", text: "If you need anything I'm here for you. I think you should get out and about before the party." },
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "If you want we could just do something else",
      choices: [
        { text: "Yeah, sure."},
        { text: "Yeah I think I need to get out.", points: +1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "And make sure go somewhere like the park or something." },
    { type: 'dialogue', character: "player", text: "Fine..." },
    { type: 'dialogue', character: "Friend", text:"Great!!! I'll see you in a bit! We can talk more about it there too." },
    { type: 'dialogue', character: "player", text: "See you." }
  ];

  const bedScreen = document.getElementById("bedScene");
  const overlay = document.getElementById('overlay');
  const popUpImage = document.getElementById('popUpImage');
  const diagBox = document.getElementById('dialogueBox');
  
  const characterName = document.querySelector('.characterName');
  const characterDiag = document.querySelector('.dialogueText');

  // Create choice container inside dialogue box
  const choiceContainer = document.createElement('div');
  choiceContainer.id = 'choiceContainer';
  choiceContainer.style.display = 'none';
  choiceContainer.style.marginTop = '20px';
  choiceContainer.style.textAlign = 'center';
  
  // Add it to dialogue content
  const dialogueContent = document.querySelector('.dialogueContent');
  if (dialogueContent) {
    dialogueContent.appendChild(choiceContainer);
  }

  // Initialize variables
  let bedStepIndex = 0;
  let overlayActive = false;
  let clickCount = 0;
  let currentStep = null;

  // Hide everything initially
  if (diagBox) diagBox.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  if (characterName) characterName.style.display = 'none';
  if (characterDiag) characterDiag.style.display = 'none';

  function showChoices(choices) {
    // Clear previous choices
    choiceContainer.innerHTML = '';
    
    // Create buttons for each choice
    choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      
      // Style the button
      btn.style.display = 'block';
      btn.style.width = '80%';
      btn.style.margin = '10px auto';
      btn.style.padding = '10px';
      btn.style.backgroundColor = '#e1a4a4';
      btn.style.border = '2px solid rgb(92, 19, 33)';
      btn.style.borderRadius = '5px';
      btn.style.cursor = 'pointer';
      btn.style.fontFamily = 'Lexend, sans-serif';
      btn.style.fontSize = '16px';
      
      // Add hover effect
      btn.onmouseover = () => btn.style.backgroundColor = '#b76f6f';
      btn.onmouseout = () => btn.style.backgroundColor = '#e1a4a4';
      
      // Handle choice selection
      btn.onclick = (e) => {
        e.stopPropagation();
        
        // Add points
        playerPoints += choice.points || 0;
        
        // Hide choices and dialogue
        choiceContainer.style.display = 'none';
        diagBox.style.display = 'none';
        if (characterName) characterName.style.display = 'none';
        if (characterDiag) characterDiag.style.display = 'none';
        
        // Move to next step
        bedStepIndex++;
        clickCount = 0;
        
        // Show next step if it's an overlay
        const nextStep = bedSequence[bedStepIndex];
        if (nextStep && nextStep.type === 'overlay') {
          showOverlay(nextStep);
        }
      };
      
      choiceContainer.appendChild(btn);
    });
    
    // Hide dialogue text and show choices
    if (characterDiag) characterDiag.style.display = 'none';
    choiceContainer.style.display = 'block';
  }


  function resetForNextDialogue() {
    if (characterName) characterName.style.display = 'none';
    if (characterDiag) characterDiag.style.display = 'none';
    choiceContainer.style.display = 'none';
    clickCount = 0;
  }

function showOverlay(step) {
  if (!step) return;

  // Hide dialogue box when overlay is active
  if (diagBox) diagBox.style.display = 'none';
  if (characterName) characterName.style.display = 'none';
  if (characterDiag) characterDiag.style.display = 'none';
  choiceContainer.style.display = 'none';

  if (popUpImage) popUpImage.src = step.image;
  if (overlay) {
    overlay.style.display = 'block';
    overlayActive = true;
    clickCount = 0; // reset click count for next dialogue
  }
}

function hideOverlay() {
  if (overlay) overlay.style.display = 'none';
  overlayActive = false;
  bedStepIndex++;
  clickCount = 0;

  // Reset dialogue box for next step
  resetForNextDialogue();

  // If the next step is overlay, show it immediately
  const nextStep = bedSequence[bedStepIndex];
  if (nextStep && nextStep.type === 'overlay') {
    showOverlay(nextStep);
  }
}

if (overlay) {
  overlay.addEventListener('click', function(e) {
    e.stopPropagation();

    // Treat **any click** as a dismissal for overlays
    hideOverlay();
  });
}

// Updated bed screen click handler
if (bedScreen) {
  bedScreen.addEventListener('click', function() {
    if (SceneManager.currentScene !== 'bedScene') return;

    currentStep = bedSequence[bedStepIndex];
    if (!currentStep) {
    diagBox.style.display = 'none';
    // Scene change here
    SceneManager.switch("parkScene"); // e.g., "parkScene" or "menuScene"
    return;
    }

    if (overlayActive) return; // clicks do nothing while overlay is visible

    const step = bedSequence[bedStepIndex];
    if (!step) return;

    if (step.type === 'dialogue') {
      // Click 1: show dialogue box + name
      if (clickCount === 0) {
        diagBox.style.display = 'block';
        characterName.textContent = step.character === "player" ? playerData.name : step.character;
        characterName.style.display = 'block';
        characterDiag.textContent = step.text;
        characterDiag.style.display = 'none';
        clickCount = 1;
      }
      // Click 2: show dialogue text
      else if (clickCount === 1) {
        characterDiag.style.display = 'block';
        clickCount = 2;
      }
      // Click 3: handle choices or next step
      else if (clickCount === 2) {
        if (step.choices) {
          showChoices(step.choices);
        } else {
          bedStepIndex++;
          clickCount = 0;
          resetForNextDialogue();

          // If next step is overlay, show it immediately
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

const parkDiag = [
    { type: 'dialogue', character: "player", text: "I need to put on a coat."},
    { type: 'dialogue', character: "player", text: "Here we go."},
    { type: 'dialogue', character: "Narrator", text: "You should leave for the park now."},
    { type: 'dialogue', character: "player", text: "Where are they?"},
    { type: 'dialogue', character: "player", text: "There they are."},
    { type: 'dialogue', character: "player", text: "Hey"},
    { type: 'dialogue', character: "Friend", text: "Hey"},
    { type: 'dialogue', character: "Narrator", text: "Queue the uncomftorable silence."},
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "You doing good?",
      choices: [
        { text: "..."},
        { text: "Nah, not really.", points: +1 },
        { text: "...sorry for not really being around.", points: +1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Let's go on a walk"},
    { type: 'dialogue', character: "player", text: "Okay"},
    { type: 'dialogue', character: "Friend", text: "And let's talk"},
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "Have you been eating well, sleeping well??",
      choices: [
        { text: "Fine."},
        { text: "It's been kind of hard.", points: +1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Okay, that's fine."},
    { type: 'dialogue', character: "Friend", text: "You should at least get out more. Being indoors all day isn't great for you."},
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "Are you still hurting from the fight?",
      choices: [
        { text: "No."},
        { text: " ...yeah.", points: +1 }
      ]
    },
    { 
      type: 'dialogue', 
      character: "Friend", 
      text: "You gonna talk to them again?",
      choices: [
        { text: " Don't plan to."},
        { text: "I'd like to", points: +1 }
      ]
    },
    { type: 'dialogue', character: "Friend", text: "Okay, well I wanted to make sure that you're all good. Well, either way, you should clear up your head. I gotta run some errands, you should stop by the cafe."},
    { type: 'dialogue', character: "Friend", text: "It's nice out today, good you got soem fresh air. I'll see-ya at the party."},
    { type: 'dialogue', character: "player", text: "Bye, thanks"},
    { type: 'dialogue', character: "Friend", text: "Bye-ya!"},
  ];


  const parkScreen = document.getElementById("parkScene");
  
  characterName = document.querySelector('.characterName');
  characterDiag = document.querySelector('.dialogueText');

  // Create choice container inside dialogue box
  choiceContainer = document.createElement('div');
  choiceContainer.id = 'choiceContainer';
  choiceContainer.style.display = 'none';
  choiceContainer.style.marginTop = '20px';
  choiceContainer.style.textAlign = 'center';
  
  // Add it to dialogue content
  dialogueContent = document.querySelector('.dialogueContent');
  if (dialogueContent) {
    dialogueContent.appendChild(choiceContainer);
  }

  // Initialize variables
  let parkStepIndex = 0;
  overlayActive = false;
  clickCount = 0;
  currentStep = null;

  // Hide everything initially
  if (diagBox) diagBox.style.display = 'none';
  if (parkOverlay) parkOverlay.style.display = 'none';
  if (characterName) characterName.style.display = 'none';
  if (characterDiag) characterDiag.style.display = 'none';

  
  function resetForNextDialogue() {
    if (characterName) characterName.style.display = 'none';
    if (characterDiag) characterDiag.style.display = 'none';
    choiceContainer.style.display = 'none';
    clickCount = 0;
  }

function showOverlay(step) {
  if (!step) return;

  // Hide dialogue box when overlay is active
  if (diagBox) diagBox.style.display = 'none';
  if (characterName) characterName.style.display = 'none';
  if (characterDiag) characterDiag.style.display = 'none';
  choiceContainer.style.display = 'none';

  if (popUpImage) popUpImage.src = step.image;
  if (overlay) {
    overlay.style.display = 'block';
    overlayActive = true;
    clickCount = 0; // reset click count for next dialogue
  }
}

function hideOverlay() {
  if (overlay) overlay.style.display = 'none';
  overlayActive = false;
  parkStepIndex++;
  clickCount = 0;

  // Reset dialogue box for next step
  resetForNextDialogue();

  // If the next step is overlay, show it immediately
  const nextStep = parkSequence[parkStepIndex];
  if (nextStep && nextStep.type === 'overlay') {
    showOverlay(nextStep);
  }
}

if (overlay) {
  overlay.addEventListener('click', function(e) {
    e.stopPropagation();

    // Treat **any click** as a dismissal for overlays
    hideOverlay();
  });
}

// Updated bed screen click handler
if (parkScreen) {
  parkScreen.addEventListener('click', function() {
    if (SceneManager.currentScene !== 'parkScene') return;

    currentStep = parkSequence[parkStepIndex];
    if (!currentStep) {
    diagBox.style.display = 'none';
    // Scene change here
    SceneManager.switch("cafeScene"); // e.g., "parkScene" or "menuScene"
    return;
    }

    if (overlayActive) return; // clicks do nothing while overlay is visible

    const step = parkSequence[parkStepIndex];
    if (!step) return;

    if (step.type === 'dialogue') {
      // Click 1: show dialogue box + name
      if (clickCount === 0) {
        diagBox.style.display = 'block';
        characterName.textContent = step.character === "player" ? playerData.name : step.character;
        characterName.style.display = 'block';
        characterDiag.textContent = step.text;
        characterDiag.style.display = 'none';
        clickCount = 1;
      }
      // Click 2: show dialogue text
      else if (clickCount === 1) {
        characterDiag.style.display = 'block';
        clickCount = 2;
      }
      // Click 3: handle choices or next step
      else if (clickCount === 2) {
        if (step.choices) {
          showChoices(step.choices);
        } else {
          parkStepIndex++;
          clickCount = 0;
          resetForNextDialogue();

          // If next step is overlay, show it immediately
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



});

  /*
  const parkDiag = [
    { character: playerData.name, text: "I need to put on a coat."},
    { character: playerData.name, text: "Here we go."},
    { character: "Narrator", text: "You should leave for the park now."},
    { character: playerData.name, text: "Where are they?"}
    { character: playerData.name, text: "There they are."},
    { character: playerData.name, text: "Hey."},
    { character: "Friend", text: "Hey."},
    { character: "Narrator", text: "Queue the uncomfortable silence..."},
    { character: "Friend", text: "You doing alright?"},
    { character: playerData.name, text: "(+1 Option 1: ...sorry for not really being around. (Option 2: ...) (+1 Option 3: Nah, not really.)"},
    { character: "Friend", text: "Let's go on a walk."},
    { character: playerData.name, text: "Sure."},
    { character: "Friend", text: "And let's talk."},
    { character: "Friend", text: "Have you been eating well, sleeping well?"},
    { character: playerData.name, text: "(Option 1: Fine.) (+1 Option 2: It's been kind of hard.)"},
    { character: "Friend", text: "Okay, that's fine."},
    { character: "Friend", text: "You should at least get out more. Being indoors all day isn't great for you."},
    { character: "Friend", text:"Are you still hurting from the fight?"},
    { character: playerData.name, text: "(+1 Option 1: ...yeah.) (Option 2: No.)"},
    { character: "Friend", text: "You gonna talk to them again?"},
    { character: playerData.name, text: "(Option 1: Don't plan to...) (+1 Option 2: I'd like to.)"},
    { character: "Friend", text: "Okay, well I wanted to make sure that you're all good. Well, either way, you should clear up your head. I gotta run some errands, you should stop by the cafe."},
    { character: "Friend", text: "It's nice out today, good you got soem fresh air. I'll see-ya at the party."},
    { character: playerData.name, text: "Bye, thanks"},
    { character: "Friend", text: "Bye-ya"},
  ];
  
  const cafeDiag = [
    { character: "Narrator", text: "It's time to get to the cafe."},
    { character: "Narrator", text: "That way to the cafe"},
    { character: "Narrator", text: "Go and order something."},
    { character: playerData.name, text: "..."},
    { character: "Barista", text: "Hey, how ya doing! Haven't seen you in a hot second!"},
    { character: playerData.name, text: "(Option 1: Doing fine, just went outta town for a bit.) (+1 Option 2: Haven't been out too much)},
    { character: "Barista", text: "I mean, I've seen ya walk by every day. But I haven't seen ya walk into the shop."},
    { character: "Barista", text: "Anyway, pick your order"},
    { character: playerData.name, text: "(Option 1: Espresso) (Option 2: Latteer) (Option 3:  Americano) (Option 4: Cappucino)"},
    { character: "Barista", text: "I know when something's up with you, how'ss it been?"},
    { character: playerData.name, text: "It's been prettty rough yeah."},
    { character: "Barista", text: "Is it something with Charlie? They seem down too."},
    { character: playerData.name text: "(Option 1: ...maybe) (+1 Option 2: Yeah, it is.)""},
    { character: "Barista", text: "Aren't ya'll dating?"},
    { character: playerData.name, text: "We... had a fight."},
    { character: "Barista", text: "About what?"},
    { character: playerData.name, text: "(+1 Option 1: I don't even remember.) (Option 2: They were making one outta thin air.)"},
    { character: "Barista", text: "That sucks. Y'all still together?"},
    { character: playerData.name, text: "Don't think so."},
    { character: "Barista", text: "What was the last straw?"},
    { character: playerData.name, text: "...accidentally broke our mug we made together."},
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
  { character: "S/O", text: "Did you follow me here?"},
  { character: playerData.name, text: "No! My friend invited me here."},
  { character: "S/O", text: "Did your friend stalk me for you?"},
  { character: playerData.name, text: "..."},
  { character: "S/O", text: "Sorry."},
  { character: playerData.name, text: "Could we just party without this being a problem?"},
  { character: "S/O", text: "You sure you can make it not be a problem?"},
  { character: playerData.name, text: "Yeah. Can you?"},
  { character: "S/O", text: "Yeah."},
  { character: playerData.name, text: "We should talk about this later."},
  { character: "S/O", text: "Okay, I’ll see you later."},
  { character: "Narrator", text: "You go party elsewhere."},
  { character: "Narrator", text: "Hours later..."},

  { character: "Friend", text: "Hey, it’s time you get back home."},
  { character: playerData.name, text: "I’m having fun though!"},
  { character: "Friend", text: "The host wants people out soon, we kinda have to get going."},
  { character: playerData.name, text: "Fine… let’s get going!"},
  { character: "Friend", text: "Come along with me, come on."},
  { character: "Narrator", text: "You head home."}
];


const end1Diag
  { character: playerData.name, text: "*Should I text them?*"},
  { character: playerData.name, text: "*…No. It’s fine.*"},
  { character: "Narrator", text: "You put your phone down and try to move on without saying anything."},
  { character: "Narrator", text: "Ignoring how you felt didn’t make it disappear."},
  { character: "Narrator", text: "The lack of closure followed you into the next relationship, and the next relationshipp, and the next. Eachone ended for different reasons, but the same unresolved patterns kept showing up. Over time, the weight of all those unfinished conversations left ${charData.name} more guarded and more tired than before."}

const end2Diag = [
  { character: playerData.name, text: "*I should text them.*" },
  { character: playerData.name, text: "*I don’t like how we left things.*" },
  { character: playerData.name, text: "Hey. Do you have a minute to talk?" },
  { character: charData.name, text: "Yeah. What’s up?" },
  { character: playerData.name, text: "I’ve been thinking about everything." },
  { character: playerData.name, text: "I didn’t handle things well." },
  { character: playerData.name, text: "I picked fights I didn’t need to and made stuff harder than it had to be." },
  { character: charData.name, text: "I appreciate you saying that." },
  { character: charData.name, text: "I could’ve handled things better too." },
  { character: playerData.name, text: "Maybe we could talk in person? Tomorrow?" },
  { character: charData.name, text: "Yeah. That sounds good." },
  { character: "Narrator", text: "You met up the next day and decided to try again." },
  { character: "Narrator", text: "It didn’t last forever, but for a while, things felt steady and easy between them." },
];

const end3Diag = [
  { character: playerData.name, text: "*I shouldn’t let it just end like that.*" },
  { character: playerData.name, text: "Hey. Can we talk for a minute?" },
  { character: charData.name, text: "Yeah. What’s up?" },
  { character: playerData.name, text: "I’ve been thinking about how things ended." },
  { character: playerData.name, text: "I’m sorry for how I handled it." },
  { character: playerData.name, text: "I don’t want us to leave it on a bad note." },
  { character: playerData.name, text: "I want things to be mended over ended." },
  { character: charData.name, text: "Okay…" },
  { character: charData.name, text: "I’m sorry too." },
  { character: charData.name, text: "I didn’t deal with it very well either." },
  { character: charData.name, text: "I don’t want things to be weird between us." },
  { character: playerData.name, text: "Maybe we could just stay in touch." },
  { character: playerData.name, text: "We don’t have to try again." },
  { character: playerData.name, text: "Just… be on good terms. Does that sound okay?" },
  { character: charData.name, text: "Yeah. I’d like that." }, 
  { character: "Narrator", text: "${playerData.name} and Charlie went their separate ways. With some distance, they both recognized the parts of the relationship that weren't healthy and accepted that they didn't work as a couple. Over time, they moved on and stayed friends."},
];

*/