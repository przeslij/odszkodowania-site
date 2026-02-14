# Contact Form Enterprise

Formularz kontaktowy z pełną dostępnością (A11y), profesjonalnym maskowaniem pól i walidacją.

## Instalacja

```bash
npm install
```

lub jeśli używasz yarn:

```bash
yarn install
```

lub pnpm:

```bash
pnpm install
```

## Uruchomienie

```bash
npm run dev
```

## Funkcjonalności

- ✅ Pełna dostępność (A11y) z Listbox z @headlessui/react
- ✅ Profesjonalne maskowanie pól z react-number-format
- ✅ Walidacja z react-hook-form i Zod
- ✅ Polskie komunikaty błędów
- ✅ Dark mode
- ✅ Turnstile CAPTCHA
- ✅ Skeleton loading
- ✅ Analityka gtag

## Wymagane zmienne środowiskowe

Utwórz plik `.env.local`:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
```
