
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
        const tier1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        tier1.setAttribute('x', '30');
        tier1.setAttribute('y', '150');
        tier1.setAttribute('width', '140');
        tier1.setAttribute('height', '80');
        tier1.setAttribute('fill', '#8B4513');
        tier1.setAttribute('rx', '5');
        tier1.classList.add('cake-tier-1');
        cakeSvg.appendChild(tier1);

        const tier2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        tier2.setAttribute('x', '50');
        tier2.setAttribute('y', '80');
        tier2.setAttribute('width', '100');
        tier2.setAttribute('height', '70');
        tier2.setAttribute('fill', '#A0522D');
        tier2.setAttribute('rx', '5');
        tier2.classList.add('cake-tier-2');
        cakeSvg.appendChild(tier2);

        // Text on cake
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '100');
        text.setAttribute('y', '190');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '16');
        text.setAttribute('fill', '#FFD700');
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

            // Show "Happy Birthday PRINCESS"
            setTimeout(() => {
              const msg = document.createElement('div');
              msg.style.cssText = 'text-align:center;font-size:24px;font-weight:bold;color:#ff69b4;margin-top:20px;animation:bounce 0.6s;';
              msg.textContent = '🎉 Happy Birthday PRINCESS 🎉';
              miniChat.appendChild(msg);

              // Auto return after 3 seconds
              setTimeout(() => {
                modal.remove();
                style.remove();
                magic.classList.remove('split');
                magic.classList.remove('active');
                magic.style.display = 'none';
                clearMessagesAndShowButtons();
              }, 3000);
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
              width:10px;
              height:10px;
              background:${['#FF69B4', '#FFD700', '#87CEEB', '#98FB98'][Math.floor(Math.random()*4)]};
              left:${Math.random()*window.innerWidth}px;
              top:100px;
              border-radius:50%;
              pointer-events:none;
              animation:fall ${2+Math.random()*2}s linear forwards;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 5000);
          }
        }
      }

      // ===== MESSAGE BUTTON HANDLER =====
      if (label.includes('Message')) {
        const miniChat = modal.querySelector('.mini-chat');
        
        // Create button container
        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display:flex;flex-direction:column;gap:12px;padding:20px;';
        
        const steps = [
          '📍 One by one',
          '📋 Step by step',
          '🚀 Jana buttune me'
        ];
        
        steps.forEach((step, idx) => {
          const btn = document.createElement('button');
          btn.textContent = step;
          btn.style.cssText = `
            padding:12px 20px;
            background:linear-gradient(90deg,#ff7ab6,#6fb3ff);
            color:#fff;
            border:none;
            border-radius:20px;
            font-weight:700;
            cursor:pointer;
            animation:glowPulse 1.6s ease-in-out infinite;
            transition:transform 0.2s;
          `;
          btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
          btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
          btn.addEventListener('click', () => {
            alert(`You selected: ${step}`);
          });
          btnContainer.appendChild(btn);
        });
        
        miniChat.appendChild(btnContainer);
      }

      // ===== GIFT BUTTON HANDLER =====
      if (label.includes('Gift')) {
        const miniChat = modal.querySelector('.mini-chat');
        const giftMsg = document.createElement('div');
        giftMsg.style.cssText = 'text-align:center;font-size:18px;padding:20px;color:#666;';
        giftMsg.textContent = '####';
        miniChat.appendChild(giftMsg);
        // User will add content here via: miniChat.innerHTML or miniChat.textContent = "your message"
      }

      // ===== ABOUT MADAM JI BUTTON HANDLER =====
      if (label.includes('About Madam Ji')) {
        const miniChat = modal.querySelector('.mini-chat');
        miniChat.innerHTML = '';
        
        // Create two option buttons
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display:flex;flex-direction:column;gap:16px;padding:20px;';
        optionsContainer.id = 'madam-options';
        
        // Option A: Good Thing
        const goodBtn = document.createElement('button');
        goodBtn.textContent = '[A] GOOD THING';
        goodBtn.style.cssText = `
          padding:16px 20px;
          background:linear-gradient(90deg,#00ff88,#00ccff);
          color:#000;
          border:2px solid #00ff88;
          border-radius:8px;
          font-family:'Courier New',monospace;
          font-weight:700;
          font-size:14px;
          cursor:pointer;
          letter-spacing:2px;
          transition:all 0.3s;
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
          padding:16px 20px;
          background:linear-gradient(90deg,#ff0055,#ff6600);
          color:#fff;
          border:2px solid #ff0055;
          border-radius:8px;
          font-family:'Courier New',monospace;
          font-weight:700;
          font-size:14px;
          cursor:pointer;
          letter-spacing:2px;
          transition:all 0.3s;
          position:relative;
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
          const blackScreen = document.createElement('div');
          blackScreen.style.cssText = 'background:#000;color:#00ff88;padding:30px;text-align:center;border-radius:10px;font-family:"Courier New",monospace;font-weight:bold;white-space:pre-wrap;word-wrap:break-word;min-height:200px;display:flex;align-items:center;justify-content:center;';
          blackScreen.textContent = `-- -.-- / -- .- -.. .- -- / .--- .. / .-- .... --- / -.-. .- -. / -. . ...- . .-. / -... . / -- .. -. . / .... .- ...- . / ..- -. / -.-. --- ..- -. - - .- -... .-.. . / --.- ..- .- .-.. .. - .. . ...`;
          miniChat.appendChild(blackScreen);

          // Back button in cyber style
          const backBtn = document.createElement('button');
          backBtn.textContent = '[ BACK ]';
          backBtn.style.cssText = `
            margin-top:20px;
            padding:12px 24px;
            background:#000;
            color:#00ff88;
            border:2px solid #00ff88;
            border-radius:5px;
            font-family:'Courier New',monospace;
            font-weight:bold;
            cursor:pointer;
            letter-spacing:1px;
            transition:all 0.3s;
          `;
          backBtn.addEventListener('mouseenter', () => {
            backBtn.style.boxShadow = '0 0 15px #00ff88';
          });
          backBtn.addEventListener('mouseleave', () => {
            backBtn.style.boxShadow = 'none';
          });
          backBtn.addEventListener('click', () => {
            miniChat.innerHTML = '';
            optionsContainer.innerHTML = '';
            miniChat.appendChild(optionsContainer);
          });
          miniChat.appendChild(backBtn);
        }
      }

      // ===== END BUTTON HANDLER =====
      if (label.includes('End')) {
        const miniChat = modal.querySelector('.mini-chat');
        miniChat.innerHTML = '';
        
        const screen = document.createElement('div');
        screen.style.cssText = 'background:#000;color:#fff;padding:30px;text-align:center;min-height:300px;display:flex;align-items:center;justify-content:center;border-radius:10px;';
        
        const textMsg = document.createElement('div');
        textMsg.style.cssText = 'font-size:24px;font-weight:bold;opacity:0;animation:typeWriter 2s forwards;';
        
        const text = '####';
        let idx = 0;
        const typeInterval = setInterval(() => {
          if (idx <= text.length) {
            textMsg.textContent = text.substring(0, idx);
            idx++;
          } else {
            clearInterval(typeInterval);
          }
        }, 100);
        
        screen.appendChild(textMsg);
        miniChat.appendChild(screen);
      }
