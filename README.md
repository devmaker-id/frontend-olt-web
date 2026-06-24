# IE KANGGE NGAGUNAKUNA
jien file. .env atanapi robah tina file anu tos aya .env.example
sesuaikun jeng ka inginan

## lamun backend jeng fronend sami sareng
robah ku anjen src/shared/api/api.ts
```ts
// cekap esi ku /api
export const api = axios.create({
  baseURL: '/api'
})
```
ie anu nyien puyeng 30-60 menit awal ngabangun karna teu jalan
## anu kadua kula pake nginx
virtual host na kie, sa teuacana anjen tos install paket nginx sareng certbotna lengkap
### file site na kie
```sh
sudo nano \
/etc/nginx/sites-available/backend-olt
```
### esi virtualna kie
```sh
server {
    listen 80;
    server_name nms.domain.com;
    root /var/www/backend-olt;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### lajeng hirupan 
```sh
sudo ln -s \
/etc/nginx/sites-available/backend-olt \
/etc/nginx/sites-enabled/
```
## Test Configuration

```sh
sudo nginx -t
```
---
## Reload Nginx
```sh
sudo systemctl reload nginx
```
---

# manawi janten beda BACKEND jeng FRONDEND
```ts
//esi anu lengkap
export const api = axios.create({
  baseURL: 'https://nsm.domainmu.com/api'
})
```

# alternativ na pake ENV
robah ie dina file .env.example simpen kana .env
```sh
VITE_API_URL=hrrps://nms.domainku.com/api
```
teu kudu pake tanda '' / ""