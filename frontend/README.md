# BeanLog Frontend ☕ (React Client)

Το frontend της εφαρμογής **BeanLog**, κατασκευασμένο με React, TypeScript και Vite. Προσφέρει ένα καθαρό και γρήγορο user interface για τη διαχείριση και καταγραφή των κόκκων specialty καφέ.

## Δομή Φακέλων (`src/`)

Ο κώδικας είναι οργανωμένος με βάση τα features της εφαρμογής για μέγιστη αναγνωσιμότητα και επεκτασιμότητα:

*   **`context/`**: Περιέχει το `AuthContext.tsx` για τη διαχείριση του global authentication state της εφαρμογής.
*   **`features/`**:
    *   **`auth/`**: Components (`AuthForm.tsx`) και CSS για το Login και το Register.
    *   **`beans/`**: Components (`BeanCard.tsx`, `BeanFormModal.tsx`, `DashboardView.tsx`) για την προβολή, προσθήκη και επεξεργασία των κόκκων καφέ.
*   **`services/`**: Ο custom API client (`api.ts` με `apiRequest`) που χρησιμοποιεί τη native `fetch` για την επικοινωνία με το backend και προσθέτει αυτόματα το JWT token στα headers.
*   **`types/`**: Global TypeScript interfaces (`index.ts`).

---

## Τεχνολογίες & Εργαλεία

*   **React 19 & TypeScript**
*   **Vite** ως γρήγορο build tool
*   **CSS / Custom Styles** για το layout και το design των components.

---

## Οδηγίες Εκτέλεσης

Για να τρέξεις το frontend τοπικά στον υπολογιστή σου, ακολούθησε τα παρακάτω βήματα:

### 1. Εγκατάσταση των Dependencies
Βεβαιώσου ότι βρίσκεσαι στον φάκελο `frontend` και τρέξε:
```bash
npm install
```

### 2. Εκκίνηση του Development Server
Ξεκίνα τον τοπικό server της Vite:
```bash
npm run dev
```
Η εφαρμογή θα είναι διαθέσιμη στο `http://localhost:5173` (ή στη θύρα που θα εμφανιστεί στο τερματικό σου).

### 3. Έλεγχος TypeScript & Build
Για να κάνεις compile τον κώδικα και να βεβαιωθείς ότι δεν υπάρχουν σφάλματα τύπων (type errors):
```bash
npm run build
```
Το Vite θα δημιουργήσει έναν βελτιστοποιημένο φάκελο `dist/` έτοιμο για production.