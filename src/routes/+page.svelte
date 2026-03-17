<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let sideOpen = false;

  $: daysTogether = data.couple
    ? Math.floor((Date.now() - new Date(data.couple.startDate).getTime()) / 86400000) + 1 : 0;

  $: ddays = (data.anniversaries || []).map((a: any) => {
    const today = new Date(); today.setHours(0,0,0,0);
    return { ...a, diff: Math.ceil((getNext(a).getTime()-today.getTime())/86400000) };
  }).sort((a:any,b:any)=>a.diff-b.diff).slice(0,2);

  function getNext(a: any) {
    const today = new Date(); today.setHours(0,0,0,0);
    let d = new Date(a.startDate);
    if(a.repeatType==='yearly'){d.setFullYear(today.getFullYear());if(d<today)d.setFullYear(today.getFullYear()+1);}
    else if(a.repeatType==='monthly'){d.setFullYear(today.getFullYear());d.setMonth(today.getMonth());if(d<today)d.setMonth(d.getMonth()+1);}
    else if(a.repeatType==='hundred'){const s=new Date(a.startDate);let n=100;while(true){const nd=new Date(s.getTime()+(n-1)*86400000);if(nd>=today){d=nd;break;}n+=100;}}
    return d;
  }

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 ${'일월화수목금토'[today.getDay()]}요일`;

  const menus = [
    { href: '/anniversary', emoji: '💍', title: '기념일 몰아보기', desc: '우리의 특별한 날들' },
    { href: '/couple', emoji: '🦌', title: '밤비&쿼카 키우기', desc: '함께 성장하기' },
    { href: '/roulette', emoji: '🎡', title: '데이트 룰렛', desc: '오늘의 행복의 장소는?' },
    { href: '/reels', emoji: '🎬', title: '쿼카의 릴스보관함', desc: '우리만의 소중한 영상' },
    { href: '/budget', emoji: '📒', title: '밤비와 쿼카의 가계부', desc: '이번 달 가계부' },
    { href: '/qa', emoji: '📖', title: '커플문답', desc: '오늘의 질문은?' },
    { href: '/chat', emoji: '💬', title: '소근소근', desc: '우리만의 채팅' },
    { href: '/places', emoji: '🧺', title: '여기 어땠어?', desc: '우리만의 장소 리뷰' },
  ];

  const sideMenus = [
    { href: '/', icon: '🏠', label: '홈' },
    { href: '/anniversary', icon: '📅', label: '기념일' },
    { href: '/roulette', icon: '🎡', label: '룰렛' },
    { href: '/reels', icon: '🎬', label: '릴스' },
    { href: '/chat', icon: '💬', label: '소근소근' },
    { href: '/budget', icon: '📒', label: '가계부' },
    { href: '/qa', icon: '📖', label: '커플문답' },
    { href: '/places', icon: '🧺', label: '여기 어땠어?' },
    { href: '/setup', icon: '⚙️', label: '커플 설정' },
  ];
</script>

{#if sideOpen}
  <div class="side-bg" on:click={()=>sideOpen=false} role="button" tabindex="0" on:keydown={()=>{}}></div>
{/if}
<div class="sidebar" class:open={sideOpen}>
  <div class="side-top">
    <img src="/bamkabu.png" alt="밤카부" class="side-logo"/>
    <p class="side-name">밤카부</p>
    {#if data.couple}
      <p class="side-days">함께한 지 {daysTogether}일째 💕</p>
    {/if}
  </div>
  <nav class="side-nav">
    {#each sideMenus as m}
      <a href={m.href} class="side-item" on:click={()=>sideOpen=false}>
        <span>{m.icon}</span><span>{m.label}</span>
      </a>
    {/each}
  </nav>
</div>

<div class="page">
  <div class="header">
    <div class="header-left">
      <p class="date">{dateStr}</p>
      <p class="together">밤비와 쿼카가 함께한지 <strong>{daysTogether}일째</strong></p>
      {#each ddays as d}
        <p class="dday">{d.title}가 <strong>{d.diff === 0 ? '오늘!' : d.diff+'일'}</strong> 남았어요!</p>
      {/each}
      {#if !data.couple}
        <a href="/setup" class="setup-btn">💕 커플 설정하기</a>
      {/if}
    </div>
    <div class="header-right">
      <img src="/bamkabu.png" alt="밤카부" class="header-img"/>
<!--      <p class="brand">밤카부</p>-->
    </div>
    <button class="ham" on:click={()=>sideOpen=true}>☰</button>
  </div>

  <div class="grid">
    {#each menus as m}
      <a href={m.href} class="card">
        <div class="card-emoji">{m.emoji}</div>
        <p class="card-title">{m.title}</p>
        <p class="card-desc">{m.desc}</p>
      </a>
    {/each}
  </div>

  <p class="footer">Made by 밤비&쿼카 🦌🦫</p>
</div>

<style>
  :global(*,*::before,*::after){box-sizing:border-box;margin:0;padding:0;}
  :global(body){background:#F0EAD6;font-family:'Noto Sans KR',sans-serif;}

  .side-bg{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;}
  .sidebar{position:fixed;top:0;right:-280px;width:260px;height:100vh;background:#FFFDF5;z-index:300;transition:right .3s ease;box-shadow:-4px 0 20px rgba(0,0,0,.15);display:flex;flex-direction:column;}
  .sidebar.open{right:0;}
  .side-top{background:linear-gradient(135deg,#C4A574,#E8D5A3);padding:32px 20px 20px;text-align:center;}
  .side-logo{width:70px;height:auto;}
  .side-name{font-size:20px;font-weight:900;color:white;margin:6px 0 2px;}
  .side-days{font-size:12px;color:rgba(255,255,255,.85);}
  .side-nav{padding:12px 0;flex:1;overflow-y:auto;}
  .side-item{display:flex;align-items:center;gap:14px;padding:14px 24px;text-decoration:none;color:#5D4E37;font-size:15px;font-weight:600;transition:background .2s;}
  .side-item:hover{background:#F5E6C8;}

  .page{max-width:480px;margin:0 auto;}
  .header{background:linear-gradient(135deg,#E8D5A3 0%,#C8B78A 100%);padding:16px 16px 20px;position:relative;border-radius:0 0 24px 24px;min-height:100px;}
  .header-left{padding-right:90px;}
  .header-right{position:absolute;top:10px;right:50px;text-align:center;}
  .header-img{width:65px;height:auto;}
  .brand{font-size:13px;font-weight:900;color:#5D4E37;margin:0;}
  .ham{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.6);border:none;border-radius:8px;width:34px;height:34px;font-size:17px;cursor:pointer;}
  .date{font-size:11px;color:#7A6545;margin-bottom:4px;}
  .together{font-size:13px;color:#5D4E37;font-weight:600;margin-bottom:3px;}
  .together strong{color:#8B4513;}
  .dday{font-size:12px;color:#5D4E37;margin-bottom:2px;}
  .dday strong{color:#C4A574;font-weight:700;}
  .setup-btn{display:inline-block;margin-top:8px;padding:6px 16px;background:#C4A574;color:white;border-radius:16px;text-decoration:none;font-size:12px;font-weight:700;}

  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 10px;}
  .card{background:#FFFDF0;border-radius:16px;padding:16px 10px 14px;text-decoration:none;display:flex;flex-direction:column;align-items:center;text-align:center;box-shadow:0 3px 10px rgba(139,101,34,.12);border:1.5px solid #E8D9C0;transition:transform .15s,box-shadow .15s;}
  .card:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(139,101,34,.2);}
  .card-emoji{font-size:38px;margin-bottom:8px;}
  .card-title{font-size:12px;font-weight:800;color:#5D4E37;margin-bottom:4px;line-height:1.3;}
  .card-desc{font-size:10px;color:#9A8060;line-height:1.4;}

  .footer{text-align:center;font-size:12px;color:#B09070;padding:8px 0 16px;}
</style>