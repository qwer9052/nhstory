import pathlib
B=pathlib.Path(r'C:\Users\ron\IdeaProjects\nhstory')
files=['src/routes/budget/+page.svelte','src/routes/budget/+page.server.ts','src/routes/qa/+page.svelte','src/routes/qa/+page.server.ts','src/routes/places/+page.svelte','src/routes/places/+page.server.ts','src/routes/api/budget/+server.ts','src/routes/api/qa/+server.ts','src/routes/api/places/+server.ts']
for f in files:
    p=B/f; p.parent.mkdir(parents=True,exist_ok=True); p.write_text('PLACEHOLDER',encoding='utf-8'); print(f)
