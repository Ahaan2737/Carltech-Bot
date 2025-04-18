








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOENtanQ5ZXZsc3drbXRiTUFlVmpGMUlvL1FEeVRsLzZ6Z0NGZER3VVAzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYitBallQbTd4RHRhK3NNVmhYTXhQNG1GYTBRV1FiUWFMSjBENXV2VlpEaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TTI0UmhiZHp6bjR0cmhUT1BEMjJOYzVpQXBkWGQwWWJldm1tYU5XTDFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0NWRxVUFaQzhmMWZLMytreGFRS2JYYW1TVnR6YklkbjUvdDA4NkpQOEdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDN21VZ05yRUozM0NhNnJxS2U5cW8wMzN0KzZMY0Y2M1pWazBrTHRvRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJKNFM3eXlsTHlPTTRwLzB3Vm5BVnVEcXEzR0daQVhrQjFaTXZ5dW5qWFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUg3aHZVS1Z6V1d2WHp1bytsWkw2dU1FWTZjQUNqOUFyNHJFaUlkbHNXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEQ3QkF3cHpjZU1YMjdpdUpMSERiZjFmb1BXemRoY0ZzamZ4WXpiV1htVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRjOG5ZaUdTK01XOHJWK05wMXN4WGYwR3VNYmlLUk85R244UlltWHFkdlVsKzFuVUlPZy9LV0ZGRU1MN3VZSW9oSFlJUHZUSE9KNkhCR2djRUxvTkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTIsImFkdlNlY3JldEtleSI6Ik5naEJ2akkzc2FqU2tDekk0S2d3WmxHNHMyR3hqS1V3aEtkR3Y0MnFlQkE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU2NzA5NTQ3Mjc3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY5RUVGMUQxMENCQ0FGQjMwNTRCRkEzQUQ5NkQyNzhEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUwMDQ4NzZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NjcwOTU0NzI3N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5ODRDNUJGRDczRDE4MjAzNzlDQjBGMkVCNTZCNEI2MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MDA0ODc5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTY3MDk1NDcyNzdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjQ1Nzg5REJEMDMzMjdCNkRENjIzMkNGMTAzRDJCQjkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTAwNDg5OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoicEhxRG4yTzlSYUdwM1lPZ1dUc21KdyIsInBob25lSWQiOiJlYWUzNTQzOC1mYTYyLTRiYzEtODJmOC1hZDZmNDZjZmQxZDQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1V1am5OM3daaGNmYnVxUjF0VkJOdTduZFVFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpNcVZBOTkxYWRzTUlGbTdZV1E2N0Rvay84cz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJEUUY4RlA3USIsIm1lIjp7ImlkIjoiMjU2NzA5NTQ3Mjc3OjcwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCfkp7wn4Ww8J+Fs/CfhoLwn4aD8J+GhPCfhbvwn4Ww8J+Ft/Cfkp4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BIQjk5Y0dFTFhTaXNBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Inppa3MwZWttck9jYlp3SXBnZVk5RVBKdEVFTVpIMjdzSyszVVB0RzRUMUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdrcDJGQ3dFY2Y0OHpTcEdnT1NLc25aWW8rOWRjWWkxdk1GNFBFR2o3RUtqdEVJTDZhb0VMUDRjRHA0KzByTkhxaHkvcW1scDlGYWFHd3JrdTlHa0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvUndISXg2L0E0enRiK2p6eVFacjlCUFBhencyRnNCSmRHTDh0aE5sSEwxSWlNcVhPQkJvS1ZNKzJwaWlUWDMrMDFtbTkzTmpCaGlON1ZzcmlrQVhBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NjcwOTU0NzI3Nzo3MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjNHBMTkhwSnF6bkcyY0NLWUhtUFJEeWJSQkRHUjl1N0N2dDFEN1J1RTlRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1MDA0ODY3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU80bCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Adrian",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Carl William",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    CHATBO : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes', 
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTI_CALL : process.env.ANTI_CALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
