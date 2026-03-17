<script lang="ts">
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<slot />

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html, body) {
    background: #F0EAD6;
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    min-width: 320px;
    overflow-x: hidden;
  }
  :global(a) { color: inherit; }
  :global(input, textarea, select, button) { font-family: inherit; }
</style>