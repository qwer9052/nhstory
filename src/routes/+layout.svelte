<script lang="ts">
  import type { LayoutData } from './$types';
  
  export let data: LayoutData;
</script>

<nav>
  {#if data.session}
    <span>Welcome, {data.session.user?.name}!</span>
    <form method="POST" action="/auth/signout">
      <button type="submit">Logout</button>
    </form>
  {/if}
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #333;
    color: white;
  }
  nav button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
  }
  main {
    padding: 2rem;
  }
</style>