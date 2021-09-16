## AIM

Generate 1 million random records from 1-9-2020 to 31-8-2021

1. random unique time that greater than the old one

2. customer id random number between 1 and 1000

3. service id  customer id with random number that between 1 and 100

4. country code from 'CN', 'UK', 'US', 'FR', 'DE', 'ES', 'CA', 'IN', 'JP', 'KR', 'SG'

5. usage random number from 1 to 1000000000

Environment:
- Node JS version 14.17.6
- NPM version 6.10.2

## How to run:
update some parameters in run.js (optional)

```
npm install
node run.js {args}
node run.js true # share same data to all csv, should be run faster
```
