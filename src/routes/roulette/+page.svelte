<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;
  const items=['영화 보기 🎬','카페 ☕','드라이브 🚗','산책 🌿','맛집 탐방 🍜','집콕 🏠','노래방 🎤','보드게임 🎲','전시회 🎨','쇼핑 🛍'];
  const colors=['#F5E6C8','#E8D9C0','#FAF0E0','#F0E4C8','#EDD9A3','#F5EBCD','#EDE0C4','#F7EDD5','#F0E6D0','#E8D8B8'];
  let spinning=false, result='', rotation=0, canvas:HTMLCanvasElement;
  function draw(hl=-1){
    if(!canvas)return;
    const ctx=canvas.getContext('2d')!,R=canvas.width/2,arc=(2*Math.PI)/items.length;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();ctx.translate(R,R);ctx.rotate(rotation*Math.PI/180);
    items.forEach((item,i)=>{
      ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R-4,arc*i-Math.PI/2,arc*(i+1)-Math.PI/2);ctx.closePath();
      ctx.fillStyle=hl===i?'#C4A574':colors[i%colors.length];ctx.fill();
      ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();
      ctx.save();ctx.rotate(arc*i+arc/2-Math.PI/2);ctx.textAlign='right';
      ctx.fillStyle=hl===i?'white':'#5D4E37';ctx.font='bold 11px sans-serif';
      ctx.fillText(item,R-12,4);ctx.restore();
    });
    ctx.restore();
    ctx.beginPath();ctx.moveTo(R-12,R-18);ctx.lineTo(R+12,R-18);ctx.lineTo(R,R+4);ctx.closePath();
    ctx.fillStyle='#C4A574';ctx.fill();
  }
  onMount(()=>draw());
  async function spin(){
    if(spinning)return;spinning=true;result='';
    const extra=1440+Math.floor(Math.random()*360),from=rotation,dur=3000,start=performance.now();
    function animate(now:number){
      const t=Math.min((now-start)/dur,1),ease=1-Math.pow(1-t,4);
      rotation=from+extra*ease;draw();
      if(t<1)requestAnimationFrame(animate);
      else{rotation=(from+extra)%360;const idx=Math.floor(((360-rotation)/360)*items.length)%items.length;result=items[idx];draw(idx);spinning=false;save(result);}
    }
    requestAnimationFrame(animate);
  }
  async function save(r:string){await fetch('/api/roulette',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({result:r,date:new Date().toISOString().slice(0,10)})});}
</script>
<PageHeader title="🎡 데이트 룰렛" />
<div class="page">
  <h2>🎡 데이트 룰렛</h2><p class="sub">오늘 뭐하지?</p>
  <div class="wrap"><canvas bind:this={canvas} width={280} height={280}></canvas></div>
  <button class="spin" on:click={spin} disabled={spinning}>{spinning?'돌아가는 중...':'돌려라 돌려!'}</button>
  {#if result}<div class="result">🎉 {result}</div>{/if}
  {#if (data.history||[]).length>0}
    <div class="history">
      <h3>히스토리</h3>
      {#each data.history as h}
        <div class="row"><span class="dt">{h.date}</span><span class="rs">{h.result}</span></div>
      {/each}
    </div>
  {/if}
</div>
<style>
  .page{max-width:480px;margin:0 auto;padding:0 16px 16px;text-align:center;}
  h2{font-size:22px;font-weight:800;color:#5D4E37;margin-bottom:4px;}
  .sub{color:#999;font-size:14px;margin-bottom:20px;}
  .wrap{display:flex;justify-content:center;margin-bottom:20px;}
  canvas{border-radius:50%;box-shadow:0 4px 20px rgba(196,165,116,.3);}
  .spin{padding:14px 40px;background:#C4A574;color:white;border:none;border-radius:24px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:16px;}
  .spin:disabled{opacity:.6;}
  .result{font-size:20px;font-weight:800;color:#C4A574;padding:16px;background:#FFF8EE;border-radius:12px;margin-bottom:20px;}
  .history{text-align:left;}
  .history h3{font-size:14px;font-weight:700;color:#5D4E37;margin-bottom:8px;}
  .row{display:flex;justify-content:space-between;padding:8px 12px;background:white;border-radius:8px;margin-bottom:6px;font-size:13px;}
  .dt{color:#999;}
  .rs{color:#3D3D3D;font-weight:600;}
</style>