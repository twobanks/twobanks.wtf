<p align="center">
  <img src="./public/two.svg" alt="Logo do Projeto" width="350" />
</p>

---

📂 Estrutura do Projeto

```
.
├── .env.local
├── .eslintrc.json
├── .gitignore
├── README.md
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── public
│   └── two.svg
└── src
    ├── actions
    │   ├── creditCards.ts
    │   └── wallet.ts
    ├── app
    │   ├── admin
    │   │   ├── carteira
    │   │   │   ├── cartoes
    │   │   │   │   ├── [id]
    │   │   │   │   │   └── page.tsx
    │   │   │   │   └── page.tsx
    │   │   │   ├── faturas
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── auth.ts
    ├── components
    │   └── OptimisticInstallmentButton.tsx
    ├── db
    │   ├── index.ts
    │   └── schema.ts
    └── lib
        └── household.ts
```