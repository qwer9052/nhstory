<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';

  let bambi = { name: '밤비', level: 1, exp: 30, mood: '😊', hunger: 70, love: 85 };
  let quokka = { name: '쿼카', level: 1, exp: 55, mood: '🥰', hunger: 50, love: 90 };
</script>

<PageHeader title="🦌🦫 밤비&쿼카 키우기" />

<div class="page">
  <p class="subtitle">우리 둘이서 함께 키우는 우리만의 캐릭터!</p>

  <div class="characters">

    <!-- 밤비 (사슴) -->
    <div class="char-card">
      <div class="char-name">밤비 🦌</div>
      <div class="char-svg">
        <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
          <!-- 뿔 -->
          <path d="M60 45 Q50 20 40 10 Q45 15 55 25 Q52 12 58 5" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M100 45 Q110 20 120 10 Q115 15 105 25 Q108 12 102 5" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round"/>
          <!-- 귀 -->
          <ellipse cx="52" cy="60" rx="14" ry="20" fill="#D4956A" transform="rotate(-15,52,60)"/>
          <ellipse cx="52" cy="60" rx="8" ry="13" fill="#F4B8A0" transform="rotate(-15,52,60)"/>
          <ellipse cx="108" cy="60" rx="14" ry="20" fill="#D4956A" transform="rotate(15,108,60)"/>
          <ellipse cx="108" cy="60" rx="8" ry="13" fill="#F4B8A0" transform="rotate(15,108,60)"/>
          <!-- 얼굴 -->
          <ellipse cx="80" cy="85" rx="38" ry="40" fill="#E8A87C"/>
          <!-- 이마 밝은 부분 -->
          <ellipse cx="80" cy="72" rx="20" ry="14" fill="#F0C090" opacity="0.6"/>
          <!-- 눈 -->
          <ellipse cx="66" cy="80" rx="8" ry="9" fill="white"/>
          <ellipse cx="94" cy="80" rx="8" ry="9" fill="white"/>
          <circle cx="68" cy="81" r="5" fill="#3D2010"/>
          <circle cx="96" cy="81" r="5" fill="#3D2010"/>
          <circle cx="70" cy="79" r="2" fill="white"/>
          <circle cx="98" cy="79" r="2" fill="white"/>
          <!-- 속눈썹 -->
          <path d="M59 73 Q61 70 63 73" stroke="#3D2010" stroke-width="1.5" fill="none"/>
          <path d="M87 73 Q89 70 91 73" stroke="#3D2010" stroke-width="1.5" fill="none"/>
          <!-- 코 -->
          <ellipse cx="80" cy="96" rx="10" ry="7" fill="#C97B5A"/>
          <ellipse cx="80" cy="95" rx="7" ry="5" fill="#E8967A"/>
          <ellipse cx="77" cy="94" rx="2.5" ry="2" fill="#A05535"/>
          <ellipse cx="83" cy="94" rx="2.5" ry="2" fill="#A05535"/>
          <!-- 입 -->
          <path d="M74 103 Q80 109 86 103" stroke="#A05535" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- 볼 홍조 -->
          <ellipse cx="56" cy="95" rx="10" ry="7" fill="#F4A0A0" opacity="0.5"/>
          <ellipse cx="104" cy="95" rx="10" ry="7" fill="#F4A0A0" opacity="0.5"/>
          <!-- 몸 -->
          <ellipse cx="80" cy="155" rx="35" ry="42" fill="#E8A87C"/>
          <!-- 배 -->
          <ellipse cx="80" cy="158" rx="22" ry="28" fill="#F0C090" opacity="0.7"/>
          <!-- 흰 반점 -->
          <circle cx="68" cy="148" r="5" fill="white" opacity="0.7"/>
          <circle cx="85" cy="140" r="4" fill="white" opacity="0.7"/>
          <circle cx="92" cy="155" r="3" fill="white" opacity="0.7"/>
          <!-- 앞발 -->
          <ellipse cx="52" cy="180" rx="12" ry="8" fill="#D4956A" transform="rotate(-20,52,180)"/>
          <ellipse cx="108" cy="180" rx="12" ry="8" fill="#D4956A" transform="rotate(20,108,180)"/>
          <!-- 발굽 -->
          <ellipse cx="48" cy="185" rx="8" ry="5" fill="#8B5E3C"/>
          <ellipse cx="112" cy="185" rx="8" ry="5" fill="#8B5E3C"/>
          <!-- 꼬리 -->
          <ellipse cx="115" cy="135" rx="8" ry="6" fill="white"/>
          <!-- 하트 -->
          <text x="72" y="170" font-size="14" fill="#FF8FA0">♥</text>
        </svg>
      </div>
      <div class="mood-badge">{bambi.mood} Lv.{bambi.level}</div>
      <div class="stats">
        <div class="stat-row">
          <span class="stat-label">🍎 배고픔</span>
          <div class="bar-bg"><div class="bar hunger" style="width:{bambi.hunger}%"></div></div>
        </div>
        <div class="stat-row">
          <span class="stat-label">💕 애정</span>
          <div class="bar-bg"><div class="bar love" style="width:{bambi.love}%"></div></div>
        </div>
        <div class="stat-row">
          <span class="stat-label">✨ 경험치</span>
          <div class="bar-bg"><div class="bar exp" style="width:{bambi.exp}%"></div></div>
        </div>
      </div>
      <div class="action-btns">
        <button class="act-btn">🍎 밥주기</button>
        <button class="act-btn">🤗 쓰다듬기</button>
      </div>
    </div>

    <!-- 쿼카 -->
    <div class="char-card">
      <div class="char-name">쿼카 🦫</div>
      <div class="char-svg">
        <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
          <!-- 귀 (둥근 귀) -->
          <ellipse cx="52" cy="58" rx="18" ry="20" fill="#B8845A"/>
          <ellipse cx="52" cy="58" rx="11" ry="13" fill="#D4A88A"/>
          <ellipse cx="108" cy="58" rx="18" ry="20" fill="#B8845A"/>
          <ellipse cx="108" cy="58" rx="11" ry="13" fill="#D4A88A"/>
          <!-- 얼굴 (더 둥글고 통통) -->
          <ellipse cx="80" cy="90" rx="42" ry="40" fill="#C8935A"/>
          <!-- 얼굴 밝은 부분 -->
          <ellipse cx="80" cy="100" rx="30" ry="25" fill="#DDB080" opacity="0.5"/>
          <!-- 눈 (쿼카 특유의 웃는 눈) -->
          <ellipse cx="65" cy="83" rx="9" ry="10" fill="white"/>
          <ellipse cx="95" cy="83" rx="9" ry="10" fill="white"/>
          <circle cx="67" cy="85" r="6" fill="#2A1505"/>
          <circle cx="97" cy="85" r="6" fill="#2A1505"/>
          <circle cx="69" cy="83" r="2.5" fill="white"/>
          <circle cx="99" cy="83" r="2.5" fill="white"/>
          <!-- 쿼카 웃는 눈매 -->
          <path d="M56 78 Q65 74 74 78" stroke="#2A1505" stroke-width="2" fill="none"/>
          <path d="M86 78 Q95 74 104 78" stroke="#2A1505" stroke-width="2" fill="none"/>
          <!-- 코 (작고 귀여운) -->
          <ellipse cx="80" cy="100" rx="8" ry="6" fill="#9B6040"/>
          <ellipse cx="80" cy="99" rx="5" ry="4" fill="#C07850"/>
          <!-- 쿼카 특유의 웃는 입 -->
          <path d="M68 108 Q80 118 92 108" stroke="#8B4520" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M70 108 Q80 114 90 108" fill="#D4845A" opacity="0.3"/>
          <!-- 볼살 (쿼카는 볼이 통통) -->
          <ellipse cx="50" cy="100" rx="14" ry="12" fill="#DDA070" opacity="0.6"/>
          <ellipse cx="110" cy="100" rx="14" ry="12" fill="#DDA070" opacity="0.6"/>
          <!-- 볼 홍조 -->
          <ellipse cx="52" cy="100" rx="10" ry="8" fill="#F4A0A0" opacity="0.45"/>
          <ellipse cx="108" cy="100" rx="10" ry="8" fill="#F4A0A0" opacity="0.45"/>
          <!-- 몸 (통통하고 짧은) -->
          <ellipse cx="80" cy="158" rx="38" ry="38" fill="#C8935A"/>
          <!-- 배 -->
          <ellipse cx="80" cy="162" rx="25" ry="26" fill="#DDB080" opacity="0.65"/>
          <!-- 앞발 (짧고 통통) -->
          <ellipse cx="48" cy="172" rx="15" ry="10" fill="#B8845A" transform="rotate(-10,48,172)"/>
          <ellipse cx="112" cy="172" rx="15" ry="10" fill="#B8845A" transform="rotate(10,112,172)"/>
          <!-- 발톱 -->
          <ellipse cx="42" cy="178" rx="9" ry="6" fill="#9B6A3A"/>
          <ellipse cx="118" cy="178" rx="9" ry="6" fill="#9B6A3A"/>
          <!-- 꼬리 (짧고 통통) -->
          <ellipse cx="116" cy="148" rx="10" ry="8" fill="#B8845A"/>
          <!-- 하트 -->
          <text x="72" y="170" font-size="14" fill="#FF8FA0">♥</text>
        </svg>
      </div>
      <div class="mood-badge">{quokka.mood} Lv.{quokka.level}</div>
      <div class="stats">
        <div class="stat-row">
          <span class="stat-label">🍎 배고픔</span>
          <div class="bar-bg"><div class="bar hunger" style="width:{quokka.hunger}%"></div></div>
        </div>
        <div class="stat-row">
          <span class="stat-label">💕 애정</span>
          <div class="bar-bg"><div class="bar love" style="width:{quokka.love}%"></div></div>
        </div>
        <div class="stat-row">
          <span class="stat-label">✨ 경험치</span>
          <div class="bar-bg"><div class="bar exp" style="width:{quokka.exp}%"></div></div>
        </div>
      </div>
      <div class="action-btns">
        <button class="act-btn">🍎 밥주기</button>
        <button class="act-btn">🤗 쓰다듬기</button>
      </div>
    </div>

  </div>

  <div class="together-msg">
    <p>💕 둘이서 함께 키워요!</p>
    <p class="coming">상세 게임 로직은 곧 업데이트 예정이에요 🌿</p>
  </div>
</div>

<style>
  .page { max-width: 480px; margin: 0 auto; padding: 0 16px 16px; background: #F0EAD6; min-height: 100vh; }
  .subtitle { text-align: center; font-size: 13px; color: #8B7355; margin-bottom: 20px; }

  .characters { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }

  .char-card { background: #FFFDF0; border-radius: 20px; padding: 14px 10px; text-align: center; box-shadow: 0 4px 14px rgba(139,101,34,.14); border: 2px solid #E8D9C0; }
  .char-name { font-size: 15px; font-weight: 800; color: #5D4E37; margin-bottom: 4px; }

  .char-svg { width: 100%; max-width: 130px; margin: 0 auto 8px; display: block; filter: drop-shadow(0 4px 8px rgba(0,0,0,.12)); }
  .char-svg svg { width: 100%; height: auto; }

  .mood-badge { display: inline-block; background: linear-gradient(135deg, #F5E6C8, #E8D5A3); border-radius: 20px; padding: 4px 12px; font-size: 13px; font-weight: 700; color: #5D4E37; margin-bottom: 10px; }

  .stats { text-align: left; margin-bottom: 10px; }
  .stat-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
  .stat-label { font-size: 10px; color: #8B7355; white-space: nowrap; width: 52px; flex-shrink: 0; }
  .bar-bg { flex: 1; height: 7px; background: #E8D9C0; border-radius: 10px; overflow: hidden; }
  .bar { height: 100%; border-radius: 10px; transition: width .5s ease; }
  .bar.hunger { background: linear-gradient(90deg, #FF9F6B, #FF6B35); }
  .bar.love { background: linear-gradient(90deg, #FF8FA0, #FF4D6D); }
  .bar.exp { background: linear-gradient(90deg, #A8E6CF, #3ECF8E); }

  .action-btns { display: flex; flex-direction: column; gap: 5px; }
  .act-btn { padding: 7px 6px; background: linear-gradient(135deg, #C4A574, #B8945A); color: white; border: none; border-radius: 10px; font-size: 11px; font-weight: 700; cursor: pointer; transition: transform .1s, opacity .2s; }
  .act-btn:hover { transform: scale(1.03); }
  .act-btn:active { transform: scale(0.97); opacity: .85; }

  .together-msg { text-align: center; background: linear-gradient(135deg, #F5E6C8, #EDD9A8); border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(196,165,116,.2); }
  .together-msg p { font-size: 15px; font-weight: 700; color: #5D4E37; margin-bottom: 4px; }
  .coming { font-size: 12px; color: #9A8060; font-weight: 400; }
</style>