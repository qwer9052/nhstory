import pathlib
B=pathlib.Path(r'C:\Users\ron\IdeaProjects\nhstory')
files=['src/routes/+page.svelte','src/routes/+page.server.ts','src/routes/setup/+page.svelte','src/routes/anniversary/+page.svelte','src/routes/anniversary/+page.server.ts','src/routes/roulette/+page.svelte','src/routes/roulette/+page.server.ts','src/routes/reels/+page.svelte','src/routes/reels/+page.server.ts','src/routes/chat/+page.svelte','src/routes/chat/+page.server.ts','src/routes/api/couple/+server.ts','src/routes/api/anniversaries/+server.ts','src/routes/api/anniversaries/[id]/+server.ts','src/routes/api/roulette/+server.ts','src/routes/api/reels/+server.ts','src/routes/api/reels/[id]/+server.ts','src/routes/api/messages/+server.ts']
for f in files:
    p=B/f
    p.parent.mkdir(parents=True,exist_ok=True)
    if not p.exists(): p.write_text('PLACEHOLDER',encoding='utf-8')
    print('OK',f)
