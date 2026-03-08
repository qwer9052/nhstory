<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<h1>Home</h1>
<p>Only authenticated users can see this page.</p>

{#if data.session}
  <div class="user-info">
    <h2>User Info</h2>
    <p><strong>Name:</strong> {data.session.user?.name}</p>
    <p><strong>Email:</strong> {data.session.user?.email}</p>
  </div>
{/if}

<style>
  h1 {
    color: #333;
  }
  .user-info {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
</style>