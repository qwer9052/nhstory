import sqlite3
conn=sqlite3.connect('data/nhstory.db')
c=conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS budget(id INTEGER PRIMARY KEY AUTOINCREMENT,couple_id TEXT NOT NULL,type TEXT NOT NULL,description TEXT NOT NULL,amount INTEGER NOT NULL,date TEXT NOT NULL,created_at INTEGER NOT NULL)''')
c.execute('''CREATE TABLE IF NOT EXISTS qa(id INTEGER PRIMARY KEY AUTOINCREMENT,couple_id TEXT NOT NULL,question TEXT NOT NULL,answer1 TEXT,answer2 TEXT,date TEXT NOT NULL,created_at INTEGER NOT NULL)''')
c.execute('''CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY AUTOINCREMENT,couple_id TEXT NOT NULL,name TEXT NOT NULL,review TEXT,rating INTEGER,visited_at TEXT,created_at INTEGER NOT NULL)''')
conn.commit()
conn.close()
print('done')