import pathlib
p=pathlib.Path(r'C:\Users\ron\IdeaProjects\nhstory\src\lib\components')
p.mkdir(parents=True,exist_ok=True)
(p/'PageHeader.svelte').write_text('PLACEHOLDER',encoding='utf-8')
print('ok')