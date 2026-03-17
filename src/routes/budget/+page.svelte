<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;

  let form = { description: '', amount: '', type: 'expense', date: new Date().toISOString().slice(0,10) };
  let showAdd = false;
  $: entryList = (data.entries || []) as any[];
  $: total = entryList.reduce((s:number, e:any) => e.type==='income' ? s+e.amount : s-e.amount, 0);
  $: income = entryList.filter((e:any)=>e.type==='income').reduce((s:number,e:any)=>s+e.amount,0);
  $: expense = entryList.filter((e:any)=>e.type==='expense').reduce((s:number,e:any)=>s+e.amount,0);

  function fmt(n:number){return n.toLocaleString('ko-KR');}

  async function submit(){
    if(!form.description||!form.amount)return;
    await fetch('/api/budget',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,amount:Number(form.amount)})});
    showAdd=false; form={description:'',amount:'',type:'expense',date:new Date().toISOString().slice(0,10)};
    location.reload();
  }
  async function del(id:number){if(!confirm('삭제?'))return;await fetch('/api/budget/'+id,{method:'DELETE'});location.reload();}
</script>

<PageHeader title="📒 가계부" />
<div class="page">
  <div class="summary">
    <div class="sum-box income"><p class="sum-label">수입</p><p class="sum-val">+{fmt(income)}원</p></div>
    <div class="sum-box balance"><p class="sum-label">잔액</p><p class="sum-val">{fmt(total)}원</p></div>
    <div class="sum-box expense"><p class="sum-label">지출</p><p class="sum-val">-{fmt(expense)}원</p></div>
  </div>

  <div class="list-hd">
    <h3>내역</h3>
    <button class="add-btn" on:click={()=>showAdd=true}>+ 추가</button>
  </div>

  <div class="list">
    {#each entryList as e}
      <div class="row">
        <div class="row-left">
          <span class="row-type" class:inc={e.type==='income'}>{e.type==='income'?'수입':'지출'}</span>
          <div><p class="row-desc">{e.description}</p><p class="row-date">{e.date}</p></div>
        </div>
        <div class="row-right">
          <p class="row-amt" class:inc={e.type==='income'}>{e.type==='income'?'+':'-'}{fmt(e.amount)}원</p>
          <button class="del" on:click={()=>del(e.id)}>🗑</button>
        </div>
      </div>
    {/each}
    {#if !(data.entries||[]).length}<p class="empty">내역이 없어요</p>{/if}
  </div>
</div>

{#if showAdd}
<div class="ov" on:click={()=>showAdd=false} role="button" tabindex="0" on:keydown={()=>{}}>
  <div class="modal" on:click|stopPropagation role="dialog">
    <h3>내역 추가</h3>
    <label>구분<select bind:value={form.type}><option value="expense">지출</option><option value="income">수입</option></select></label>
    <label>내용<input bind:value={form.description} placeholder="예: 카페, 영화"/></label>
    <label>금액<input type="number" bind:value={form.amount} placeholder="0"/></label>
    <label>날짜<input type="date" bind:value={form.date}/></label>
    <div class="btns"><button class="c" on:click={()=>showAdd=false}>취소</button><button class="s" on:click={submit}>저장</button></div>
  </div>
</div>
{/if}

<style>
  .page{max-width:480px;margin:0 auto;padding:0 16px 16px;}
  .summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:20px;}
  .sum-box{background:white;border-radius:12px;padding:12px 8px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.06);}
  .sum-label{font-size:11px;color:#999;margin-bottom:4px;}
  .sum-val{font-size:14px;font-weight:800;color:#3D3D3D;}
  .sum-box.income .sum-val{color:#4CAF50;}
  .sum-box.expense .sum-val{color:#E57373;}
  .sum-box.balance .sum-val{color:#C4A574;}
  .list-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
  .list-hd h3{font-size:15px;font-weight:700;color:#5D4E37;}
  .add-btn{padding:7px 14px;background:#C4A574;color:white;border:none;border-radius:16px;font-size:12px;font-weight:700;cursor:pointer;}
  .row{background:white;border-radius:10px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;box-shadow:0 1px 4px rgba(0,0,0,.06);}
  .row-left{display:flex;align-items:center;gap:10px;}
  .row-type{font-size:10px;padding:3px 7px;border-radius:8px;background:#FFE0E0;color:#E57373;font-weight:700;}
  .row-type.inc{background:#E8F5E9;color:#4CAF50;}
  .row-desc{font-size:14px;font-weight:600;color:#3D3D3D;}
  .row-date{font-size:11px;color:#999;}
  .row-right{display:flex;align-items:center;gap:8px;}
  .row-amt{font-size:14px;font-weight:700;color:#E57373;}
  .row-amt.inc{color:#4CAF50;}
  .del{background:none;border:none;font-size:16px;cursor:pointer;}
  .empty{text-align:center;color:#ccc;padding:40px 0;font-size:14px;}
  .ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;justify-content:center;z-index:200;}
  .modal{background:white;border-radius:16px 16px 0 0;padding:24px 20px;width:100%;max-width:480px;}
  .modal h3{font-size:18px;font-weight:700;margin-bottom:16px;color:#3D3D3D;}
  label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:#555;margin-bottom:12px;}
  input,select{padding:10px 12px;border:1.5px solid #E0E0E0;border-radius:8px;font-size:14px;}
  .btns{display:flex;gap:10px;margin-top:8px;}
  .c{flex:1;padding:12px;background:#f5f5f5;border:none;border-radius:8px;font-size:15px;cursor:pointer;}
  .s{flex:1;padding:12px;background:#C4A574;color:white;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;}
</style>