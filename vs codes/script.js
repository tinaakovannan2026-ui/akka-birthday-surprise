const screens = ["welcome", "quiz", "passcode", "birthday", "doraemon-page"];

function showScreen(id) {
  screens.forEach(screenId => {
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.toggle("active", screenId === id);
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Funny NO button
const noMessages = [
  "Aiyooo venama kashtapattu create pannen ma! Wrong button 😭💗",
  "No nu solla mudiyadhu! Try again 😂",
  "Thangachi ivlo effort potrukken! 🥹",
  "The YES button is waiting for you 🎀",
  "Akka pleaseee! Oru click dhaane! 🥺"
];

let noCount = 0;

document.getElementById("noBtn")?.addEventListener("click", () => {
  const reaction = document.getElementById("reaction");
  if (reaction) {
    reaction.textContent = noMessages[noCount % noMessages.length];
  }
  noCount++;

  const button = document.getElementById("noBtn");
  if (button) {
    button.style.transform =
      `translate(${Math.random() * 30 - 15}px, ${Math.random() * 16 - 8}px)`;
  }

  playCuteSound("pop");
});

// YES opens mini quiz
document.getElementById("yesBtn")?.addEventListener("click", () => {
  playCuteSound("pop");
  showScreen("quiz");
});

// Quiz answers
document.querySelectorAll(".option").forEach(button => {
  button.addEventListener("click", () => {
    const reaction = document.getElementById("quizReaction");

    if (reaction) {
      reaction.textContent = button.classList.contains("correct")
        ? "Correct! Full marks for knowing your thangachi! 🏆💗"
        : "Wrong answer! 😂 Try the last option, Akka!";
    }

    playCuteSound("pop");
  });
});

// Continue to passcode
document.getElementById("toCode")?.addEventListener("click", () => {
  playCuteSound("pop");
  showScreen("passcode");
});

// Secret passcode
document.getElementById("unlockBtn")?.addEventListener("click", () => {
  const enteredCode =
    document.getElementById("passcodeInput")?.value.trim();

  const correctCode = "1234"; // Change this before sharing!

  if (enteredCode === correctCode) {
    showScreen("birthday");
    makeConfetti(45);
  } else {
    const reaction = document.getElementById("codeReaction");
    if (reaction) {
      reaction.textContent =
        "Aiyo, wrong code! Hint: 1234 dhaan for now 🤭";
    }
    playCuteSound("pop");
  }
});

// Allow Enter key in passcode box
document.getElementById("passcodeInput")?.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.getElementById("unlockBtn")?.click();
  }
});

// Birthday confetti
function makeConfetti(amount) {
  const symbols = ["💗", "✨", "🌸", "🎉", "💖", "⭐"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (14 + Math.random() * 18) + "px";
    piece.style.animationDuration = (2 + Math.random() * 2) + "s";

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

// Final birthday surprise
document.getElementById("celebrateBtn")?.addEventListener("click", () => {
  makeConfetti(90);

  const reaction = document.getElementById("finalReaction");
  if (reaction) {
    reaction.textContent =
      "You deserve all the cake, hugs and happiness in the universe. Love you, Akka! 💗🎂";
  }

  playCuteSound("celebrate");
});

// Cute sound effects
function playCuteSound(type = "pop") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audio = new AudioContextClass();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    const now = audio.currentTime;

    if (type === "celebrate") {
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(523, now);
      oscillator.frequency.setValueAtTime(659, now + 0.12);
      oscillator.frequency.setValueAtTime(784, now + 0.24);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      oscillator.start(now);
      oscillator.stop(now + 0.5);
    } else {
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(700, now);
      oscillator.frequency.exponentialRampToValueAtTime(350, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      oscillator.start(now);
      oscillator.stop(now + 0.15);
    }

    oscillator.onended = () => audio.close();
  } catch (error) {
    console.log("Sound could not play:", error);
  }
}

/* DORAEMON BIRTHDAY SHOW */

const doraemonStage = document.getElementById("doraemon-walk");
const doraemonImage = document.getElementById("doraemon-image");
const doraemonLine = document.getElementById("doraemon-line");
const doraemonNext = document.getElementById("doraemon-next");
const gadgetButton = document.getElementById("gadget-button");
const gadgetSurprise = document.getElementById("gadget-surprise");
const gadgetName = document.getElementById("gadget-name");

let doraemonStarted = false;
let dialogueIndex = 0;
let mouthTimer = null;

// Filenames matched to the files shown in your VS Code screenshot.
// Keep these images in the same folder as index.html.

const doraemonImages = {
  walk: "doraemon.jpg",
  front: "doraemon-front.jpg.jpg",
  mouthOpen: "doraemon-mouth-open.jpg.jpg",
  mouthClosed: "doraemon-mouth-closed.jpg.jpg",
  pocket: "doraemon-pocket.jpg.jpg"
};

const doraemonDialogue = [
  {
    text: "Akkaaa! Un birthday-ku naan special-ah vandhirukken! 💙",
    image: doraemonImages.front,
    talking: false
  },
  {
    text: "Unakku oru magical wish sollanum! ✨",
    image: doraemonImages.mouthOpen,
    talking: true
  },
  {
    text: "Nee eppovum happy-ah irukkanum, Akka! 🥹💗",
    image: doraemonImages.mouthClosed,
    talking: true
  },
  {
    text: "Ready-ah? En magic pocket-la surprise irukku! 🎁",
    image: doraemonImages.pocket,
    talking: false
  }
];

function startDoraemonShow() {
  if (doraemonStarted || !doraemonStage || !doraemonImage) return;

  doraemonStarted = true;
  dialogueIndex = 0;

  doraemonStage.hidden = false;
  doraemonStage.classList.remove("is-talking");
  doraemonStage.classList.add("is-walking");

  // Start with walking pose.
  doraemonImage.src = doraemonImages.walk;
  doraemonImage.alt = "Doraemon walking in to wish Akka";

  playCuteSound("celebrate");

  // After the entrance, stop walking and begin the dialogue.
  window.setTimeout(() => {
    doraemonStage.classList.remove("is-walking");
    showDoraemonDialogue();
  }, 3100);
}

function showDoraemonDialogue() {
  if (!doraemonStage || !doraemonImage || !doraemonLine) return;

  const line = doraemonDialogue[dialogueIndex];
  stopMouthAnimation();

  doraemonImage.src = line.image;
  doraemonImage.alt = "Doraemon birthday pose";

  doraemonLine.textContent = line.text;
  doraemonStage.classList.toggle("is-talking", line.talking);

  if (line.talking) {
    startMouthAnimation();
  }

  if (doraemonNext) {
    doraemonNext.hidden = false;
    doraemonNext.textContent =
      dialogueIndex === doraemonDialogue.length - 1
        ? "Open your magic pocket! 🎁"
        : "Next, Doraemon! 💙";
  }
}

// Alternate open/closed mouth images while Doraemon is talking.
function startMouthAnimation() {
  stopMouthAnimation();

  if (!doraemonImage) return;

  let mouthOpen = true;

  mouthTimer = window.setInterval(() => {
    mouthOpen = !mouthOpen;
    doraemonImage.src = mouthOpen
      ? doraemonImages.mouthOpen
      : doraemonImages.mouthClosed;
  }, 350);
}

function stopMouthAnimation() {
  if (mouthTimer !== null) {
    window.clearInterval(mouthTimer);
    mouthTimer = null;
  }
}


doraemonNext?.addEventListener("click", () => {
  playCuteSound("pop");

  if (dialogueIndex < doraemonDialogue.length - 1) {
    dialogueIndex++;
    showDoraemonDialogue();
  } else {
    stopMouthAnimation();
    doraemonStage?.classList.remove("is-talking");

    if (doraemonNext) {
      doraemonNext.hidden = true;
    }

    if (gadgetButton) {
      gadgetButton.hidden = false;
      gadgetButton.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }
});


// Open the pocket surprise

gadgetButton?.addEventListener("click", () => {
  playCuteSound("celebrate");

  if (gadgetSurprise) {
    gadgetSurprise.hidden = false;

    setTimeout(() => {
      gadgetSurprise.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);
  }

  if (gadgetName) {
    gadgetName.textContent =
      "Akka, un wishes ellam nijamaaganum! 💙✨ Anywhere Door and Take-copter are waiting for you!";
  }

  makeConfetti(50);

  gadgetButton.textContent = "Surprise unlocked! 💖";
  gadgetButton.disabled = true;
});


/* MAGIC DOOR BUTTON */

const openMagicDoor = document.getElementById("openMagicDoor");
const magicDoorScene = document.querySelector(".magic-door-scene");
const doorMessage = document.getElementById("doorMessage");

openMagicDoor?.addEventListener("click", () => {
  magicDoorScene?.classList.add("door-open");

  if (doorMessage) {
    doorMessage.hidden = false;
  }

  openMagicDoor.textContent = "Magic unlocked! 💖";
  openMagicDoor.disabled = true;

  makeConfetti(35);
  playCuteSound("celebrate");
});


const meetDoraemonBtn = document.getElementById("meetDoraemonBtn");

meetDoraemonBtn?.addEventListener("click", () => {
  showScreen("doraemon-page");

  const stage = document.getElementById("doraemon-walk");

  if (stage) {
    stage.hidden = false;
  }

  startDoraemonShow();

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
});

document.getElementById("backToBirthday")?.addEventListener("click", () => {
  showScreen("birthday");
});


const secretLetterBtn = document.getElementById("secretLetterBtn");
const secretLetter = document.getElementById("secretLetter");

secretLetterBtn?.addEventListener("click", () => {
  if (secretLetter) {
    secretLetter.hidden = false;

    secretLetter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  secretLetterBtn.textContent = "My Love for You, Akka! 💗";
  secretLetterBtn.disabled = true;

  makeConfetti(35);
  playCuteSound("celebrate");
});


const finalCelebrationBtn = document.getElementById("finalCelebrationBtn");
const finalCelebrationMessage = document.getElementById("finalCelebrationMessage");

finalCelebrationBtn?.addEventListener("click", () => {
  makeConfetti(120);
  playCuteSound("celebrate");

  if (finalCelebrationMessage) {
    finalCelebrationMessage.textContent =
      "Happy Birthday, Akka! 💗 Nee eppovum sirichitte irukkanum! Love you forever! 🥹🎂💖";
  }

  finalCelebrationBtn.textContent = "You're Loved Forever! 💖";
  finalCelebrationBtn.disabled = true;
});




