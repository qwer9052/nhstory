<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';
  export let data: PageData;

  const questions = [
    '우리만의 특별한 추억은?','상대방의 어떤 점이 가장 좋아?','우리가 꼭 함께 가고 싶은 여행지는?',
    '처음 만났을 때 첫인상은?','10년 후 우리는 어떤 모습일까?','가장 행복했던 데이트는?',
    '상대방이 나를 위해 해준 가장 감동적인 일은?','우리만의 버킷리스트를 만든다면?',
  ];

  let todayQ = questions[new Date().getDay() % questions.length];
  let myAnswer = '', loading = false, saved = false;

  $: entryList = (data.entries || []) as any[];
  $: myEntry = entryList.find((e:any) => e.question === todayQ && e.date === new Date().toISOString().slice(0,10)) as any;

  async function submit(){
    if(!myAnswer.trim())return;
    loading=true;
    await fetch('/api/qa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:todayQ,answer:myAnswer,date:new Date().toISOString().slice(0,10)})});
    loading=false; saved=true; location.reload();
  }
</script>

<PageHeader title="📖 커플문답" />
<div class="page">
  <div class="today-q">
    <p class="q-label">오늘의 질문</p>
    <p class="q-text">"{todayQ}"</p>
  </div>

  {#if myEntry}
    <div class="answered">
      <p class="ans-label">내 답변</p>
      <p class="ans-text">{myEntry.answer1 || myEntry.answer2}</p>
    </div>
  {:else}
    <div class="answer-form">
      <textarea bind:value={myAnswer} placeholder="솔직하게 답해봐요 💭" rows="4"></textarea>
      <button on:click={submit} disabled={loading}>{loading?'저장 중...':'답변 저장'}</button>
    </div>
  {/if}

  {#if (data.entries||[]).length > 0}
    <div class="history">
      <h3>지난 문답들</h3>
      {#each entryList as e}
        <div class="qa-card">
          <p class="qa-q">{e.question}</p>
          <p class="qa-date">{e.date}</p>
          {#if e.answer1}<p class="qa-a">💬 {e.answer1}</p>{/if}
          {#if e.answer2}<p class="qa-a qa-a2">💬 {e.answer2}</p>{/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page{max-width:480px;margin:0 auto;padding:0 16px 16px;}
  .today-q{background:linear-gradient(135deg,#F5E6C8,#E8D5A3);border-radius:16px;padding:24px 20px;text-align:center;margin-bottom:20px;box-shadow:0 4px 12px rgba(196,165,116,.2);}
  .q-label{font-size:12px;color:#8B6914;font-weight:600;margin-bottom:8px;}
  .q-text{font-size:16px;font-weight:800;color:#5D4E37;line-height:1.5;}
  .answered{background:white;border-radius:12px;padding:16px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,.06);}
  .ans-label{font-size:12px;color:#999;margin-bottom:6px;}
  .ans-text{font-size:15px;color:#3D3D3D;line-height:1.6;}
  .answer-form{margin-bottom:20px;}
  textarea{width:100%;padding:14px;border:1.5px solid #E0E0E0;border-radius:12px;font-size:14px;resize:none;font-family:inherit;box-sizing:border-box;margin-bottom:10px;}
  button{width:100%;padding:13px;background:#C4A574;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;}
  button:disabled{opacity:.6;}
  .history h3{font-size:15px;font-weight:700;color:#5D4E37;margin-bottom:10px;}
  .qa-card{background:white;border-radius:10px;padding:14px;margin-bottom:8px;box-shadow:0 1px 4px rgba(0,0,0,.06);}
  .qa-q{font-size:13px;font-weight:700;color:#5D4E37;margin-bottom:4px;}
  .qa-date{font-size:11px;color:#bbb;margin-bottom:8px;}
  .qa-a{font-size:13px;color:#3D3D3D;line-height:1.5;padding:6px 10px;background:#FAF6EE;border-radius:8px;margin-bottom:4px;}
  .qa-a2{background:#F0F7FF;}
</style>