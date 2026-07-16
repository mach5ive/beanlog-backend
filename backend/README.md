# BL (BeanLog) - Backend

Το backend για την εφαρμογή παρακολούθησης καφέδων (BL), χτισμένο με Node.js, Express, TypeScript και MongoDB.

## Τεχνολογίες
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (με Mongoose)
- **Auth/Security**: bcrypt

## Δομή Project
Το project ακολουθεί αρχιτεκτονική Layered (MVC + Mapper):
- `src/models/`: Ορισμός των Schemas της βάσης.
- `src/services/`: Επιχειρησιακή λογική (CRUD).
- `src/controllers/`: Διαχείριση HTTP αιτημάτων.
- `src/mappers/`: Μετασχηματισμός δεδομένων από τη βάση προς το API.
- `src/routes/`: Ορισμός των endpoints.

## Εγκατάσταση
1. Κλωνοποίησε το repo: `git clone [URL]`
2. Εγκατάστησε τα dependencies: `npm install`
3. Δημιούργησε ένα αρχείο `.env` στη ρίζα με τα εξής:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SALT_ROUNDS=10