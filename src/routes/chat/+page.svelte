<script lang="ts">
  import type { PageData } from './$types';
  import { onMount, tick } from 'svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;
  let msgs = data.messages || [], input = '', container: HTMLDivElement;
  onMount(()=>scrollBottom());
  async function scrollBottom(){await tick();if(container)container.scrollTop=container.scrollHeight;}
  async function send(){
    if(!input.trim())return;
    const text=input.trim();input='';
    await fetch('/api/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:text})});
    msgs=await fetch('/api/messages').then(r=>r.json());
    scrollBottom();
  }
  function handleKey(e:KeyboardEvent){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}
  function fmt(ts:any){return new Date(ts).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});}
</script>
<PageHeader title="💬 소근소근" />
<div class="page">
  <div class="msgs" bind:this={container}>
    {#each msgs as msg}
      <div class="msg" class:mine={msg.senderId===data.userId}>
        <div class="bubble">{msg.content}</div>
        <span class="time">{fmt(msg.createdAt)}</span>
      </div>
    {/each}
    {#if !msgs.length}<div class="empty">첫 메시지를 보내보세요 💌</div>{/if}
  </div>
  <div class="bar">
    <textarea bind:value={input} on:keydown={handleKey} placeholder="소근소근..." rows="1"></textarea>
    <button on:click={send}>전송</button>
  </div>
</div>
<style>
  .page{max-width:480px;margin:0 auto;display:flex;flex-direction:column;height:calc(100vh - 56px);}

  .hd h2{font-size:18px;font-weight:800;color:#5D4E37;}
  .msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#FAF6EE;}
  .msg{display:flex;flex-direction:column;max-width:75%;}
  .msg.mine{align-self:flex-end;align-items:flex-end;}
  .msg:not(.mine){align-self:flex-start;}
  .bubble{padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;word-break:break-word;}
  .msg.mine .bubble{background:#C4A574;color:white;border-radius:16px 16px 4px 16px;}
  .msg:not(.mine) .bubble{background:white;color:#3D3D3D;border-radius:16px 16px 16px 4px;box-shadow:0 1px 4px rgba(0,0,0,.08);}
  .time{font-size:10px;color:#bbb;margin-top:2px;}
  .empty{text-align:center;color:#ccc;margin:auto;font-size:14px;}
  .bar{display:flex;gap:8px;padding:10px 12px;background:white;border-top:1px solid #E8D9C0;}
  textarea{flex:1;padding:10px 12px;border:1.5px solid #E0E0E0;border-radius:20px;font-size:14px;resize:none;font-family:inherit;}
  button{padding:10px 18px;background:#C4A574;color:white;border:none;border-radius:20px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;}
</style>