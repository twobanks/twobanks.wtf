// get-token.js
const client_id = 'cfc91537f98c48f39dafc490a70595dc'; // <--- O ID DO NOVO APP
const client_secret = 'a0925a2e3a1b4c52bf1119e5a6b12eda'; // <--- O SECRET DO NOVO APP
const code = 'AQB3YbODUV5-fJeOoAv-X2aZ_whurdgApidGGTH9e6AHVcSufvlTGASlba3uKOehLN-hBg5wPUgBbOgD5s-nC-W4RUlhOn7xKEsxaXvTLeDRPsTrOe8e01NZy-7e3_p-H2O9NsXKtWd3b6dRralRxB5fAb0jfldOkJHXDHy5I6mnOGemTBtF7BwIxR5EMRjfq7KdlnTdHuP9fw8q5EZeUXMGOCpbWkM5CqcRuxbuMtCcQxauH0k_wSvjGtQ'; // <--- O CÓDIGO NOVO

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://127.0.0.1:3000',
  }),
})
.then(res => res.json())
.then(data => console.log("RESPOSTA DO SPOTIFY:", data));