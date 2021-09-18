### Environment:
- Node JS version 14.17.6
- NPM version 6.10.2

# Generator

1. Generate 1 million random records from 1-9-2020 to 31-8-2021

2. random unique time that greater than the old one

3. customer id random number between 1 and 1000

4. service id  customer id with random number that between 1 and 100

5. country code from 'CN', 'UK', 'US', 'FR', 'DE', 'ES', 'CA', 'IN', 'JP', 'KR', 'SG'

6. usage random number from 1 to 1000000000

## How to run generator (CLI):
update some parameters in config.js (optional)

```
npm install
node run-generator.js # default export to ./tmp folder
```

## How to run generator (React):
1. update some parameters in config.js (optional)

```
npm run client-install
npm run client
```
2. Go to web browser E.g `http://127.0.0.1:3000/`
3. Click `Generator` in Left hand corner

# React csv analyzer

1. Customer Monthly Usage report

2. Customer Top 3 Services Monthly Usage report

3. Country Monthly Usage % Distribution report

## How to run analyzer:
update some parameters in config.js (optional)

```
npm run client-install
npm run client
```