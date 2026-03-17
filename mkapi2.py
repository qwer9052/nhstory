import pathlib
B=pathlib.Path(r'C:\Users\ron\IdeaProjects\nhstory')
p=B/'src/routes/api/budget/[id]'
p.mkdir(parents=True,exist_ok=True)
(p/'+server.ts').write_text('PLACEHOLDER',encoding='utf-8')
p2=B/'src/routes/api/qa/[id]'
p2.mkdir(parents=True,exist_ok=True)
(p2/'+server.ts').write_text('PLACEHOLDER',encoding='utf-8')
p3=B/'src/routes/api/places/[id]'
p3.mkdir(parents=True,exist_ok=True)
(p3/'+server.ts').write_text('PLACEHOLDER',encoding='utf-8')
print('ok')