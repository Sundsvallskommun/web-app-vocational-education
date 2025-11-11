# Yrkesutbildningar

## APIer som används

Dessa APIer används i projektet, applikationsanvändaren i WSO2 måste prenumerera på dessa.

| API             | Version |
| --------------- | ------: |
| Messaging       |     6.1 |
| EducationFinder |     3.0 |
| SimulatorServer |     2.0 |

## Utveckling

### Krav

- Node >= 20 LTS
- Yarn

### Steg för steg

1. **Klona ner repot.**

```
git clone git@github.com:Sundsvallskommun/web-app-vocational-education.git
```

2. **Installera dependencies för `backend`, `frontend` och `admin`**

```
cd frontend
yarn install

cd backend
yarn install

cd admin
yarn install
```

3. **Skapa .env-fil för `frontend` och `admin`**

```
cd frontend
cp .env-example .env

cd admin
cp .env-example .env
```

Redigera `.env` för behov, för utveckling bör exempelvärdet fungera.

4. **Skapa .env-filer för `backend`**

```
cd backend
cp .env.example.local .env.development.local
```

redigera `.env.development.local` för behov. URLer, nycklar och cert behöver fyllas i korrekt.

- `CLIENT_KEY` och `CLIENT_SECRET` måste fyllas i för att APIerna ska fungera, du måste ha en applikation från WSO2-portalen

skapa sedan en .env.test.local utifrån .env.development.local:

```
cp .env.development.local .env.test.local
```

Och sätt TEST=true

5. **Initiera databas för backend**

Sätt upp en mysql-server, förslagsvis MariaDB och justera för uppgifterna i backend/.env.development.local. Admin-användaren för inloggning specas i samma env-fil och skapas vid seedning av databasen, kom ihåg att lägga in din mejladress där.

```
cd backend
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed
```

6. **Starta**

backend:

```
yarn dev
```

frontend:

```
yarn dev
```

För att starta backend i test-läge med mockad data (cypress-tester eller vid utveckling när anslutning mot api:er är bruten)

```
yarn dev:test
```

### Test

En full coverage-körning

1. Starta backend med `yarn dev:test` för att bistå frontend med mockdata
2. Bygg frontend med `yarn build:test` sen starta med `yarn start`
3. Kör `yarn test:coverage` för att köra samtliga tester

## Bygg

Bygg och starta backend först (Frontend behöver backend för att generera sidor), sedan bygg och starta frontend.

OBS eftersom frontend i byggsteget anropar backend så behöver DNS-resolutionen fungera (när appen deployas under domännamn istället för ip-adress). Då kan man behöva lägga till i serverns /ets/hosts-fil:

yrkesutbildningmitt.se 127.0.0.1 

Där 127.0.0.1 byts ut mot serverns faktiska ip-adress. Annars finns det risk att frontends anrop till backend inte når fram, och bygget går inte igenom. Får man ett felmeddelande rörande sitemap.xml är detta troligen problemet.

## Flytt av databas

- Notera att Page.imgSrc får url med server-url, så kolumnen imgSrc behöver sättas om
