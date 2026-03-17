import pathlib
B=pathlib.Path(r'C:\Users\ron\IdeaProjects\nhstory')
files=['src/routes/+page.svelte','src/routes/+page.server.ts']
for f in files:
    (B/f).write_text('NEWCONTENT',encoding='utf-8')
    print('done',f)