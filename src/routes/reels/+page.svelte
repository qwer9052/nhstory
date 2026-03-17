<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;
  let showAdd=false, form={url:'',title:'',memo:''};
  async function submit(){
    await fetch('/api/reels',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    showAdd=false;form={url:'',title:'',memo:''};location.reload();
  }
  async function del(id:number){if(!confirm('삭제?'))return;await fetch(`/api/reels/${id}`,{method:'DELETE'});location.reload();}
</script>
<PageHeader title="🎬 릴스 보관함" />
<div class="page">
  <div class="page-hd">
    <button class="add" on:click={()=>showAdd=true}>+ 추가</button>
  </div>
  <div class="grid">
    {#each (data.reels||[]) as r}
      <div class="card">
        <a href={r.url} target="_blank" rel="noreferrer">
          <div class="thumb"><div class="ico">🎬</div></div>
          <div class="info"><p class="t">{r.title||'제목 없음'}</p>{#if r.memo}<p class="m">{r.memo}</p>{/if}</div>
        </a>
        <button class="del" on:click={()=>del(r.id)}>🗑</button>
      </div>
    {/each}
  </div>
  {#if !(data.reels||[]).length}<div class="empty">릴스를 추가해보세요 🎬</div>{/if}
</div>
{#if showAdd}
<div class="ov" on:click={()=>showAdd=false}>
  <div class="modal" on:click|stopPropagation>
    <h3>릴스 추가</h3>
    <label>URL<input bind:value={form.url} placeholder="https://www.instagram.com/reel/..."/></label>
    <label>제목<input bind:value={form.title} placeholder="제목 (선택)"/></label>
    <label>메모<textarea bind:value={form.memo} rows="2" placeholder="메모 (선택)"></textarea></label>
    <div class="btns"><button class="c" on:click={()=>showAdd=false}>취소</button><button class="s" on:click={submit}>저장</button></div>
  </div>
</div>
{/if}
<style>
  .page{max-width:480px;margin:0 auto;padding:0 0 16px;}
  .page-hd{display:flex;justify-content:flex-end;padding:10px 12px 0;}
  .add{padding:8px 16px;background:#C4A574;color:white;border:none;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .card{background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);position:relative;}
  .card a{text-decoration:none;color:inherit;display:block;}
  .thumb{aspect-ratio:9/16;background:#f5f5f5;display:flex;align-items:center;justify-content:center;}
  .ico{font-size:32px;}
  .info{padding:8px 10px;}
  .t{font-size:12px;font-weight:600;color:#3D3D3D;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .m{font-size:11px;color:#999;margin-top:2px;}
  .del{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.4);border:none;border-radius:50%;width:26px;height:26px;font-size:13px;cursor:pointer;color:white;}
  .empty{text-align:center;color:#999;margin-top:60px;font-size:15px;}
  .ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;justify-content:center;z-index:200;}
  .modal{background:white;border-radius:16px 16px 0 0;padding:24px 20px;width:100%;max-width:480px;}
  .modal h3{font-size:18px;font-weight:700;margin-bottom:16px;}
  label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:#555;margin-bottom:12px;}
  input,textarea{padding:10px 12px;border:1.5px solid #E0E0E0;border-radius:8px;font-size:14px;}
  .btns{display:flex;gap:10px;margin-top:8px;}
  .c{flex:1;padding:12px;background:#f5f5f5;border:none;border-radius:8px;font-size:15px;cursor:pointer;}
  .s{flex:1;padding:12px;background:#C4A574;color:white;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;}
</style>