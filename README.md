# Docker

- Run

  - docker run node-app-image
  - docker run -p 3000:3000 -d --name node-app node-app-image
  - | --name node-app = çalışan docker image isim verir
  - | -d = arka planda çalışması için
  - | -p 3000:3000
  - docker inspect docker-node-mongo-1
  - | docker containerın ayrıntılı bilgisini verir
  - docker network ls
  - | Docker ağlarını listeler
  - docker logs -f <container-id>
  - | docker çıktılarını anlık görmemizi sağlar

  -3000= bilgisayarın portu diğer 3000 dockerın içindeki uygulamanın portu

  - docker ps
  - | Çalışan kontainerları listeler
  - docker rm <container-id-
  - | Kontainerı siler
  - docker exec -it node-app /bin/sh
  - | -docker cointainerın içindeki klasorleri gösteri
  - cat index.js
  - | Dosyanın içerisini açar

  - docker run -v ${PWD}:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
  - | -v /app/node_modules klasorundeki packageları kullanması için
  - | ${PWD} kök dizindekileri :/app kopyala
  - | /app:ro - read only
  - docker exec -it node-app bash
  - docker ps -a
  - | tüm containerları gösterir
  - docker logs node-app
  - | container hakkında bilgi verir çalışma durumu vs
  - docker run -v ${PWD}:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
  - |--env-file ./.env kök dizinde bulunan env dosyasını belirtiyoruz bu dosya otomatik olarak docker içerisine kopyalanıyor
  - docker volume ls
  - |-- docker için tutulan kalıcı dataları listeler
  - docker volume prune
  - |-- docker için tutulan verileri kalıcı olarak siler , anonimler silinir.
  - docker rm node-app -fv
  - |--containerda tutulan ve onunla ilgili olan verileride zorunlu olarak siler

- Docker Compose

  - docker-compose up -d
  - |-- Docker compose dosyasını çalıştırır ve container oluşturur
  - docker-compose down -v
  - |-- Docker compose aracılığıyla başlatılan tüm containerları siler
  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
  - |--dev ortamındaki dockercompose çalıştırır

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --scale node-app=2
    |-- node-app=2 2 tane node-app containerı oluşturur
  - |-- --build yeni bir modül var dockerı tekrardan oluştur demek

* ====================== MONGO DB =====================================

  - docker exec -it docker-node-mango-1 mongosh -u "admin" -p "admin"
  - |-- windows üzerinden docker shell açma
  - use mydb
  - |-- eğer yoksa oluşturur varsa ise o dbyi seçer
  - db.books.insertOne({"name": "sezer"})
  - |-- Ekleme yapar
  - db.books.find({})
  - |--Tümünü seçer getirir
  - show dbs
  - |--dbleri gösterir

* ====================== Redis =====================================

- docker exec -it docker-compose-nodejs-redis-1 redis-cli
- |-- redis shell açma
- keys \*
- |-- tüm keyleri gösterir
- get key
- |-- keyin değerini gösterir
- set key value
- |-- keyin değerini set eder
- del key
- |-- keyi siler
- flushall
- |-- tüm keyleri siler
- exit
- |-- çıkış yapar

* ====================== PORT =====================================
  -Nginx konteynırı, genellikle HTTP trafiğini dinlemek için 80 numaralı portu kullanır. Docker Compose dosyasındaki port yönlendirme ayarı, nginx konteynırının 80 numaralı portunu host makinanın 3000 numaralı portuna bağlamaktadır. Bu sayede, host makinadaki 3000 numaralı port üzerinden gelen istekler nginx konteynırına yönlendirilerek, nginx servisinin çalıştığı konteynıra ulaşılmasını sağlar.

* ====================== Ubuntu =====================================

- export SESSION_SECRET=secret
- curl ifconfig.me
- | ip adresini gösterir

- | ls -la
- | |-- dosyaları listeler
- |-- env değişkeni oluşturur
- export PORT=3000
- |-- env değişkeni oluşturur
- printenv
- |-- env değişkenlerini gösterir
- vi .env
- |-- .env dosyasını açar
- :w
- |-- kaydet
- :q
- |-- çıkış yapar
- :wq
- |-- kaydet ve çıkış yapar
- :q!
- |-- çıkış yapar
- :w!
- |-- kaydet
- :wq!
- |-- kaydet ve çıkış yapar
- set -o allexport; source /root/.env
- |-- .env dosyasındaki değişkenleri env değişkenlerine aktarır, bu sayede docker-compose içerisinde env dosyasındaki değişkenleri kullanabiliriz. Env dosyasındaki değişkenler kabuk ortamında geçerli olur.

* ====================== Ubuntu Cloud =====================================
  - ssh root@138.197.177.18
  - |-- cloud sunucuya bağlanma
  - mkdir app
  - |-- app klasörü oluşturur
  - cd app
  - git clone https://github.com/Sayzera/docker-compose-nodejs .
  - |-- . git klasörünü oluşturur
