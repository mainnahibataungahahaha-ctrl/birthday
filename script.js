
document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */
  const intro = document.getElementById("intro");
  const phone = document.querySelector(".phone");
  const boyWithPhone = document.querySelector(".boy.with-phone");
  const characters = document.querySelector(".characters");
  const birthdayText = document.getElementById("birthdayText");

  /* ================= INTRO SEQUENCE ================= */
  window.addEventListener("load", () => {
    if (!intro) return;

    setTimeout(() => {
      intro.style.opacity = "0";

      setTimeout(() => {
 startMagicTransition(); // ✅ ONLY transition here

        intro.style.display = "none";

      }, 1600);

    }, 2000);
  });

  /* ================= MAGIC TRANSITION ================= */
  const magicLayer = document.getElementById("magicTransition");
  const scene = document.querySelector(".scene");

  function startMagicTransition() {

    if (!magicLayer || !scene) return;

    // blur pehle se (merge feel)
    scene.classList.add("blur");

    // magic screen
    magicLayer.classList.add("active");

    // dissolve (no visible split)
    setTimeout(() => {
      magicLayer.classList.add("split");
    }, 900);

    // final reveal

setTimeout(() => {

  magicLayer.style.display = "none";
  scene.classList.remove("blur");
  scene.classList.add("reveal");

  startScene();

}, 2600);

  }

  /* ================= MAIN SCENE FLOW ================= */
  function startScene() {

    setTimeout(() => {
      phone.classList.add("show");
    }, 900);

    setTimeout(() => {
      boyWithPhone.classList.add("run-in");
    }, 1100);

    setTimeout(() => {
      birthdayText.classList.add("show");
    }, 1800);

    setTimeout(() => {
      characters.classList.add("swap");
    }, 3800);

 // ✅ CHAT MUST START AFTER PHONE IS FULLY VISIBLE
  setTimeout(() => {
    initChat();
  }, 2600);   // 🔥 THIS IS THE FIX
  }

  /* ================= HELPER FUNCTIONS ================= */
  // Preload image and return promise
  function preloadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // Position characters adjacent to phone with 1-2px gap
  function positionCharactersAdjacent(phoneEl) {
    if (!phoneEl) return;
    
    const phoneRect = phoneEl.getBoundingClientRect();
    const boyImg = document.querySelector('.boy.with-phone');
    const girlImg = document.querySelector('.girl.with-phone');

    if (boyImg) {
      boyImg.style.position = 'absolute';
      boyImg.style.bottom = (window.innerHeight - phoneRect.bottom) + 'px';
      const boyWidth = boyImg.naturalWidth || 150;
      let leftPos = Math.round(phoneRect.left - boyWidth - 2);
      if (leftPos < 2) leftPos = 2;
      boyImg.style.left = leftPos + 'px';
      boyImg.style.right = 'auto';
      boyImg.style.zIndex = '4';
    }

    if (girlImg) {
      girlImg.style.position = 'absolute';
      girlImg.style.bottom = (window.innerHeight - phoneRect.bottom) + 'px';
      let leftPos = Math.round(phoneRect.right + 2);
      const girlWidth = girlImg.naturalWidth || 150;
      if (leftPos + girlWidth > window.innerWidth) {
        leftPos = Math.max(2, window.innerWidth - girlWidth - 2);
      }
      girlImg.style.left = leftPos + 'px';
      girlImg.style.right = 'auto';
      girlImg.style.zIndex = '4';
    }
  }

  /* ================= HEART EFFECT ================= */
  function spawnHeart(x, y, strong = false) {
    const heart = document.createElement("div");
    heart.className = strong ? "heart strong" : "heart soft";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), strong ? 1800 : 1400);
  }

  document.addEventListener("mousemove", e => {
    if (Math.random() > 0.91) {
      spawnHeart(e.pageX, e.pageY, false);
    }
  });

  document.addEventListener("click", e => {
    for (let i = 0; i < 3; i++) {
      spawnHeart(
        e.pageX + (Math.random() - 0.5) * 80,
        e.pageY + (Math.random() - 0.5) * 80,
        true
      );
    }
  });

  setInterval(() => {
    spawnHeart(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight * 0.6
    );
  }, 650);

  /* ================= CHAT ================= */
let screen;

function initChat(){
  screen = document.querySelector(".phone-screen");
  if(!screen){
    console.error("phone-screen not found");
    return;
  }
  msgIndex = 0;
  typeMessage();
}


  const messages = [
    "Hello madam ji 😊",
    "Boliye?",
    "HAPPY BIRTHDAY MADAM JI ✨",
    "Thank you , you're late vo december me tha and use gaye kafi time ho gya",
    "Ha i know main usi time esi liye to kah raha tha pr aap samjhi hi nahi and aapne khud mana kar diya tha",
    "so , what you mean esame meri galti hai by the way aapke wish karane se koi fark nahi padne vala hai?",
    "Nahi nahi aisa kuch bhi nahi hai , meri galti hai sorry",
    "okey",
    "Sorry madam ji fir se , meri vajah se aapko fir se  dikkat hui 😔",
    "It's okay, ye koi naya kaam to nahi kiye",
    "Toh maaf kar diya aapne?",
    "Hmm",
    "Ek chhoti si cheez hai aapke liye 💝",
    "kya?",
    "Screen pr slide hai uspe click karke dekhiye 👉"
  ];

  let msgIndex = 0;
  let typingDots;

  function typeMessage() {
    if (!screen) return;
    if (msgIndex >= messages.length) {
      // Show slide bar after last message
      setTimeout(() => {
        showSlideBar();
      }, 1000);
      return;
    }

    // Determine which side: even = left, odd = right
    const isLeft = msgIndex % 2 === 0;

    // Simulate typing: show typing dots on correct side
    typingDots = document.createElement("div");
    typingDots.className = isLeft ? "typing show left" : "typing show right";
    typingDots.innerHTML = "<span></span><span></span><span></span>";
    screen.appendChild(typingDots);
    screen.scrollTop = screen.scrollHeight;

    // After typing simulation, remove dots and pop full message
    setTimeout(() => {
      if (typingDots && typingDots.parentNode) {
        typingDots.remove();
      }

      const text = messages[msgIndex];
      
      // Create message bubble with full text (iOS pop animation)
      const bubble = document.createElement("div");
      bubble.className = isLeft ? "message left" : "message right";
      bubble.textContent = text;
      screen.appendChild(bubble);

      screen.scrollTop = screen.scrollHeight;

      msgIndex++;
      setTimeout(typeMessage, 1600); // pause before next message
    }, 1800); // typing simulation duration: 1800ms
  }

  /* ================= SLIDE BAR ================= */
  function showSlideBar() {
    const container = document.getElementById("slideBarContainer");
    if (!container) return;
    
    container.classList.add("show");
    initSlideBar();
  }

  function initSlideBar() {
    const track = document.querySelector(".slide-bar-track");
    const thumb = document.querySelector(".slide-bar-thumb");
    const radio = document.getElementById("slideRadio");
    if (!track || !thumb) return;

    // ensure thumb starts at left
    thumb.style.left = thumb.style.left || '2px';

    let isSliding = false;
    let startX = 0;
    let thumbLeft = 0;

    // Radio button click/change handler â€” also animate the thumb to keep things synced
    // shared auto-slide routine (used by radio, thumb click)
    const startAutoSlide = (duration = 1000) => {
      const trackWidth = track.offsetWidth;
      const maxLeft = trackWidth - thumb.offsetWidth - 6;
      thumb.style.transition = `left ${duration}ms cubic-bezier(.17,.67,.83,.67)`;
      // small requestAnimationFrame to ensure transition applies
      requestAnimationFrame(() => {
        thumb.style.left = maxLeft + 'px';
      });
      // cleanup transition after
      setTimeout(() => {
        thumb.style.transition = '';
      }, duration + 50);
    };

    const triggerAutoSlide = () => {
      track.classList.add('sliding');
      startAutoSlide(900);
      setTimeout(() => {
        track.classList.remove('sliding');
        completeSlide();
      }, 950);
    };

    if (radio) {
      radio.addEventListener('change', (e) => triggerAutoSlide());
      radio.addEventListener('click', (e) => triggerAutoSlide());
    }

    // allow clicking the thumb to trigger the auto-slide as well
    thumb.addEventListener('click', (e) => {
      // don't start if currently being dragged
      if (track.classList.contains('sliding')) return;
      triggerAutoSlide();
    });

    // Mouse Events
    track.addEventListener("mousedown", (e) => {
      if (e.target === radio) return; // Don't interfere with radio button
      startSliding(e.clientX);
      track.classList.add("sliding");
    });

    // Touch Events
    track.addEventListener("touchstart", (e) => {
      if (e.target === radio) return; // Don't interfere with radio button
      startSliding(e.touches[0].clientX);
      track.classList.add("sliding");
    });

    function startSliding(clientX) {
      isSliding = true;
      startX = clientX;
      thumbLeft = thumb.offsetLeft;
    }

    // Mouse Move
    document.addEventListener("mousemove", (e) => {
      if (!isSliding) return;
      updateThumbPosition(e.clientX);
    });

    // Touch Move
    document.addEventListener("touchmove", (e) => {
      if (!isSliding) return;
      updateThumbPosition(e.touches[0].clientX);
    });

    function updateThumbPosition(clientX) {
      const moveX = clientX - startX;
      const trackWidth = track.offsetWidth;
      const maxLeft = trackWidth - thumb.offsetWidth - 2;
      let newLeft = thumbLeft + moveX;

      // Constrain within bounds
      newLeft = Math.max(2, Math.min(newLeft, maxLeft));
      thumb.style.left = newLeft + "px";

      // Complete slide if reached end
      const slidePercent = newLeft / maxLeft;
      if (slidePercent > 0.85) {
        // snap to end and finish
        thumb.style.left = maxLeft + 'px';
        setTimeout(completeSlide, 120);
      }
    }

    // Mouse Up
    document.addEventListener("mouseup", () => {
      if (isSliding) {
        endSliding();
      }
    });

    // Touch End
    document.addEventListener("touchend", () => {
      if (isSliding) {
        endSliding();
      }
    });

    function endSliding() {
      isSliding = false;
      const track = document.querySelector(".slide-bar-track");
      if (track) track.classList.remove("sliding");
      
      // Reset thumb if not completed
      const trackWidth = track.offsetWidth;
      const maxLeft = trackWidth - thumb.offsetWidth - 2;
      if (parseFloat(thumb.style.left || 2) < maxLeft * 0.85) {
        thumb.style.left = "2px";
      } else {
        // if near end, finalize
        thumb.style.left = maxLeft + 'px';
        setTimeout(completeSlide, 120);
      }
    }
  }

  function completeSlide() {
    const container = document.getElementById("slideBarContainer");
    
    if (container) {
      // animate out then hide
      container.style.transition = 'opacity .28s ease, transform .28s ease';
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.display = 'none';
        // Clear messages and show buttons
        clearMessagesAndShowButtons();
      }, 320);
    }
  }

  function clearMessagesAndShowButtons() {
    const screen = document.querySelector(".phone-screen");
    if (!screen) return;

    // Clear all messages
    screen.innerHTML = "";

    // Button data
const buttons = [
  { label: "🥹 Sorry", color: "btn-blue" },
  { label: "💌 Message", color: "btn-gradient-1" },
  { label: "🎂 Cake", color: "btn-purple" },
  { label: "🎁 Gift", color: "btn-gradient-2" },
  { label: "🥰 About Madam Ji", color: "btn-cream" },
  { label: "🌟 Special", color: "btn-pink" },
  { label: "📹 Watch Video", color: "btn-blue" },
  { label: "🔚 End", color: "btn-purple" }
];

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-grid";
// 🔥 NOTE ABOVE BUTTONS
const note = document.createElement("div");
note.textContent = "👇 Neeche diye 8 options ko ek ek karke explore karein aur kisi aur ko na dikhaye";
note.style.cssText = `
  text-align:center;
  font-size:14px;
  margin-bottom:12px;
  color:#555;
  font-weight:600;
`;

buttonsContainer.appendChild(note);

   buttons.forEach((btn, index) => {
  const button = document.createElement("button");
  button.className = `action-btn ${btn.color}`;
  button.textContent = btn.label;
  button.style.animationDelay = `${index * 0.1}s`;

  // 🔥 First button = hero glow
  if (index === 0) {
    button.classList.add("hero");
  }

  // 🔥 CLICK: ripple + transition
  button.addEventListener("click", (e) => {

    // ripple effect
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height =
      Math.max(rect.width, rect.height) + "px";
    ripple.style.left =
      e.clientX - rect.left - rect.width / 2 + "px";
    ripple.style.top =
      e.clientY - rect.top - rect.height / 2 + "px";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // actual button action
    handleButtonClick(btn.label, index);
  });

  buttonsContainer.appendChild(button);
});

   screen.appendChild(buttonsContainer);
screen.scrollTop = 0;

/* 🔥 SCREEN CONFIRMATION PULSE */
screen.animate(
  [
    { transform: "scale(1)", filter: "brightness(1)" },
    { transform: "scale(1.02)", filter: "brightness(1.05)" },
    { transform: "scale(1)", filter: "brightness(1)" }
  ],
  {
    duration: 420,
    easing: "cubic-bezier(.2,.9,.25,1)"
  }
);
}

  function handleButtonClick(label, index) {

  const screen = document.querySelector(".phone-screen");
  const magic = document.getElementById("magicTransition");
  if (!screen || !magic) return;

  // decide placeholder content
  let content = "";

  // fade current content
  screen.animate(
    [
      { opacity:1, transform:"scale(1)" },
      { opacity:0.9, transform:"scale(0.96)" }
    ],
    { duration:260, easing:"ease-out", fill:"forwards" }
  );

  // magic wash
  magic.style.display = "block";
  magic.classList.add("active");

  setTimeout(() => {
    // prepare slide: show magic split effect
    magic.classList.add("split");

    // Elements
    const phoneEl = document.querySelector('.phone');
    // choose visible boy (usually .boy.without-phone) so we move the visible character
    const boyEl = document.querySelector('.boy.without-phone') || document.querySelector('.boy.with-phone');
    const girlEl = document.querySelector('.girl.with-phone') || document.querySelector('.girl.without-phone');

    const phoneRect = phoneEl ? phoneEl.getBoundingClientRect() : null;
    const boyRect = boyEl ? boyEl.getBoundingClientRect() : null;
    const girlRect = girlEl ? girlEl.getBoundingClientRect() : null;

    // slide phone out to left while preserving vertical translateY
    if (phoneEl) {
      phoneEl.style.transition = 'transform .48s cubic-bezier(.2,.9,.25,1), opacity .36s';
      phoneEl.style.transform = 'translateY(-50%) translateX(-110%)';
      phoneEl.style.opacity = '0';
    }

    // move the visible boy into the phone's previous position using transform translate
    if (boyEl && phoneRect && boyRect) {
      const dx = Math.round(phoneRect.left - boyRect.left);
      const dy = Math.round(phoneRect.top - boyRect.top);

      // compute current center-gap between boy and girl and expand to target range (1100-1200)
      if (girlRect) {
        const boyCenter = boyRect.left + boyRect.width / 2;
        const girlCenter = girlRect.left + girlRect.width / 2;
        const currentGap = Math.abs(girlCenter - boyCenter);
        const targetGap = 910; // target midpoint between 1100-1200
        const delta = targetGap - currentGap;

        let shiftEach = 0;
        if (delta > 0) shiftEach = Math.round(delta / 2);

        // apply transforms: move boy towards left by shiftEach, girl to right by shiftEach
        boyEl.style.transition = 'transform .48s cubic-bezier(.2,.9,.25,1)';
        boyEl.style.willChange = 'transform';
        const boyTranslateX = dx - shiftEach;
        boyEl.style.transform = `translate(${boyTranslateX}px, ${dy}px)`;
        boyEl.style.zIndex = 6;

        if (girlEl) {
          girlEl.style.transition = 'transform .48s cubic-bezier(.2,.9,.25,1)';
          const girlTranslateX = shiftEach;
          girlEl.style.transform = `translate(${girlTranslateX}px, 0)`;
          girlEl.style.zIndex = 5;
        }
      } else {
        boyEl.style.transition = 'transform .48s cubic-bezier(.2,.9,.25,1)';
        boyEl.style.willChange = 'transform';
        boyEl.style.transform = `translate(${dx}px, ${dy}px)`;
        boyEl.style.zIndex = 6;
      }
    }

    // distance badge suppressed (hidden per user request)

    // show centered glass modal with bubble/dot effect (max-height reduced to avoid overlapping chars)
    setTimeout(() => {
      const modal = document.createElement('div');
      modal.className = 'option-modal';
      // use a slightly smaller max-height and very high z-index to ensure modal sits above characters
     modal.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:86vw;max-width:900px;max-height:88vh;overflow-y:auto;overflow-x:hidden;z-index:10050;border-radius:16px;padding:18px;backdrop-filter:blur(8px) saturate(120%);background:linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));box-shadow:0 12px 40px rgba(2,8,23,0.6);';

      modal.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="font-weight:700;font-size:16px;color:var(--text-color);">${label}</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div style="display:flex;gap:6px;align-items:center;">
            
            </div>
            <button id="modalBackBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.12);color:var(--text-color);padding:6px 10px;border-radius:10px;cursor:pointer;">Back</button>
          </div>
        </div>
        <div class="modal-body" style="margin-top:12px;color:var(--text-color);font-size:15px;line-height:1.45;">
          <div class="mini-chat" style="padding:6px 4px;min-height:260px;max-height:70vh;overflow-y:auto;overflow-x:hidden;"></div>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = `@keyframes dotPulse{0%{transform:translateY(0);opacity:0.9}50%{transform:translateY(-6px);opacity:1}100%{transform:translateY(0);opacity:0.9}}`;
      document.head.appendChild(style);

      // hide phone entirely (some browsers may still render it when only transforming)
      if (phoneEl) phoneEl.style.display = 'none';

      // move characters slightly down/back so they don't peek above the modal
      const charsEl = document.querySelector('.characters');
      let charsPrev = null;
      if (charsEl) {
        charsPrev = {
          transform: charsEl.style.transform || '',
          transition: charsEl.style.transition || '',
          zIndex: charsEl.style.zIndex || ''
        };
        charsEl.style.transition = 'transform .48s cubic-bezier(.2,.9,.25,1)';
        charsEl.style.transform = 'translateY(36px)';
        charsEl.style.zIndex = '2';
      }

      document.body.appendChild(modal);

      // If not Sorry, place the content into the modal body
      if (!label.includes('Sorry')) {
        const miniChat = modal.querySelector('.mini-chat');
        if (miniChat) miniChat.innerHTML = content;
      }

      // If this is the Sorry option, populate the mini-chat with special behavior
      if (label.includes('Sorry')) {
        const miniChat = modal.querySelector('.mini-chat');

        // conversation content (split into two left messages, one right reply queued)
        const heMsgs = [
          "hello mamad ji kaise ho aap i hope aap sahi hogi and aap achchhe se preparation bhi kr rhi hogi , sorry es bad behaver ke liye aap esa mat socho ki main ese ab roj messeges karu nahi main kabhii bhi aapko pareshan karane ke intention se text nahi karta hu ye sab chhodo , main bs aapko aapke BD pr wish karane ke liye aaya hu  nothing more this.",
          "Do u know abhi mere pass aapko batane ke liye bahut kuchh h Pr pr pr 🤔... apaka time waste hoga n . Pr ek idea h agar aap free nahi ho to save kr lo Baad me dekh Lena ..."
        ];
        const sheMsg = 'thik hai..';

        let timeouts = [];

        function appendTyping(side) {
          const t = document.createElement('div');
          t.className = 'typing show ' + (side === 'left' ? 'left' : 'right');
          t.innerHTML = '<span></span><span></span><span></span>';
          miniChat.appendChild(t);
          miniChat.scrollTop = miniChat.scrollHeight;
          return t;
        }

        function appendBubble(text, side) {
          const b = document.createElement('div');
          b.className = 'message ' + (side === 'left' ? 'left' : 'right');
          // wrap text in span for char animation
          const span = document.createElement('span');
          span.textContent = text;
          b.appendChild(span);
          miniChat.appendChild(b);
          miniChat.scrollTop = miniChat.scrollHeight;
          return b;
        }

        // Play heMsgs sequentially, then show pending right message + Send button
        (function playSequence() {
          let idx = 0;
          function next() {
            if (idx >= heMsgs.length) {
              showPendingSend();
              return;
            }
            const typing = appendTyping('left');
            const to = setTimeout(() => {
              typing.remove();
              appendBubble(heMsgs[idx], 'left');
              idx++;
              const pause = 1000 + Math.min(1400, heMsgs[idx-1].length * 18);
              timeouts.push(setTimeout(next, pause));
            }, 1600);
            timeouts.push(to);
          }
          next();
        })();

        // create glowing send button (no pending text shown)
        let sendBtn = null;

        function showPendingSend() {
          // create a small footer container inside modal for the send button
          const footer = document.createElement('div');
          footer.style.cssText = 'display:flex;justify-content:center;padding-top:12px;';
          sendBtn = document.createElement('button');
          sendBtn.className = 'glow-send';
          sendBtn.textContent = 'Send';
          sendBtn.style.cssText = 'background:linear-gradient(90deg,#ff7ab6,#6fb3ff);border:none;color:#fff;padding:10px 18px;border-radius:20px;font-weight:700;box-shadow:0 6px 18px rgba(111,179,255,0.18),0 0 22px rgba(255,122,182,0.12);cursor:pointer;animation:glowPulse 1.6s ease-in-out infinite;';
          footer.appendChild(sendBtn);
          modal.querySelector('.modal-body').appendChild(footer);

          // send click: append girl's message and remove button
          const onSend = () => {
            appendBubble(sheMsg, 'right');
            sendBtn.removeEventListener('click', onSend);
            sendBtn.remove();
          };
          sendBtn.addEventListener('click', onSend);
        }

        // cleanup function to clear timeouts and remove send button
        const cleanupSeq = () => {
          timeouts.forEach(t => clearTimeout(t));
          timeouts = [];
          if (sendBtn) sendBtn.remove();
        };

        // attach cleanup to modal so Back can call it
        modal._cleanupSeq = cleanupSeq;
      }


      // ===== CAKE BUTTON HANDLER =====
      if (label.includes('Cake')) {
        const miniChat = modal.querySelector('.mini-chat');
        miniChat.innerHTML = '';

        // Create 2-tier cake SVG
        const cakeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        cakeSvg.setAttribute('viewBox', '0 0 200 300');
        cakeSvg.setAttribute('width', '180');
        cakeSvg.setAttribute('height', '270');
        cakeSvg.style.cssText = 'display:block;margin:20px auto;cursor:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22%3E%3Cline x1=%2710%27 y1=%272%27 x2=%2710%27 y2=%2718%27 stroke=%22%23333%22 stroke-width=%222%22/%3E%3C/svg%22) 10 0, auto;user-select:none;';
        cakeSvg.id = 'cake-svg';

        // Cake tiers
       // ===== BOTTOM TIER =====
const tier1 = document.createElementNS('http://www.w3.org/2000/svg','rect');
tier1.setAttribute('x','30');
tier1.setAttribute('y','150');
tier1.setAttribute('width','140');
tier1.setAttribute('height','80');
tier1.setAttribute('rx','12');
tier1.setAttribute('fill','#ff8fa3');
cakeSvg.appendChild(tier1);

const cream1 = document.createElementNS('http://www.w3.org/2000/svg','rect');
cream1.setAttribute('x','30');
cream1.setAttribute('y','150');
cream1.setAttribute('width','140');
cream1.setAttribute('height','18');
cream1.setAttribute('fill','#fff1d6');
cakeSvg.appendChild(cream1);


// ===== TOP TIER =====
const tier2 = document.createElementNS('http://www.w3.org/2000/svg','rect');
tier2.setAttribute('x','55');
tier2.setAttribute('y','90');
tier2.setAttribute('width','90');
tier2.setAttribute('height','60');
tier2.setAttribute('rx','12');
tier2.setAttribute('fill','#ffb3c1');
cakeSvg.appendChild(tier2);

const cream2 = document.createElementNS('http://www.w3.org/2000/svg','rect');
cream2.setAttribute('x','55');
cream2.setAttribute('y','90');
cream2.setAttribute('width','90');
cream2.setAttribute('height','14');
cream2.setAttribute('fill','#fff1d6');
cakeSvg.appendChild(cream2);

// ===== THIRD TOP TIER =====
const tier3 = document.createElementNS('http://www.w3.org/2000/svg','rect');
tier3.setAttribute('x','70');
tier3.setAttribute('y','50');
tier3.setAttribute('width','60');
tier3.setAttribute('height','40');
tier3.setAttribute('rx','10');
tier3.setAttribute('fill','#ffc2d1');
cakeSvg.appendChild(tier3);

const cream3 = document.createElementNS('http://www.w3.org/2000/svg','rect');
cream3.setAttribute('x','70');
cream3.setAttribute('y','50');
cream3.setAttribute('width','60');
cream3.setAttribute('height','12');
cream3.setAttribute('fill','#fff1d6');
cakeSvg.appendChild(cream3);

// ===== CHERRIES =====
function cherry(x,y){
  const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
  c.setAttribute('cx',x);
  c.setAttribute('cy',y);
  c.setAttribute('r','6');
  c.setAttribute('fill','#e63946');
  cakeSvg.appendChild(c);
}

cherry(85,50);
cherry(100,45);
cherry(115,50);

        // Text on cake
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '100');
        text.setAttribute('y', '190');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '16');
        text.setAttribute('fill','#ffffff');
        text.setAttribute('font-size','14');
        text.setAttribute('font-weight', 'bold');
        text.textContent = 'cut the cake';
        cakeSvg.appendChild(text);

        miniChat.appendChild(cakeSvg);

        // Knife cut interaction
        let isDrawing = false;
        let lastX = 0, lastY = 0;
        let cutPoints = [];

        cakeSvg.addEventListener('mousedown', (e) => {
          isDrawing = true;
          const rect = cakeSvg.getBoundingClientRect();
          lastX = e.clientX - rect.left;
          lastY = e.clientY - rect.top;
          cutPoints = [[lastX, lastY]];
        });

        document.addEventListener('mousemove', (e) => {
          if (!isDrawing) return;
          const rect = cakeSvg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          cutPoints.push([x, y]);

          // Check if cutting through cake (simple bounds check)
          if (x > 30 && x < 170 && y > 80 && y < 230) {
            // Animate cut
            if (Math.random() < 0.3) {
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line.setAttribute('x1', lastX);
              line.setAttribute('y1', lastY);
              line.setAttribute('x2', x);
              line.setAttribute('y2', y);
              line.setAttribute('stroke', '#FFD700');
              line.setAttribute('stroke-width', '3');
              cakeSvg.appendChild(line);
            }
          }

          lastX = x;
          lastY = y;
        });

        document.addEventListener('mouseup', () => {
          if (isDrawing && cutPoints.length > 10) {
            // Cake cut successfully
            isDrawing = false;

            // Animate cake split
            tier1.style.opacity = '0.6';
            tier2.style.opacity = '0.6';

            // Party confetti & boom
            showPartyAnimation();

            function firecrackerBurst() {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");

    const size = 10 + Math.random() * 14;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6;

   p.style.cssText = `
position:fixed;
left:${x}px;
top:${y}px;
width:${size}px;
height:${size}px;
background:${['#ff4da6','#ffd700','#00e5ff','#7CFC00','#ff7f50'][Math.floor(Math.random()*5)]};
pointer-events:none;
z-index:10002;
border-radius:50%;
box-shadow:
0 0 8px currentColor,
0 0 16px currentColor,
0 0 24px currentColor;
animation: sparkBoom 0.9s ease-out forwards;
`;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

            // Show "Happy Birthday PRINCESS"
            setTimeout(() => {
 const msg = document.createElement('div');
msg.style.cssText = `
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
font-size:46px;
font-weight:800;
font-style:italic;
font-family:"Segoe Script","Brush Script MT",cursive;
color:#ff69b4;
letter-spacing:2px;
text-align:center;
animation:zoomCelebrate 2s ease forwards;
z-index:10001;
white-space:nowrap;
text-shadow:0 0 14px rgba(255,105,180,.6);
`;

msg.textContent = '🎉 HAPPY BIRTHDAY PRINCESS 🎉';

              document.body.appendChild(msg);
              const crackerInterval = setInterval(firecrackerBurst, 700);


document.body.style.transition = "filter 1.2s ease";
const smoke = document.createElement("div");
smoke.id = "cakeSmoke";
smoke.style.cssText = `
position:fixed;
inset:0;
background:rgba(0,0,0,0.75);
backdrop-filter:blur(6px);
z-index:10000;
opacity:0;
transition:opacity 0.8s ease;
`;
document.body.appendChild(smoke);
modal.style.opacity = "0";
modal.style.transition = "opacity .6s ease";

setTimeout(() => smoke.style.opacity = "1", 50);

setTimeout(() => {

  // fade text out first
  msg.style.transition = "opacity .7s ease";
  msg.style.opacity = "0";

  setTimeout(() => {
    msg.remove();
  }, 700);

  const smoke = document.getElementById("cakeSmoke");
  if (smoke) smoke.remove();

  modal.remove();
  style.remove();


  magic.classList.remove('split');
  magic.classList.remove('active');
  magic.style.display = 'none';

  // 🔥 restore phone
  const phoneEl = document.querySelector('.phone');
  if (phoneEl) {
    phoneEl.style.display = '';
    phoneEl.style.opacity = '1';
    phoneEl.style.transform = 'translateY(-50%) translateX(0)';
  }

  // 🔥 restore characters
  document.querySelectorAll('.char').forEach(c => {
    c.style.transform = '';
    c.style.transition = '';
  });

  // 🔥 show buttons again
  clearMessagesAndShowButtons();

  clearInterval(crackerInterval);

}, 6000);

            }, 500);
          } else if (isDrawing) {
            isDrawing = false;
          }
        });

        function showPartyAnimation() {
          // Create confetti particles
          for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
position:fixed;
width:12px;
height:12px;
background:${['#ff4da6','#ffd700','#00e5ff','#7CFC00'][Math.floor(Math.random()*4)]};
left:${Math.random()*window.innerWidth}px;
top:100px;
border-radius:50%;
pointer-events:none;
animation:fall ${2+Math.random()*2}s linear forwards,
boom 0.6s ease-out;
`;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 5000);
          }
        }
      }

      // ===== MESSAGE BUTTON HANDLER =====
      if (label.includes('Message')) {
        const miniChat = modal.querySelector('.mini-chat');
        miniChat.textContent = '📍 One by one 📋 Step by step 🚀 each buttune pr click karana';
      }

      // ===== GIFT BUTTON HANDLER =====
      if (label.includes('Gift')) {
        const miniChat = modal.querySelector('.mini-chat');
        const giftMsg = document.createElement('div');
        giftMsg.style.cssText = 'text-align:center;font-size:18px;padding:20px;color:#666;';
        giftMsg.textContent = 'Sorry abhi to kuch h nahi es baar na thodaa shortage h pr ab fijul kharch bhi nahi karata kuch bhi nahi hmm pr kabhi kabhi bike se ghumne nikal jata tha not daily but some time to mere paas kuchh hai nahi abhi aapke liye to uske liye sorry but meri best wishes always with you [ waise I know wishes se kuch nahi hota h but abhi to yahi hai mere pass 😓]';
        miniChat.appendChild(giftMsg);
        // User will add content here via: miniChat.innerHTML or miniChat.textContent = "your message"
      }

      // ===== ABOUT MADAM JI BUTTON HANDLER =====
      if (label.includes('About Madam Ji')) {
        const miniChat = modal.querySelector('.mini-chat');
        miniChat.innerHTML = '';
        
        // Create two option buttons
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display:flex;flex-direction:column;gap:20px;padding:20px;align-items:center;';
        optionsContainer.id = 'madam-options';
        
        // Option A: Good Thing
        const goodBtn = document.createElement('button');
        goodBtn.textContent = '[A] GOOD THING';
       goodBtn.style.cssText = `
  padding:14px 22px;
  background:linear-gradient(135deg,#b6f0d4,#9fd6ff);
  color:#04325a;
  border:none;
  border-radius:16px;
  font-weight:700;
  font-size:14px;
  cursor:pointer;
  letter-spacing:1px;
  transition:all .3s ease;
  align-self:center;
  width:fit-content;
  box-shadow:
    0 10px 24px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.6);
`;
        goodBtn.addEventListener('mouseenter', () => {
          goodBtn.style.boxShadow = '0 0 20px #00ff88';
          goodBtn.style.transform = 'scale(1.02)';
        });
        goodBtn.addEventListener('mouseleave', () => {
          goodBtn.style.boxShadow = 'none';
          goodBtn.style.transform = 'scale(1)';
        });
        goodBtn.addEventListener('click', () => {
          showGoodThing();
        });

        // Option B: Bad Thing (moves away)
        const badBtn = document.createElement('button');
        badBtn.textContent = '[B] BAD THING';
        badBtn.style.cssText = `
  padding:14px 22px;
  background:linear-gradient(135deg,#ffd6e8,#ff9ccf);
  color:#4b0b2a;
  border:none;
  border-radius:16px;
  font-weight:700;
  font-size:14px;
  cursor:pointer;
  letter-spacing:1px;
  transition:all .3s ease;
  position:relative;
  align-self:center;
  width:fit-content;
  box-shadow:
    0 10px 24px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.6);
`;
        
        let badBtnAttempts = 0;
        const badBtnClickHandler = (e) => {
          badBtnAttempts++;
          const randomX = (Math.random() - 0.5) * 300;
          const randomY = (Math.random() - 0.5) * 300;
          badBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
          badBtn.style.cursor = 'not-allowed';
          
          if (badBtnAttempts >= 5) {
            badBtn.removeEventListener('mouseenter', moveAwayHandler);
            badBtn.style.opacity = '0.2';
            badBtn.style.pointerEvents = 'none';
            badBtn.textContent = '[HIDDEN]';
          }
        };
        
        const moveAwayHandler = () => {
          const randomX = (Math.random() - 0.5) * 300;
          const randomY = (Math.random() - 0.5) * 300;
          badBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        };
        
        badBtn.addEventListener('click', badBtnClickHandler);
        badBtn.addEventListener('mouseenter', moveAwayHandler);

        optionsContainer.appendChild(goodBtn);
        optionsContainer.appendChild(badBtn);
        miniChat.appendChild(optionsContainer);

        function showGoodThing() {
          miniChat.innerHTML = '';
          const morseBubble = document.createElement('div');
          morseBubble.style.cssText = 'background:transparent;color:#000;padding:30px;text-align:center;border-radius:10px;font-family:"Courier New",monospace;font-weight:bold;white-space:pre-wrap;word-wrap:break-word;min-height:200px;display:flex;align-items:center;justify-content:center;';
          morseBubble.textContent = `-- -.-- / -- .- -.. .- -- / .--- .. / .-- .... --- / -.-. .- -. / -. . ...- . .-. / -... . / -- .. -. . / .... .- ...- . / ..- -. / -.-. --- ..- -. - - .- -... .-.. . / --.- ..- .- .-.. .. - .. . ...`;
          miniChat.appendChild(morseBubble);
        }
      }
      // ===== QR VIDEO BUTTON =====
if (label.includes('Watch Video')) {
  const miniChat = modal.querySelector('.mini-chat');

  miniChat.innerHTML = `
    <div style="text-align:center;padding:10px;">
      <h3 style="margin-bottom:12px;">🎥 play this when you are free and alone also use earphone or headphone</h3>

      <div id="qrOptions" style="
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:14px;
        margin:20px auto;
        max-width:320px;
      ">
        <button class="qr-btn" data-qr="1">✨ 1st this</button>
        <button class="qr-btn" data-qr="2">💫 then this</button>
        <button class="qr-btn" data-qr="3">🌙 2nd last</button>
        <button class="qr-btn" data-qr="4">⭐ last one</button>
      </div>

      <div id="qrDisplay"></div>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    .qr-btn{
      padding:14px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,0.25);
      background:linear-gradient(135deg,
        rgba(255,255,255,0.18),
        rgba(255,255,255,0.05));
      backdrop-filter:blur(8px);
      color:white;
      font-weight:600;
      cursor:pointer;
      transition:.3s;
      box-shadow:0 8px 20px rgba(0,0,0,0.25);
    }

    .qr-btn:hover{
      transform:translateY(-4px) scale(1.03);
      box-shadow:0 0 18px rgba(255,105,180,.6);
    }

    .qr-btn:active{
      transform:scale(.96);
    }
  `;
  document.head.appendChild(style);

  const buttons = miniChat.querySelectorAll('.qr-btn');
  const display = miniChat.querySelector('#qrDisplay');

  buttons.forEach(btn => {
    btn.onclick = () => {
      const num = btn.dataset.qr;

      display.innerHTML = `
        <div style="margin-top:12px;">
          <img src="assets/qr${num}.png"
               style="width:240px;border-radius:14px;
               box-shadow:0 10px 25px rgba(0,0,0,.35);">

          <p style="margin-top:10px;color:#666;">
            Scan with your phoneto watch 
          </p>
        </div>
      `;
    };
  });
}

      // ===== END BUTTON HANDLER =====
      if (label.includes('End')) {

  // remove modal
  modal.remove();

  // create full screen black layer
  const endScreen = document.createElement("div");
  endScreen.style.cssText = `
    position:fixed;
    inset:0;
    background:#000;
    z-index:20000;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-size:40px;
    font-weight:700;
    font-family:"Segoe Script","Brush Script MT",cursive;
    letter-spacing:3px;
  `;

  document.body.appendChild(endScreen);

  // typing text container
  const text = document.createElement("div");
  endScreen.appendChild(text);

  if (label.includes('End')) {

  // remove modal
  modal.remove();

  // FULL SCREEN BLACK OVERLAY
  const endScreen = document.createElement("div");
  endScreen.style.cssText = `
    position:fixed;
    inset:0;
    background:#000;
    z-index:20000;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:40px;
  `;
  document.body.appendChild(endScreen);

  // TEXT CONTAINER
  const textBox = document.createElement("div");
  textBox.style.cssText = `
    max-width:1000px;
    color:#fff;
    font-size:22px;
    font-family:"Segoe Script","Brush Script MT",cursive;
    line-height:1.7;
    letter-spacing:1px;
    white-space:pre-wrap;
    text-align:center;
  `;
  endScreen.appendChild(textBox);

  // ===== INPUT TEXT (MAIN MESSAGE) =====
  const mainMessage = `
so moral of this web page yahi h ki aap apana achche se rahana and kisi bhi galat kaam ka hissa mat banana ,
main thoda pagal hu pr maine jab se ye suna h ki aap yahi delhi me ho tab se mera dimag hi ajib ho gaya h
but mujhe kuch bhi ho aap ko usase koi fark nahi padna chaiye okey

aur madam ji achachhe se rahana aap
BYE BYE

agar maan ho to ek voice message me es page ka feed back de skti ho
(kya hai na aapse puchh ke main use save kr lunga agar aap kahogi to)
kya hua aapko roj dekh nahi skta to main aapko roj sun to paunga n

dekho main ab thoda thoda pagala raha ho
ab main chala sapano me aapse bade karane

BYE BYE AND APANA DHYAN RAKHIYEGA YADAV JI 💗
`;

  // ===== SECOND MESSAGE =====
  const lastMessage = `
kya hua jao ab
khel khatam
jao ab
`;

  let i = 0;
  const typingSpeed = 80; // 🔥 SLOWER TYPING (ms)

  function typeMainText() {
    if (i < mainMessage.length) {
      textBox.textContent += mainMessage[i];
      i++;
      setTimeout(typeMainText, typingSpeed);
    } else {
      // wait 20 seconds, then show final text
      setTimeout(typeLastText, 20000);
    }
  }

  function typeLastText() {
    textBox.textContent += "\n\n";
    let j = 0;

    function typeEnd() {
      if (j < lastMessage.length) {
        textBox.textContent += lastMessage[j];
        j++;
        setTimeout(typeEnd, 70);
      }
    }
    typeEnd();
  }

  typeMainText();
}

  let i = 0;

  function typeLetter(){
    if(i < message.length){
      text.textContent += message[i];
      i++;
      setTimeout(typeLetter, 90); // typing speed
    }
  }

  typeLetter();
}

            // Special button flow: strict sequential chat with He auto-send and She wait-for-click
      if (label.includes('Special')) {
        const miniChat = modal.querySelector('.mini-chat');

        const specialChat = [
  { sender: 'he', text: `Dekho i dont know main aapko vo de paunga ya nahi pr aapko pata nahi hoga main 2 mahine se ese plan kr raha tha  es web site ko nahi bs us gift ko dene ka plain bana raha tha, and finaly main kaam kr gaya dekho dekho gussa nahi karane ka but reality check du to sach me gusse me bhi aap mast mast lagti ho yes yes ab main thoda open ho raha hu cuz ye main last time aapse baat kar raha hu {mujhe esa lagta hai} to es liye aab aap puchho gi kaise to vo ese main na jab se aapko use id se unadd kiya tha tab se ( pahale ek kaam karo us id ko block kr do @kishan170406 i dont know kaise vo kisi samsung s6 me bhi log in h aur abhi bhi use hota koi to use karata h to use block kr do report kr do aur jo bhi h sab kr do ok ) mere ko thoda thoda ese ajib sa lagane laga janta hu Ye sb bs bakawash h pr aap kya jano kaise jata tha mera din 🤧 aur raste to ese ho chuke hai jaise ki tota maina ka bajar bhai sahab har raste me darzan me log dikh rahe hai aur jaha dekho vaja ek yahi sab pagal bhare pade h ajib lagta tha aur bhai sahab rona to next level pr aata tha 🥲🥲🥲 , kyo ki main sochata rahta tha ki aap kaha hogi kaisi hogi etc......, lekin mujhe kya pata tha kahani me twist aa jayega.......` },
  { sender: 'she', text: 'To' },
  { sender: 'he', text: 'kuch nahi suniye to' },
  { sender: 'she', text: 'hmm boliye' },
  { sender: 'he', text: `Ese hi dhire dhire mere ko na logo se chidchidahat hone lagi logo se baat karane ka man nahi karata tha aur mast akela akele sade hue limbu ki harah sakal leke baitha rahata tha ghanto tak koi movment nahi karata tha ek dam pappet ki tarah jaha ka taha baitha rahta tha akele fir ek din baitha tha kahi nahi gaya tha mast sa room pr phone me game khelana sikh raha tha Free fire ..... to fir youtube pr video dekha kaise kaise khele aur fir ese hi ek randome si video aayi aur use suna fir main kya chill ho gaya bhai sab ek dam sahi hone laga 3 chij chhod kar, ab pura to bata nahi paunga pr etana batata hu ki usme ese kaha na ki jo bhi chij tumhe sabse mast lagata h feel karo like ki abhi bhi vo tumhare pas h infact vo bhi tumhare tone me baat kr raha h aur fir maine jo sochana chalu kiya kya hi batau kya kiya maine , aapko pata h ki nahi mujhe nahi pata pr mere sochane ki takat or u can say imagination power aap logo se bahut uper h ulte sidhe kaam karane me kaam ki chij me nahi Fir main karane lagay aapko imagine aur kya mast lag raha yaar ha usme bhi ap rah rah ke reality ki taraf behave karane lagte the pr aap ek dam mast thi apko pata h main daily aapse baat karana chahata tha pr nahi kr skta tha fir socha ki aapki tasvir se hi baat kr lu pr noop ek bhi nahi cuz mere ander ek chul tha ek time pr ki aap bhi to normal insan hi ho to jaise main chije bhul jata hu vaise hi aapko bhi bhul jaunga mushakil se 90 din (kyo ki mujhe lagata hai ki agar main koi kaam bina man ke karu to ek time baad main vo nahi karata and with in 10 days main vo kaam bhul jata hu , pr aake case me ye ability kaam hi nahi aayi .... kyo ? pata nahi ? ) to man me bahut sari chije thi pr kaise kahu kisase kahu nahi samjh me aata tha pr now i have ek great idea jo ki main khoja hu uska credit mujhe jata h ab suno ab mere pass ek alternetive solution aa gaya to ab main sote jakte uthate baithate jaha marji vaha aapke sath rahata hu ya kah lo ki aap ab mere sath rahate ho har time har jagah har gali har vo point jaha main chahata hu aur suno aap to usme mere ko sugget bhi karati ho aur jab jab kuchh galti karata hu yaa kisi chij me harata hu to support bhi karti ho thoda rah rah kar dat deti ho mere mammy ki tarah pr aap mast ho usme yaar sachi` },
  { sender: 'she', text: 'hmm..' },
  { sender: 'he', text: 'Aap sun rahi ho na?' },
  { sender: 'she', text: 'Yes' },
  { sender: 'he', text: `Aapko pata h kya aap ko jab main pahali pahali bar dekha tha na afrer covid , civil dress me same usi out fir me aap aati ho , same vahi white colour ka kurta aur same blue baggy jeans aur khule baalo me aur aap badal badal ke spectacle laga ke aate ho kabhi white kabhi crome kabhi brown to kabhi black pr mast lagti ho infact main to abhi bhi aapko imagin kar raha vo bhi two diffirent frame me ek me aap aap sabhi chijo ko dekh ke aap bahut jyada gussa ho thodi si pareshan thoda jyada khush dikh rahi ho aur ye sab pagal pan jo main likh ke bhej rahu vo sab ek chhoti si cute si smile de ke dekh rahi ho aur vahi ek second frame me aap mere se etana jyada frustrated dikh rahi kya batau infact aapne to vo sab dekha bhi nahi aur aap man hi man soch rahi ho ki ese kal jaake fek dungi aur abhi padate hue aap jyada hi gusse me ho aur irritated bhi lag rahi ho syd meri hi vajah h ok im sure mere hi vahaj se , pr pr aap abhi imagination me ye kah rahi ho "main chill ho dont worry aur jab etana bol diya h to ab kya", Aur aapko pata h main ek ek baar ese hi man me aapse puchha ki agar main thoda sa manner aur achachchha kr lu aur thoda sence bana lu ki kab bolna h kab nahi to fir aap meri dost ban skti jo kya , to aapka reply pata h kya tha ( honestly bata raha hu ) dekho kuch bhi kar lo tum chomu + chaman ch###ya hi lago ge aur main apne stander se high logo se hi contect rakhati hu tumhare jaiso se nahi , aur etana sun ke to mere ko to pahale bura laga fir baat sahi lagi ki nahi yaar aap kah to sahi rahi ho main hu to thoda sa vaisa hi mere bhi sabhi dost kahate ab maan lo sab galat kahate honge pr aap to nahi kahati hogi 🤔”` },
  { sender: 'she', text: 'Yes' },
  { sender: 'he', text: `Pr jo bhi aap mast ho yaha se leke vaha tak ek dam best mast mast ho bole to ek number ha meri mere hi imagination me thodi thodi fatati to h jab thoda sa serious hike mere ko dekhate ho pr pr i can manage ... Do u know mere pass batane ke liye etane sare chije h etane sare kand h pr kya hak se batau ye nahi samajh me aata aur fir aapko pasand bhi to nahi h chhodo chhodo pr madam ji ek baat batao man lo aap ek well setal high paeing job like 120-180LPA me ho aur highyfy sociaty ki high class insan ban gaye ho achchha job kar rahi tab to aapki jisase sadi hogi vo bhi vaisa hi kuchh hoga ya fir ho skta h usase bhi achcha like koi achchha profile vala in sence sDM , DM , CM, IPS , IAS , NDA , NRI , Officer ya koi political insan tab vo kitana sahi hoga n 😶😶` },
  { sender: 'she', text: ' kya? kya bolte rahte hai.. auren sab chijo se aapko kya?' },
  { sender: 'he', text: 'sorry..' },
  { sender: 'she', text: 'hmm..😑' },
  { sender: 'he', text: `Ye sb etana importaint bhi nahi btw madam ji suno aap bahut achchha kar rahi ho aur bahut achchha perform bhi krogi aur dekh lena aap apane dream ko bhi bahut jald aur bahut achchhe se archive karogi pr suno thoda sa , abhi ek stage aayegae jaha aap multiple logo se connected rahoge aur use ham Collage kahate h , thoda ajib h pr suno mujhe en sab chijo ka knowledge nahi h pr aap thoda sa bach bacha ke rahana jaha bhi hoga , agar main na kahu to bhi aap achche se hi rahogi pr  fir bhi log bahut ajib hote h bahut ajib vo dikhate kuchh aur h aur hote kuchh aur pr aap thoda safe rahana please aap bachchi nahi ho pr aapko pata hoga ki aaj kal galtiya vahi kr rahe jo bahut jyada pade likhe h aur bade ho chuke h vo apane decision pr etana jyada believe karate h ki vo jante hi nahi galat kya h sahi kya h ab main pura bol to nahi skta ap dekh to rahi hi jogi pr be sensible aur kuchh special tips h jo ki aapko collage me kaam dega 1. Kisi bhi comman pg pr mat stay karana khash kr ke independed pg pr 2. Try karana ki aapke guardian ke sath stay karana 3. Collage ka hostel thik h but utana nahi kyo ki vaha ka khana bahut bakawash hota h bilkul bhi khane layak nahi hota h 4. straight forward baat faltu ,  character less log , aawar aur jo bhi aapko pasand na ho unse dur rahana baat sabse bani rahe pr kiso se faltu conections nahi ok(vaise mere ko nahi pata main etana jyada faltu kab se aaur kyo bolne laga hu pr suno) 5. Aur try karana aapko khana bana aata ho kyo ki bahar ka tast achcha nahi lagega pahali pahali baar me aur agar aapko banane aayega to aap mast mast bana ke kha logi nahi to un sab ka rukha sukha kha ke aap patali dubali ho jao gi , pr aap thodi thi golu molu aachchhi lagti ho judge nahi kar raha hu bs apane side se thoda sa bata raha hu ok 6. Madam ji aap jab bhi collage logi to may be high posibility h ki aap top tier state side me hi logi like benglore , mumbai , pune , delhi , noida aur kisi other side par lekin kisi top city me hi logi to madam ji vaise ye mera bolane ka kaam nahi pr morden city me bahut utpatan log rahate h majority ki baat kar raha hu sabki nahi to aap ek chij ka khayal rakhana kisi bhi galat chij me involve nahi hona plz kisi bhi type ka nahi whatever thats smoke drinke rondam travaling party clube pube etc jo bhi ye sab achchha nahi hota h aur ek chij h main khul ke bol nahi paaunga pr aaj ke time me vo problem nahi flex h aur bahut sare misunderstanding ka reason bhi agar aap samgh gayi ho to vo sab bhi mat karana may bhi aapke aas pas ke log achche ho pr vaha bure bhi honge par aap sambhal ke rahna aap ok aur agar aap nahi samjhi to fir to koi problem hi nahi h aap ek dam sahi raste pr ho bas logo se sambhal ke rahana okey. 7. Dekho madam ji agar aap kisi gov. Collage me jao gi na to vaha ek comman problem h ki vaha seniores paresan karate h to kae baar hostelar ko problem hoti h thats y i say ki collage campas ka hostel try karana mat lena aur agar kabhi esa hua to aap kisi apane ko inform karana pahale kisi bade ko sidhe self independend ladki ban ke mat jana apane risk par i will pray ki esa kabhi na ho pr kabhi hua to thoda soch ke kaam karana aap pr dabana mat stronge rahana aur agar situation jyada cretical ho jaye kabhi to kisi se help lena okey` },
  { sender: 'she', text: 'achchha..🥱' },
  { sender: 'he', text: `Pata hai madam ji i know ki aap mere se jyada meture ho infact aapko achche se pata h kya sahi h kya galat pr mujhe hamesa ye dar rahata h ki kahi aap kabhi es baat me hi apane galata decision ko bs sahi proof karane ke chakar me aap koi galat kaam na kar lo ha ha ab ye mat kahana ki aap ab bachchi nahi ho i know pr aaj kal bade hi sbse jyada galti kr rahe h . Ok btw lekin aap bahut sunder aur cute lagti ho yaar 🤧 , mere ko ye bilkul achchha nahi lag raha ki meri sabse man pasand chij mere ko hi nahi pasand karti 😅 bura h bahut jyada , madam ji man karata h hi ek baar normal ho jata to fir vo har kosis karata jo ho pata pr pr pr not for real "ab aapko kaise bataye ki aapko kaise dekhate h ham apane najariye se , ek baar jo tum dekhoge to ye duniya hi tumhe bemole lagegi" pr pr pr baat vahi h ki reality me aao vo importaint h ab to bahut achchha bachchha ban gaya h lagbhag sare galat kam chhod diya hu aur eska pura cradit aapke version ko jata h jo mere imagination me aata h. Main to aapke utana close bhi kabhi nahi raha pr miss bahut karata hu aapko bhale hi main aapko imagin and feel kr pata hu pr h to vo still imagination hi ha 😌. Khair ye sab faltu ki baate h bina kisi matalab ki . Par masala ye h ki Aap bahut achchhi achchhi ho main pata nahi kyo aapkeliye etana mohit hu pr aap bahut cute cute pyari pyari lagti ho bahut sundar mundar main jab jab sochata hu aapko main sabse happy rhta hu na jane kyo mujhe nahi pata ki main aapko etana irriteting kyo lagata hu ki aap bilkul bolna bhi achchha nahi samajhati , syd main hi galat samjhata hu ya fir jo whatever Definetly aap kuchh time baad achchhe collage me chale jaogi aur fir aap bhi mehant shortcut say nahi kar ke ek mast si software engineer ban jao gi to fir aap bhi kisi mast insan ke sath setal ho jao gi na .. madam ji Aap ek chij bataogi kya ? Maan lo madam ji just a hypothetical condition maine dekha h like vo kuchh achchha archive kr lete h and fir vo bade bade post like IAS IPS DM sDM NDA officer ban jate h to fir sab sahi ho jata h jo bhi misunderstanding hoti hogi vo sab , mere to padai likhai me kuchh nahi hoga agar main 1000 time bhi attempt karu to bhi pr lets assume ki agar esa ho gaya then.............. 🤔 Tab to madam ji main to aapke nazaro me achchha insan ban jaunga na pr agar maan bhi lu ki ye ho jayega mere se to bhi minimum 14-15 saal to lagega hi kayoki bahut padana padega aur tab to aapki sadi bhi ho gayi hogi mere pas eska answer nahi h pr agar aap mere ko unfriend nahi ki rahi hogi to aap mujhe apana opinion dena plz . Aaapko aapke BIRTHDAY ki dher sari wish christmas ki new year ki sabhi ki bahut sari wishes aur all the best for ur exam and best of luck aur maine jo paper pr likha h vo yaad rakhana madam ji plz mere ko invite karana jarur n madam ji plz .Main ye sab na jane 1 mahine bhale hi  pahale hi likh rakha hu to kya pr mera chat leave karane ka man hi nahi ho raha . Leave it all Happy Birthday , marry chistmas , Happy New year , best of luck & all the best for your exam and future plan ok madam ji aur ha hame to bhul hi jao ge pr mere paper statement ko bhulna mat bulana 😊...... ` },
  { sender: 'she', text: 'i will think about it' },
  { sender: 'he', text: 'Do you know madam ji jab main aapke wish kiya tha na tab matalb mera ek dam hartbeat peak pr tha i dont know why pr tha syd es liye ki mujhe esa lag raha tha ki raat ke 12:00 aapko text karunga to aap disturb ho jao gi may be pr kya ajib tha vo aur maine new year ko aapko es liye wish nahi kiya raat me kyo ki aap mujhe pasand nahi karti ho i know infact aap to sochati ho ki main dikhu bhi to agar main ese kar deta to according to achchha nahi hota cuz 4 samaj jo kaam newyear ko hota hai vo saal bar hota h' },
  { sender: 'she', text: 'achchha' },
  { sender: 'he', text: 'madam ji aap mere ko english sikhao gi matalb aap kabhi bhi mere se bat karana kyo na gusse me hi to bhi english me bolna' },
  { sender: 'she', text: 'kyo ? kyo shikhana hai?' },
  { sender: 'he', text: 'ese hi communicationke liye aur vaise bhi ye to ek language h na es liye' },
  { sender: 'she', text: 'to mere se hi kyo ? sikhana hai kahi aur se sikh lijiye ...' },
  { sender: 'he', text: 'aapki bate ek baar me mind me fix ho jati h yaad rahta hai hamesa es liye' },
  { sender: 'she', text: 'kya ? kya faltu bat kar rahe hai' },
  { sender: 'he', text: 'kuch nahi waise madam ji aap to janti hi ho ki main thoda chomu hu' },
  { sender: 'she', text: 'hmm janti hu , sirf chomu to ho hi uper se baklol pagal bhi ho to' },
  { sender: 'he', text: `hmm to matalb mere ko ese pahale lagta tha ki aap aap ese hamesa mere pr gussa karati hi rahti ho kabhi smajahti hi nahi ho baat ko pr i know aap sabse jyada mere ko samajhati ho esa mujhe lagta h whatever to fir dhire dhire mujhe lagne laga main hi ajib hu jo ki main hu i accept , to fir kuchh time pahale main ese hi soch raha tha ki aapko konsi chocolate du jo aapho achchha lagega cuz idk so maine GPT ki to bahut der tak meri aur uski baat hua then mujhe pata chala ladkiya ko hamesa gussa kro aata h and unke dimag achchanak se chance kyo ho jata hai , to fir usane mujhe bataya ki esa esa hota hai unhe es es problem ki vajah se dard hote h vo sab irritet hote h and pain bhi hota hai surten time duration pr to fir main socha "to eska solution bhi hoga pr esa nahi h" but kuchh chije relex kar deti h kuch time ke liye ese pain ko thoda kam kar skte hai so main khane pine ki itme khojane laga kyo ki kahane pine har chij ka best solution hai khate pite rahana chahiye esiliye  "esi liye maine aapse waha pr puchchha tha kuchh khane pine ko kahunga to chup chap muh band kar ke ha bol dena and kha lena" to fir mujhe suggestion aaya ki chocolate best h konsa ye nahi pata to usi liye to main aapko vo pura chocolate dediya jo bhi mere alternetive budget tha sab mila ke lekin mujhe ye samajh me nahi aa raha hai ki aap ye sb kaise leke jao gi waha tak load bade ga main socha main pahuchaduna pr aapne mana kr diya kyo ki aapko bhi ladkiyo vali problem ho syd to aapko bahut pain hota hoga to fir esase aapko bhi kuchh na kuchh dard kam hoga to usi liye aapko dediya aapka jab man kareg aaap kha lena pr jyada mat khana warna dat kharab ho jayenge` },
  { sender: 'she', text: '😑 sut up' },
  { sender: 'he', text: 'sorry' },
  { sender: 'she', text: 'ho gaya' },
  { sender: 'he', text: 'sorry....!' },
  { sender: 'she', text: 'okey ab jayiye' },
  { sender: 'he', text: 'okey sorry gussa mat kariye aap ...' },
  { sender: 'she', text: '....' },
  { sender: 'he', text: 'suniye' },
  { sender: 'she', text: '?' },
  { sender: 'he', text: 'aap na thoda tredition getup me raha karo bahut sunder lagogi' },
  { sender: 'she', text: 'sut up' },
  { sender: 'he', text: `sorry pr suniye dekho i know main aapko irriteting lagta hua thoda sa ajib lagata hu aur aap mere ko pasand bhi nahi ho mere ajib beheviour ki wajah se pr kya main bhi aapka dost ban skta hu i know me ladki nahi hua aur na hi aapke un ladke dosto jitana inteligent , smart , and good beheviour vala aur .........` },
  { sender: 'she', text: 'kya? kya hai ? kya bolte rahte ho dimag hai aapke paas?' },
  { sender: 'he', text: 'ok sorry' },
  { sender: 'she', text: 'ab jao' },
  { sender: 'he', text: 'suniye' },
  { sender: 'she', text: 'ab kya hai?' },
  { sender: 'he', text: 'main jab bhi aapko madam ji kahata hua to aapko achchha nahi lagta hai h na , kyo ki logicly to madam ji lo unhe kahate h jinhe ek dusare se problem nahi hoti h pr main to aapke liye problem hi hu' },
  { sender: 'she', text: 'correct' },
  { sender: 'he', text: 'to main aab se aapko kabhi bhi madam ji nahi bulaunga aur agar kabhi aapko bulana bi raha to fir main aapko sirf siya bula skta hu' },
  { sender: 'she', text: 'siya ? ye kya hai ?' },
  { sender: 'he', text: 'name hai eske bahut sare meaning hote hai positive me hi h sab jitane main dekha' },
  { sender: 'she', text: 'aur ye name ka idea kha se aaya ?' },
  { sender: 'he', text: 'ese hi ek din baith ke soch raha tha ki agara aapko ko thed {hinglish + bhojpuri} me pulaunga to priyanshiya ese bulayega to ye achchha nahi lag raha tha to maine priyan + shiya me se priyan remove kr diya and shiya ko modified kr ke siya bana diya ho gaya na ek number ka name and ye cool bhi lagata hai' },
  { sender: 'she', text: 'sut up 😡 na to ye naam achcha h na hi es name se bulane ki jarurat h infact bulana hi kyo h ...? bahut jyada ho raha h....' },
  { sender: 'he', text: 'okey okey sorry' },
  { sender: 'she', text: 'ab jao nahi to' },
  { sender: 'he', text: 'okey jaa raha hu pr ek kaam karogi aap' },
  { sender: 'she', text: 'ab kya h ?' },
  { sender: 'he', text: 'kuchh nahi pr kya ye sab es ladke ki madam ji ko bhi bata dogi aur ye bhi ab se nahi bole ga madam ji' },
  { sender: 'she', text: 'vo bhi dekh rahi h' },
  { sender: 'he', text: `okey, Pr ek last chij aap bahut sunder munder lagti ho bahut jyada cute si mere ko aapke accent , aapke baat karane  tarika and aap jab one side smile karti ho bahut mast lagte h aur ussase bhi jyada aap achchi lagti ho bas problem ye h ki aap gusse me aur achchi lagti ho to mere samajh me nahi aata h ki aapko manau ya fir man bhar jane tak dekhata jau dekhat jau i know aapki tarif karane wale bahut h pr aapka etajar karane vale ki snkhya kya h . Sorry , mere ko ab sayari aane lagi h samajh me and ek bahut mast sayari lagi jo ki aapke pr hi lagata hai bani h syd poet ne pahale se hi janta hoga ki aap kabhi na kabhi aaogi hi es jaha me es liye usane aapke liye sayd ye pahale se bana ke rakh diya tha poet ka name to nahi pata pr aapke liye ek dam perfect hai , kabhi ejajat dogi to sunauga aapko [i know mujhe permission nahi milega kabhi bhi]` },
  { sender: 'he', text: `
[DUWLSEOMBIFLSEBNOCLYSMTICILYSMBIDKWICEYT]
[YDKHPIIWYAKTYLCNLYB]
` },
  { sender: 'she', text: 'ye kya hai ab ?' },
  { sender: 'he', text: 'kuch nahi' },
  { sender: 'she', text: 'jao ab' },
  { sender: 'he', text: 'okey BYE BYE..................................' }
];

        

        let timeoutsS = [];
        let sendBtnS = null;
        let sendBtnContainer = null;
        let chatIndex = 0;

        function appendTypingS(side) {
          const t = document.createElement('div');
          t.className = 'typing show ' + (side === 'left' ? 'left' : 'right');
          t.innerHTML = '<span></span><span></span><span></span>';
          miniChat.appendChild(t);
          miniChat.scrollTop = miniChat.scrollHeight;
          return t;
        }

        function appendBubbleS(text, side) {
          const b = document.createElement('div');
          b.className = 'message ' + (side === 'left' ? 'left' : 'right');
          const span = document.createElement('span');
          span.textContent = text;
          b.appendChild(span);
          miniChat.appendChild(b);
          miniChat.scrollTop = miniChat.scrollHeight;
          return b;
        }

        function createSendButton() {
          if (!sendBtnContainer) {
            sendBtnContainer = document.createElement('div');
            sendBtnContainer.style.cssText = 'display:flex;justify-content:center;padding-top:12px;';
            modal.querySelector('.modal-body').appendChild(sendBtnContainer);
          }
          sendBtnS = document.createElement('button');
          sendBtnS.className = 'glow-send';
          sendBtnS.textContent = 'Send';
          sendBtnS.style.cssText = 'background:linear-gradient(90deg,#ff7ab6,#6fb3ff);border:none;color:#fff;padding:10px 18px;border-radius:20px;font-weight:700;box-shadow:0 6px 18px rgba(111,179,255,0.18),0 0 22px rgba(255,122,182,0.12);cursor:pointer;animation:glowPulse 1.6s ease-in-out infinite;';
          sendBtnContainer.appendChild(sendBtnS);
        }

        function proceedChat() {
          if (chatIndex >= specialChat.length) {
            // Chat complete - hide send button
            if (sendBtnS) sendBtnS.remove();
            return;
          }

          const current = specialChat[chatIndex];

          if (current.sender === 'he') {
            // He message: auto-send after typing indicator
            const typing = appendTypingS('left');
            const delayTime = 1400;
            timeoutsS.push(setTimeout(() => {
              typing.remove();
              appendBubbleS(current.text, 'left');
              chatIndex++;

              // After He message, check next message type
              if (chatIndex < specialChat.length && specialChat[chatIndex].sender === 'she') {
                // Next is She message: show Send button and wait
                const pauseBeforeSend = 800 + Math.min(1400, current.text.length * 12);
                timeoutsS.push(setTimeout(() => {
                  createSendButton();
                  sendBtnS.onclick = () => {
                    sendBtnS.remove();
                    proceedChat();
                  };
                }, pauseBeforeSend));
              } else if (chatIndex < specialChat.length) {
                // Next is He message: continue automatically
                const pauseBeforeNext = 800 + Math.min(1400, current.text.length * 12);
                timeoutsS.push(setTimeout(proceedChat, pauseBeforeNext));
              }
            }, delayTime));
          } else if (current.sender === 'she') {
            // She message: appears when called (from Send button click)
            const typing = appendTypingS('right');
            const delayTime = 1000;
            timeoutsS.push(setTimeout(() => {
              typing.remove();
              appendBubbleS(current.text, 'right');
              chatIndex++;

              // After She message, check next
              if (chatIndex < specialChat.length && specialChat[chatIndex].sender === 'he') {
                // Next is He message: continue automatically
                const pauseBeforeNext = 600 + Math.min(1200, current.text.length * 10);
                timeoutsS.push(setTimeout(proceedChat, pauseBeforeNext));
              } else if (chatIndex >= specialChat.length) {
                // Chat complete
                if (sendBtnS) sendBtnS.remove();
              }
            }, delayTime));
          }
        }

        // Start the chat
        proceedChat();

        // cleanup for special
        modal._cleanupSpecial = () => {
          timeoutsS.forEach(t => clearTimeout(t));
          timeoutsS = [];
          if (sendBtnS) sendBtnS.remove();
          if (sendBtnContainer) sendBtnContainer.remove();
        };
      }

      const backBtn = document.getElementById('modalBackBtn');
      backBtn.addEventListener('click', () => {
        // remove modal and style
        modal.remove();
        style.remove();

        // cleanup any running sequences
        if (modal._cleanupSeq) modal._cleanupSeq();
        if (modal._cleanupSpecial) modal._cleanupSpecial();

        // restore phone and boy positions
        if (phoneEl) {
          phoneEl.style.display = '';
          phoneEl.style.transform = '';
          phoneEl.style.opacity = '';
        }
        if (boyEl) {
          boyEl.style.transform = '';
          boyEl.style.transition = '';
          boyEl.style.willChange = '';
          boyEl.style.zIndex = '';
        }

        // restore characters
        if (charsEl && charsPrev) {
          charsEl.style.transform = charsPrev.transform;
          charsEl.style.transition = charsPrev.transition;
          charsEl.style.zIndex = charsPrev.zIndex;
        }

        magic.classList.remove('split');
        magic.classList.remove('active');
        magic.style.display = 'none';

        // restore options
        clearMessagesAndShowButtons();
      });

    }, 520);

  }, 420);
}
 });
