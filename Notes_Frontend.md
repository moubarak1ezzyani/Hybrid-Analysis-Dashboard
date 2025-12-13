Initialisation du Frontend (Next.js)
Puisque le frontend est un dépôt séparé, ouvrez un nouveau terminal en dehors du dossier backend.

Commande d'initialisation :


```bash
npx create-next-app@latest frontend-app --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
```
Validez toutes les options par défaut (Yes).

Ensuite, installez une petite librairie pour gérer les icônes (optionnel mais plus joli) :

```Bash
cd frontend-app
npm install lucide-react
```