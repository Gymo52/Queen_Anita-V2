const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1BjdG9rV1d2UzFRa0pmaEdXQUNBWnh6LzdiZlhWWmRIWE1zYVBHUTBFaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWRiUjZoa25Ed2o0NTh3TWs3cHBVbTNkaXlPOVUrMUt0cVpHQ25udWVUQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RWlYSTZjT0FZNU50Y3FHNlc4THdPdWNKbzd6d2daeHcxL1BPai83aDI4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvcjVGbVlORzFOcDd4bFBTUlhiYkxTNlpad3J2RWgvc1B1R1dNLzRjREdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFLNFZtODZna1AvdkgxRkJ3aHJxQ1ZWSEhJZzYzNENOWUhOaldIenBMMTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZJMnRtOVMwSk1Qdmc4VTA3NEdVYzFiWGNZQXJnZnphdmljeWkxdjFlMU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0tkSjJVaXJKT2lFdkdSOHVSNTJ2VHFkdXZsQ1FDbkpHYm9nT0x1djYzRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR2Rvb2ZqeGFMTHZrZVJwVjkzTE55WHJXU2VnTlZKZGRXNVpHbjJGQnJWND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitzZm1ZdURNN0JFYjFQZVFyd2p5YWhLWGFEZzNYQnpIUlI2REN1d2o0d2RKS200bHdDWEljTXU1K24rOFRGNHJNV0FheS9jZDQ4cm5wUk5XdEU3cEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiJvcE94NWhTS09KR3Nvd2U0THVMRHJKbUMvM2RablJMSFVyR3cycUszWTljPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNzgxMTI4OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E4QTMxQjJCQzIxRkYzRDYxNDAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTQzMjE0MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA3ODExMjg5MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUU0OTk2NDkxMDk2NzgwN0MxNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5NDMyMTQzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyME52V2F6b1N4S0YtVGdLTlBJeDB3IiwicGhvbmVJZCI6IjYzNDc1MmZkLWViMWItNDgyYS1iOGM3LTM5NTVjNTljMjVmZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkdHR4eVE2dXFLcHBzZHJBbnpOR3lyYnlyblE9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVsT0VFZnBYZ09NcWZiYXQ2eWpySVdnOHlGQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pXZTFva0VFTDduOGJNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1MeGsyOGlkWHVyTEs1ZUJnRTQ2SS9PZXFTUjdmOVdRZ1hnMjRudGEwRFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBlWkx0aGxrNnptRnA4MnoyVEJHcE05NGl2aDBHWDZ0OGtoT2lGVENEMEYyaFlqSWszZHlQckFTNTdCeGZ3TzgyOFovYlJpczZuNXllR2ltR0RoMEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvWDJvTS9ON2pkQWxhbG5mWUN1aFJqaVBkejlZUk50NzFWdUhQS2MvTVJVMncrcWhxK09acUlmYWh0NzZtRENvNDlHK0lQYUYybkpkMGQ2dFhQeVVCUT09In0sIm1lIjp7ImlkIjoiMjM0ODA3ODExMjg5MTozN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDYWVzYXIifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA3ODExMjg5MTozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaaThaTnZJblY3cXl5dVhnWUJPT2lQem5xa2tlMy9Wa0lGNE51SjdXdEEwIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5NDMyMTM4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNSNSJ9',
    PREFIXE: process.env.PREFIX || "?",
    OWNER_NAME: process.env.OWNER_NAME || "Caesar",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348078112891",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'C̶a̶e̶s̶a̶r̶-̶M̶d̶',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/6756c02480e4ea955e6ec.mp4,https://telegra.ph/file/1bc5073286929c8ba5783.jpg,https://telegra.ph/file/18ffa8e1c1e0adc464025.jpg,https://telegra.ph/file/0b57c4c97dfca87bce76c.jpg',
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
