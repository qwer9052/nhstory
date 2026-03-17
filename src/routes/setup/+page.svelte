<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  let startDate = '', loading = false, msg = '';
  async function go() {
    if(!startDate){msg='시작일을 선택해주세요';return;}
    loading=true;
    const r=await fetch('/api/couple',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({startDate})});
    const d=await r.json();
    if(d.ok){msg='✅ 완료!';setTimeout(()=>location.href='/',1000);}
    else msg=d.error||'오류 발생';
    loading=false;
  }
</script>

<PageHeader title="⚙️ 커플 설정" />
<div class="page">
  <div class="hero">
    <img src="/bamkabu.png" alt="밤카부"/>
    <h1>밤카부</h1>
    <p>우리만의 공간을 만들어요 🌿</p>
  </div>
  <div class="card">
    <h2>처음 만난 날이 언제예요?</h2>
    <input type="date" bind:value={startDate}/>
    {#if msg}<p class="msg">{msg}</p>{/if}
    <button on:click={go} disabled={loading}>{loading?'설정 중...':'시작하기 💕'}</button>
  </div>
</div>

<style>
  .page{max-width:480px;margin:0 auto;padding:32px 20px;}
  .hero{text-align:center;margin-bottom:32px;}
  .hero img{width:120px;}
  .hero h1{font-size:28px;font-weight:900;color:#C4A574;margin:8px 0 4px;}
  .hero p{color:#999;font-size:14px;}
  .card{background:white;border-radius:16px;padding:28px 24px;box-shadow:0 4px 16px rgba(0,0,0,.08);}
  .card h2{font-size:16px;font-weight:700;color:#3D3D3D;margin-bottom:16px;}
  input{width:100%;padding:12px;border:1.5px solid #E0E0E0;border-radius:8px;font-size:15px;margin-bottom:16px;box-sizing:border-box;}
  button{width:100%;padding:14px;background:#C4A574;color:white;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;}
  button:disabled{opacity:.6;}
  .msg{font-size:13px;color:#C4A574;margin-bottom:12px;}
</style>