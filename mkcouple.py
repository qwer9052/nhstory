import pathlib
B=pathlib.Path(r'C:\Users\ron\IdeaProjects\nhstory')
p=B/'src/routes/couple'
p.mkdir(parents=True,exist_ok=True)
(p/'+page.svelte').write_text('PLACEHOLDER',encoding='utf-8')
print('ok')