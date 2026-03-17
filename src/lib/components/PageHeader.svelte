<script lang="ts">
  export let title: string;
  let sideOpen = false;
  const sideMenus = [
    { href: '/', icon: '🏠', label: '홈' },
    { href: '/anniversary', icon: '📅', label: '기념일' },
    { href: '/roulette', icon: '🎡', label: '룰렛' },
    { href: '/reels', icon: '🎬', label: '릴스' },
    { href: '/chat', icon: '💬', label: '소근소근' },
    { href: '/budget', icon: '📒', label: '가계부' },
    { href: '/qa', icon: '📖', label: '커플문답' },
    { href: '/places', icon: '🧺', label: '여기 어땠어?' },
    { href: '/couple', icon: '🦌', label: '밤비&쿼카 키우기' },
    { href: '/setup', icon: '⚙️', label: '커플 설정' },
  ];
</script>

{#if sideOpen}
  <div class="bg" on:click={()=>sideOpen=false} role="button" tabindex="0" on:keydown={()=>{}}></div>
{/if}

<div class="sidebar" class:open={sideOpen}>
  <div class="side-top">
    <img src="/bamkabu.png" alt="밤카부" class="side-logo"/>
    <p class="side-name">밤카부</p>
  </div>
  <nav class="side-nav">
    {#each sideMenus as m}
      <a href={m.href} class="side-item" on:click={()=>sideOpen=false}>
        <span class="side-icon">{m.icon}</span>
        <span>{m.label}</span>
      </a>
    {/each}
  </nav>
</div>

<header class="hd">
  <a href="/" class="back" aria-label="뒤로">‹</a>
  <h1 class="title">{title}</h1>
  <button class="ham" on:click={()=>sideOpen=true} aria-label="메뉴">☰</button>
</header>

<style>
  /* 오버레이 */
  .bg { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 200; }

  /* 사이드바 */
  .sidebar { position: fixed; top: 0; right: -280px; width: 265px; height: 100vh; background: #FFFDF5; z-index: 300; transition: right .28s cubic-bezier(.4,0,.2,1); box-shadow: -4px 0 24px rgba(0,0,0,.14); display: flex; flex-direction: column; }
  .sidebar.open { right: 0; }
  .side-top { background: linear-gradient(135deg, #C4A574, #E8D5A3); padding: 36px 20px 20px; text-align: center; }
  .side-logo { width: 64px; height: auto; }
  .side-name { font-size: 20px; font-weight: 900; color: white; margin: 8px 0 0; }
  .side-nav { padding: 8px 0; flex: 1; overflow-y: auto; }
  .side-item { display: flex; align-items: center; gap: 14px; padding: 13px 22px; text-decoration: none; color: #5D4E37; font-size: 14px; font-weight: 600; transition: background .15s; }
  .side-item:hover { background: #F5E6C8; }
  .side-icon { font-size: 18px; width: 24px; text-align: center; }

  /* 헤더 — 모든 페이지 동일 */
  .hd { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; height: 56px; padding: 0 14px; background: #FFFDF0; border-bottom: 1.5px solid #E8D9C0; box-shadow: 0 1px 6px rgba(139,101,34,.08); max-width: 480px; margin: 0 auto; width: 100%; box-sizing: border-box; }
  .back { font-size: 24px; color: #C4A574; text-decoration: none; font-weight: 700; line-height: 1; padding: 4px 10px 4px 0; }
  .title { flex: 1; font-size: 16px; font-weight: 800; color: #5D4E37; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ham { background: none; border: none; font-size: 20px; cursor: pointer; color: #5D4E37; padding: 4px 0 4px 10px; line-height: 1; }
</style>