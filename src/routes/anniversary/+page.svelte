<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;
  let showModal=false, form={title:'',startDate:'',endDate:'',repeatType:'',memo:''};
  let cy=new Date().getFullYear(), cm=new Date().getMonth();
  $: calDays=buildCal(cy,cm);
  $: label=`${cy}년 ${cm+1}월`;
  function buildCal(y:number,m:number){const f=new Date(y,m,1).getDay(),l=new Date(y,m+1,0).getDate(),d:any[]=Array(f).fill(null);for(let i=1;i<=l;i++)d.push(i);return d;}
  function prev(){if(cm===0){cm=11;cy--;}else cm--;}
  function next(){if(cm===11){cm=0;cy++;}else cm++;}
  function hasAnn(day:any){if(!day)return false;const s=`${cy}-${String(cm+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;return(data.anniversaries||[]).some((a:any)=>a.startDate===s);}
  function openModal(d:string){form={title:'',startDate:d,endDate:'',repeatType:'',memo:''};showModal=true;}
  async function submit(){await fetch('/api/anniversaries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});showModal=false;location.reload();}
  async function del(id:number){if(!confirm('삭제?'))return;await fetch(`/api/anniversaries/${id}`,{method:'DELETE'});location.reload();}
</script>
<PageHeader title="📅 기념일 관리" />
<div class="page">
  <div class="cal-hd"><button on:click={prev}>‹</button><h2>{label}</h2><button on:click={next}>›</button></div>
  <div class="cal">
    {#each ['일','월','화','수','목','금','토'] as d}<div class="dow">{d}</div>{/each}
    {#each calDays as day}
      <div class="day" class:ann={hasAnn(day)} class:empty={!day}
        on:click={()=>day&&openModal(`${cy}-${String(cm+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`)}>
        {day||''}{#if hasAnn(day)}<span class="dot">●</span>{/if}
      </div>
    {/each}
  </div>
  <div class="list">
    <h3>📅 기념일 목록</h3>
    {#each (data.anniversaries||[]) as a}
      <div class="card">
        <div><p class="t">{a.title}</p><p class="d">{a.startDate}{a.repeatType?` (${a.repeatType})`:''}</p>{#if a.memo}<p class="m">{a.memo}</p>{/if}</div>
        <button on:click={()=>del(a.id)}>🗑</button>
      </div>
    {/each}
  </div>
</div>
{#if showModal}
<div class="ov" on:click={()=>showModal=false}>
  <div class="modal" on:click|stopPropagation>
    <h3>기념일 추가</h3>
    <label>제목<input bind:value={form.title} placeholder="예: 처음 만난 날"/></label>
    <label>시작일<input type="date" bind:value={form.startDate}/></label>
    <label>종료일<input type="date" bind:value={form.endDate}/></label>
    <label>반복<select bind:value={form.repeatType}><option value="">없음</option><option value="monthly">매월</option><option value="yearly">매년</option><option value="hundred">100일</option></select></label>
    <label>메모<textarea bind:value={form.memo} rows="2"></textarea></label>
    <div class="btns"><button class="c" on:click={()=>showModal=false}>취소</button><button class="s" on:click={submit}>저장</button></div>
  </div>
</div>
{/if}
<style>
  .page{max-width:480px;margin:0 auto;padding:0 16px 16px;}
  .cal-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
  .cal-hd h2{font-size:18px;color:#5D4E37;font-weight:700;}
  .cal-hd button{background:none;border:none;font-size:24px;color:#C4A574;cursor:pointer;padding:0 12px;}
  .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:20px;}
  .dow{text-align:center;font-size:12px;color:#999;padding:4px 0;}
  .day{text-align:center;padding:8px 4px;font-size:13px;cursor:pointer;border-radius:8px;min-height:36px;display:flex;flex-direction:column;align-items:center;}
  .day:hover:not(.empty){background:#F5E6C8;}
  .ann{font-weight:700;color:#C4A574;}
  .dot{font-size:6px;color:#C4A574;}
  .empty{cursor:default;}
  .list h3{font-size:15px;color:#5D4E37;font-weight:700;margin-bottom:10px;}
  .card{background:white;border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;box-shadow:0 2px 6px rgba(0,0,0,.06);}
  .t{font-size:14px;font-weight:700;color:#3D3D3D;}
  .d{font-size:12px;color:#999;}
  .m{font-size:12px;color:#777;}
  .card button{background:none;border:none;font-size:18px;cursor:pointer;}
  .ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;justify-content:center;z-index:200;}
  .modal{background:white;border-radius:16px 16px 0 0;padding:24px 20px;width:100%;max-width:480px;}
  .modal h3{font-size:18px;font-weight:700;margin-bottom:16px;}
  label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:#555;margin-bottom:12px;}
  input,select,textarea{padding:10px 12px;border:1.5px solid #E0E0E0;border-radius:8px;font-size:14px;}
  .btns{display:flex;gap:10px;margin-top:8px;}
  .c{flex:1;padding:12px;background:#f5f5f5;border:none;border-radius:8px;font-size:15px;cursor:pointer;}
  .s{flex:1;padding:12px;background:#C4A574;color:white;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;}
</style>