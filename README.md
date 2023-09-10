
# Kynopsia

Explore an abandoned game world and tour the sentiments left behind.

**Kynopsia** was made to mimic the feeling of joining a MUD (Multi User Dungeon) in modern day. You can play it live at https://kynopsia.net/




## Environment Variables

To run this project, you will need to add the following environment variable to your .env.local file located in /client: 

`NEXT_PUBLIC_API` ending with /

and the following environment variables in your .env located in /server

`CLIENT_ADDRESS` not ending with /

`PORT`


## Run Locally

Clone the project

```bash
  git clone https://github.com/catmona/single-user-dungeon.git
```

Go to the client project directory

```bash
  cd single-user-dungeon/client
```

Install client dependencies

```bash
  npm install
```

Go to the server project directory

```bash
  cd ../server
```

Install server dependencies

```bash
  npm install
```

Start the server and client together (from /server)

```bash
  npm run both
```

