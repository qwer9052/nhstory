<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;

  $: placeList = (data.places || []) as any[];
  let showAdd = false;
  let form = { name: '', review: '', rating: 5, visited_at: new Date().toISOString().slice(0,10) };

  async function submit(){
    if(!form.name.trim())return;
    await fetch('/api/places',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    showAdd=false; form={name:'',review:'',rating:5,visited_at:new Date().toISOString().slice(0,10)};
    location.reload();
  }
  async function del(id:number){if(!confirm('삭제?'))return;await fetch('/api/places/'+id,{method:'DELETE'});location.reload();}
  function stars(n:number){return '⭐'.repeat(n)+'☆'.repeat(5-n);}
</script>

<PageHeader title="🧺 여기 어땠어?" />
<div class="page">
  <div class="top-hd">
    <p class="sub">다음에 가고 싶은 곳 & 우리가 간 곳 리뷰</p>
    <button class="add-btn" on:click={()=>showAdd=true}>+ 추가</button>
  </div>

  <div class="list">
    {#each placeList as p}
      <div class="card">
        <div class="card-top">
          <div>
            <p class="place-name">{p.name}</p>
            <p class="place-stars">{stars(p.rating||5)}</p>
          </div>
          <div class="card-right">
            <p class="place-date">{p.visited_at||''}</p>
            <button class="del" on:click={()=>del(p.id)}>🗑</button>
          </div>
        </div>
        {#if p.review}<p class="place-review">{p.review}</p>{/if}
      </div>
    {/each}
    {#if !(data.places||[]).length}
      <div class="empty"><p>🗺️</p><p>아직 기록된 장소가 없어요</p><p>우리가 간 곳을 기록해봐요!</p></div>
    {/if}
  </div>
</div>

{#if showAdd}
<div class="ov" on:click={()=>showAdd=false} role="button" tabindex="0" on:keydown={()=>{}}>
  <div class="modal" on:click|stopPropagation role="dialog">
    <h3>장소 기록</h3>
    <label>장소 이름<input bind:value={form.name} placeholder="예: 홍대 카페, 한강 공원"/></label>
    <label>방문일<input type="date" bind:value={form.visited_at}/></label>
    <label>별점
      <div class="star-row">
        {#each [1,2,3,4,5] as s}
          <button class="star-btn" on:click|preventDefault={()=>form.rating=s}>{s<=form.rating?'⭐':'☆'}</button>
        {/each}
      </div>
    </label>
    <label>리뷰<textarea bind:value={form.review} rows="3" placeholder="어땠나요?"></textarea></label>
    <div class="btns"><button class="c" on:click={()=>showAdd=false}>취소</button><button class="s" on:click={submit}>저장</button></div>
  </div>
</div>
{/if}

<style>
  .page{max-width:480px;margin:0 auto;padding:0 16px 16px;}
  .top-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
  .sub{font-size:12px;color:#999;}
  .add-btn{padding:7px 14px;background:#C4A574;color:white;border:none;border-radius:16px;font-size:12px;font-weight:700;cursor:pointer;}
  .card{background:white;border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 2px 8px rgba(0,0,0,.06);}
  .card-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;}
  .card-right{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:4px;}
  .place-name{font-size:15px;font-weight:700;color:#3D3D3D;}
  .place-stars{font-size:14px;margin-top:2px;}
  .place-date{font-size:11px;color:#bbb;}
  .del{background:none;border:none;font-size:16px;cursor:pointer;}
  .place-review{font-size:13px;color:#666;line-height:1.5;padding:8px 0 0;border-top:1px solid #f0f0f0;}
  .empty{text-align:center;padding:50px 0;color:#ccc;}
  .empty p:first-child{font-size:40px;margin-bottom:8px;}
  .empty p{font-size:14px;margin-bottom:4px;}
  .ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;justify-content:center;z-index:200;}
  .modal{background:white;border-radius:16px 16px 0 0;padding:24px 20px;width:100%;max-width:480px;}
  .modal h3{font-size:18px;font-weight:700;margin-bottom:16px;color:#3D3D3D;}
  label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:#555;margin-bottom:12px;}
  input,textarea{padding:10px 12px;border:1.5px solid #E0E0E0;border-radius:8px;font-size:14px;}
  textarea{resize:none;}
  .star-row{display:flex;gap:6px;padding:4px 0;}
  .star-btn{background:none;border:none;font-size:24px;cursor:pointer;padding:0;}
  .btns{display:flex;gap:10px;margin-top:8px;}
  .c{flex:1;padding:12px;background:#f5f5f5;border:none;border-radius:8px;font-size:15px;cursor:pointer;}
  .s{flex:1;padding:12px;background:#C4A574;color:white;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;}
</style>