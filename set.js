const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtyYjRNeHdKY1ZIRml4aGJvRHBsS1J0RGdHS0NSYThUOVBrdDBOTHIyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHdWd1ZhZGhZRUNvazVoYjNGU0hkVk9Jd0xVWFY1SC9pcnB6ZWg0UXdEVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS0dsWEp0Vi9ySjNZbVRJb1Mzd1VkV1pnMUFvS1VZWmZHMnJ3VEJ5Y0ZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVR05qVGE3ck9pbW5oTHZycGhtaEVYc1BOcjRUVENxdHdUSW84WWc3alcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNPT0FlVDAyRUgyMjZ5UytzeFdnaDJSdU04MVd4L0FzM2dxWUZzYnA0RWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1hSlkzOURYT09rbWQ1L0UvWnArQlk3L3gvU0N6WGdKL3RqV1pDMXZ0VU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUJmQWt6aFMyY2dwYnVzSkVVRmdCeVVrQ216c09GUkRXN0RsQThiU2UwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2VuYkh5L0tLNEVtWk9aYlA3MFVmUjlhRFpGQWsyQkdCblNFSSt3d1Mzdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVpaTFxY2hJTDNKalNsZ2NhVGc1em5Rb3VPblc2UjRnWmN0elNpMlJqUVZEVi9tUFNtbGtJU05tV2FUZ1lnbWowR2RVUEFkZ211cUlHNFB6a1ZxR2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEzLCJhZHZTZWNyZXRLZXkiOiJKODNaaW9CSnh2ekRJNTd5OHZmNWN0Q1AzdkxBdkI2UEo1YWlqWHV1UGE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwMjIyMzUwOTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FBMTRFRDZDRDhFQUZEOEU1REEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTE0NDM4OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUjRwa2RISklTTnkwVHJkcExSSWJjdyIsInBob25lSWQiOiJlZWM2ZjY3YS02MTMwLTQzZDgtYmViMC00YTBkNjA3NmM1MzciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMHdRL0dCT3JFSjcwYk1wMVpBRkRkQ0ptVXpJPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRck1iMlMvd0RkcHFFYXhBVW5qd01LRWNtL1U9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNNUFMwY1FKRUxlZjRMTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI1a25KWmNqUlI4b0FBbzUyL2ZVTnl2Wk9jWFM4U0dlSmIyYkZ6N0dKNmdjPSIsImFjY291bnRTaWduYXR1cmUiOiJzNDRkc0ZQVVZ1aG9PT1RNVUdGdnowcWFUVkRJRmt1czJzeS9nOVpja1p5KzhKbGlTQlZvbU9LdldhNC8va2d1WnVHK0hLUXJNaDJiVDdGRU9EK3JqUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUGYyZEFKc1dRQkVSVG13WnlXNlJRRzN2Q0FlZUVqckdpTlg2NVY2b3hrUnRGa0dDVkhncitzQmJlb3hDNWorSWs3VnhqbG93eDE0OWpNYUpLZ2J3aUE9PSJ9LCJtZSI6eyJpZCI6IjIzNDgwMjIyMzUwOTE6NDNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ2Flc2FyIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwMjIyMzUwOTE6NDNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVpKeVdYSTBVZktBQUtPZHYzMURjcjJUbkYwdkVobmlXOW14Yyt4aWVvSCJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5MTQ0Mzg3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlkbyJ9',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Caesar",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348078112891",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Anna',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/c3049cd3ac77f371e119e.jpg,https://telegra.ph/file/a22200a780671e0e32383.jpg,https://telegra.ph/file/85fe388fdd14930cf86a0.jpg,https://telegra.ph/file/ba9ced500f9eca7db8acb.mp4',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || 'sk-proj-e20aljveXK3imt9IgaQhT3BlbkFJMphyLKWOubU5rhmKUlKx',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
