# Desafio servidor con balance de carga

## EJECUTAR SERVIDORES NODE
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

node src/server.js
node src/server.js --MODE=CLUSTER

- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo

forever start src/server.js
forever list

- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

pm2 start ./src/server.js --name="serverFork" -i --watch -- 8080
pm2 start ./src/server.js --name="serverCluster" --watch -- 8081
pm2 list


