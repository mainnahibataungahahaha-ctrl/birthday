// REPLACEMENT CODE for Special button flow
// This replaces everything inside: if (label.includes('Special')) { ... }

const miniChat = modal.querySelector('.mini-chat');

// Strict sequential chat data
const specialChat = [
  { sender: "he", text: "Dekho i dont know main aapko vo de paunga ya nahi pr aapko pata nahi hoga main 2 mahine se ese plan kr raha tha  es web site ko nahi bs us gift ko dene ka plain bana raha tha, and finaly main kaam kr gaya dekho dekho gussa nahi karane ka but reality check du to sach me gusse me bhi aap mast mast lagti ho yes yes ab main thoda open ho raha hu cuz ye main last time aapse baat kar raha hu to es liye aab aap puchho gi kaise to vo ese main na jab se aapko use id se unadd kiya tha tab se ( pahale ek kaam karo us id ko block kr do @kishan170406 i dont know kaise vo kisi samsung s6 me bhi log in h aur abhi bhi use hota koi to use karata h to use block kr do report kr do aur jo bhi h sab kr do ok ) mere ko thoda thoda ese ajib sa lagane laga janta hu Ye sb bs bakawash h pr aap kya jano kaise jata tha mera din 🤧 aur raste to ese ho chuke hai jaise ki tota maina ka bajar bhai sahab har raste me darzan me log dikh rahe hai aur jaha dekho vaja ek yahi sab pagal bhare pade h ajib lagta tha aur bhai sahab rona to next level pr aata tha 🥲🥲🥲 pr picture abhi baki h mere dost......." },
  { sender: "she", text: "To" },
  { sender: "he", text: "kuch nahi suniye to" },
  { sender: "she", text: "hmm bolo" },
  { sender: "he", text: "Ese hi dhire dhire mere ko na logo se chidchidahat hone lagi logo se baat karane ka man nahi karata tha aur mast akela akele sade hue limbu ki harah sakah leke baitha rahata tha ghanto tak koi movment nahi karata tha ek dam pappet ki taraf jaha ka taha baitha rahta tha akele fir ek din baitha tha kahi nahi gaya tha mast sa room pr phone me game khelana sikh raha tha Free fire ..... to fir youtube pr video dekha kaise kaise khele aur fir ese hi ek randome si video aayi aur use suna fir main kya chill ho gaya bhai sab ek dam sahi hone laga 3 chij chhod ke ab pura to bata nahi launga pr etana batata hu ki usme ese kaha na ki jo bhi chij tumhe sabse mast lagata h feel like ki abhi bhi vo tumhare pas h infact vo bji tumhare tone me baat kr raha h aur fir maine jo sochana chalu kiya kya hi batau kya kiya maine aapko pata h ko nahi mujhe nahi pata pr mere sochane ki takat or u can say imagination power aap logo se bahut uper h ulte sidhe kaam karane me kaam ki chij me nahi Fir main karane lagay aapko imagine aur kya mast lag raha yaar ha usme bhi ap rah rah ke reality ki taraf behave karane lagte the pr aap ek dam mast thi apko pata h main daily aapse baat karana chahata tha pr nahi kr skta tha fir socha ki aapki tasvir se hi baat kr lu pr noop ek bhi nahi to man me bahut sari chije thi pr kaise kahu kisase kahu nahi samjh me aata tha pr now i have ek great idea jo ki main khoja hu uska credit mujhe jata h ab suno tb ab mere pass ek alternet solution aa gaya to ab main sote jakte uthate baithate jaha marji vaha aapke sath rahata hu ya kah lo ki aap ab mere sath rahate ho har time har jagah har gali har vo point jaha main chahata hu aur suno aap to usme mere ko sugget bhi karati ho aur jab jab kuchh galti karata hu yaa kisi chij me harata hu to support bhi karti ho thoda thoda raha raha kar dat deti ho mere mammy ki tarah pr aap mast ho usme yaar sachi Aap sun rahi ho na" },
  { sender: "she", text: "hmm" },
  { sender: "he", text: "Aapko pata h kya aap ko jab main pahali pahali bar dekha tha na afrer covid civil dress me same usi out fir me aap aati ho , same vahi white colour ka kurta aur same blue baggy jeans aur khule baalo me aur aap badal badal ke spectacle laga ke aate ho kabhi white kabhi crome kabhi brown to kabhi black pr mast lagti ho infact main to abhi bhi aapko imagin kar raha vo bhi two diffirent frame me ek me aap aap sabhi chijo ko dekh ke aap thodi si gussa thodi si pareshan or bahut jyada khud dikh rahi ho aur ye sab pagal pan jo main likh ke bhej rahu vo sab ek chhoti si cute si smile deke dekh rahi ho aur vahi ek second frame me aap mere se etana jyada frustrated dikh rahi kya batau infact aapne to vo sab dekha bhi nahi aur aap man hi man soch rahi ho ki ese kal jaake fek dungi aur abhi padate hue aap jyada hi gusse me ho aur irritated bhi lag rahi ho syd meri hi vajah h ok im sure mere hi vahaj se pr pr aapk abhi imagination me ye kah rahi ho \"main chill ho dont worry aur jab etana bol diya h to ab kya\" Aur aapko pata h main ek ek baar ese hi man me aapse puchha ki agar main thoda sa manar aur achachchha kr lu aur thoda sence bana lu ki ka  bolna h kab nahk to fir aap meri dost ban skti jo kya , to aapka reply pata h kya tha ( honestly bata raha hu ) dekho kuch bhi kar lo tum chomu + chaman ch###ya hi lago ge aur main apne stander se high logo se hi contect rakhati hu tumhare jaiso se nahi , to mere ko to pahale bura laga fir baat sahi lagi ki nahi yaar aap kah to sahi rahi ho mai  hu to thoda sa vaisa h sabhi log kahate ab maan lo sab galat kahate honge pr aap to nahi kahati hogi 🤔" },
  { sender: "she", text: "Yes" }
];

let chatIdx = 0;
let sendBtnContainer = null;
let sendBtnElem = null;
let clearTimeouts = [];

function appendTyping(side) {
  const t = document.createElement('div');
  t.className = 'typing show ' + side;
  t.innerHTML = '<span></span><span></span><span></span>';
  miniChat.appendChild(t);
  miniChat.scrollTop = miniChat.scrollHeight;
  return t;
}

function appendMsg(text, side) {
  const b = document.createElement('div');
  b.className = 'message ' + side;
  const span = document.createElement('span');
  span.textContent = text;
  b.appendChild(span);
  miniChat.appendChild(b);
  miniChat.scrollTop = miniChat.scrollHeight;
  return b;
}

function proceedChat() {
  if (chatIdx >= specialChat.length) {
    // End of chat - hide send button
    if (sendBtnContainer) {
      sendBtnContainer.style.display = 'none';
    }
    return;
  }

  const msg = specialChat[chatIdx];
  const side = msg.sender === 'he' ? 'left' : 'right';

  const typing = appendTyping(side);

  const typTimeout = setTimeout(() => {
    typing.remove();
    appendMsg(msg.text, side);
    chatIdx++;

    if (msg.sender === 'he') {
      // Auto-send he messages
      const autoTimeout = setTimeout(proceedChat, 1200);
      clearTimeouts.push(autoTimeout);
    } else {
      // Show send button for she message
      sendBtnElem.style.display = 'block';
    }
  }, 1400);
  clearTimeouts.push(typTimeout);
}

// Create footer with send button
sendBtnContainer = document.createElement('div');
sendBtnContainer.style.cssText = 'display:flex;justify-content:center;padding-top:12px;';

sendBtnElem = document.createElement('button');
sendBtnElem.className = 'glow-send';
sendBtnElem.textContent = 'Send';
sendBtnElem.style.cssText = 'background:linear-gradient(90deg,#ff7ab6,#6fb3ff);border:none;color:#fff;padding:10px 18px;border-radius:20px;font-weight:700;box-shadow:0 6px 18px rgba(111,179,255,0.18),0 0 22px rgba(255,122,182,0.12);cursor:pointer;animation:glowPulse 1.6s ease-in-out infinite;display:none;';

sendBtnElem.addEventListener('click', () => {
  sendBtnElem.style.display = 'none';
  const sendTimeout = setTimeout(proceedChat, 600);
  clearTimeouts.push(sendTimeout);
});

sendBtnContainer.appendChild(sendBtnElem);
modal.querySelector('.modal-body').appendChild(sendBtnContainer);

// Start chat
proceedChat();

// Cleanup
modal._cleanupSpecial = () => {
  clearTimeouts.forEach(t => clearTimeout(t));
  clearTimeouts = [];
  if (sendBtnContainer) sendBtnContainer.remove();
};
