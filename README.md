# C.R 4 Vegas - Control Remoto - BACKEND
Proyecto para el control remoto y estadística de datos para la Comunidad de Regantes las 4 Vegas de Almería. En la parte de aplicación se va a utilizar Angular para el frontend y NodeJS con Typescript para el backend, el servidor intermedio entre la aplicación y los microcontroladores será EMQX, para la comunicación con los nodos finales se van a utilizar módulos SIM800L integrados con arduinos nano, junto a una variedad de sensores y actuadores.
El objetivo principal es crear un login para autenticación y autorización, y el uso de mapas para el despliege de los microcontroladores por las diferentes unidades de control de la red de tuberías de la comunidad.

***

## BACKEND
- Framework: NestJS

**Dependencias**
```json
@nestjs/config
@nestjs/jwt
@nestjs/passport
@nestjs/swagger
@nestjs/typeorm
bcrypt
class-transformer
class-validator
mysql
passport
passport-jwt
passport-local
reflect-metadata
swagger-ui-express
typeorm
```

**Dependencias de desarrollo**
```json
@types/bcrypt
@types/faker
@types/passport-jwt
@types/passport-local
@types/swagger-ui-express
typeorm-seeding
```

**Scripts added**
```json
seed:config": "ts-node ./node_modules/typeorm-seeding/dist/cli.js config
seed:run": "ts-node ./node_modules/typeorm-seeding/dist/cli.js seed
schema:drop": "ts-node ./node_modules/typeorm/cli.js schema:drop
schema:sync": "ts-node ./node_modules/typeorm/cli.js schema:sync
```

## Base de datos - Diagrama relacional
![Diagrama Relacional](/img/cr4vegas_remoto_RELACIONAL_1.png "Diagrama Relacional")



