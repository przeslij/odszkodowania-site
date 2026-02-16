// src/schemas/contact.ts
import { z } from 'zod'

// Eksportujemy typ infrastruktury dla użycia w komponentach
export const INFRA_TYPES = ['slup', 'gaz', 'ropa', 'inne'] as const
export type InfraType = (typeof INFRA_TYPES)[number]

// Regex dla liter (polskie znaki + spacje + myślniki + apostrof dla nazwisk typu O'Connor)
const NAME_REGEX = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/

export const contactFormSchemaRefined = z
  .object({
    firstName: z
      .string({
        required_error: 'Podaj imię',
        invalid_type_error: 'Podaj imię',
      })
      .min(2, 'Imię musi mieć co najmniej 2 znaki')
      .max(50, 'Imię jest zbyt długie')
      .regex(
        NAME_REGEX,
        'Imię może zawierać tylko litery, spacje i myślniki'
      ),

    lastName: z
      .string({
        required_error: 'Podaj nazwisko',
        invalid_type_error: 'Podaj nazwisko',
      })
      .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
      .max(50, 'Nazwisko jest zbyt długie')
      .regex(
        NAME_REGEX,
        'Nazwisko może zawierać tylko litery, spacje i myślniki'
      ),

    phone: z
      .string({
        required_error: 'Podaj numer telefonu',
        invalid_type_error: 'Podaj numer telefonu',
      })
      .min(9, 'Numer telefonu jest zbyt krótki')
      .max(15, 'Numer telefonu jest zbyt długi')
      .regex(/^[\d\s\-\+\(\)]+$/, 'Numer zawiera niedozwolone znaki'),

    email: z
      .string({
        required_error: 'Podaj adres e-mail',
        invalid_type_error: 'Podaj adres e-mail',
      })
      .email('Podaj poprawny adres e-mail')
      .max(100, 'Adres e-mail jest zbyt długi'),

    // Kod pocztowy: albo pełny format 00-000, albo pusty string (dla resetu/początkowego stanu)
    postalCode: z
      .union([
        z.string().regex(/^\d{2}-\d{3}$/, 'Wprowadź kod pocztowy w formacie 00-000'),
        z.literal(''),
      ], {
        errorMap: () => ({ message: 'Wprowadź kod pocztowy w formacie 00-000' }),
      }),

    city: z
      .string({
        required_error: 'Podaj miejscowość',
        invalid_type_error: 'Podaj miejscowość',
      })
      .min(2, 'Podaj miejscowość')
      .max(100, 'Nazwa miejscowości jest zbyt długa')
      .regex(
        NAME_REGEX,
        'Nazwa miejscowości może zawierać tylko litery'
      ),

    infrastructure: z
      .array(z.enum(INFRA_TYPES), {
        required_error: 'Wybierz rodzaj infrastruktury',
        invalid_type_error: 'Wybierz rodzaj infrastruktury',
      })
      .min(1, 'Wybierz co najmniej jeden rodzaj infrastruktury'),

    // Pola warunkowe - wymagane tylko gdy wybrano odpowiednią infrastrukturę
    slupParams: z
      .string({
        invalid_type_error: 'Wybierz parametry techniczne słupa',
      })
      .optional()
      .nullable(),

    gazParams: z
      .string({
        invalid_type_error: 'Wybierz parametry techniczne gazociągu',
      })
      .optional()
      .nullable(),

    status: z
      .enum(['existing', 'planned', 'modernization'], {
        invalid_type_error: 'Wybierz status urządzenia',
      })
      .optional()
      .nullable(),

    hasKW: z
      .enum(['yes', 'no'], {
        invalid_type_error: 'Wybierz odpowiedź dotyczącą księgi wieczystej',
      })
      .optional()
      .nullable(),

    marketingConsent: z.literal(true, {
      errorMap: () => ({
        message: 'Zaznacz zgodę na telefoniczny kontakt marketingowy',
      }),
    }),

    captchaToken: z
      .string({
        required_error: 'Potwierdź, że nie jesteś robotem',
        invalid_type_error: 'Potwierdź, że nie jesteś robotem',
      })
      .min(1, 'Potwierdź, że nie jesteś robotem'),
  })
  .superRefine((data, ctx) => {
    const infra = data.infrastructure ?? []

    // Parametry słupa wymagane tylko, jeśli wybrano słup
    if (infra.includes('slup') && !data.slupParams) {
      ctx.addIssue({
        path: ['slupParams'],
        code: z.ZodIssueCode.custom,
        message: 'Wybierz parametry techniczne słupa',
      })
    }

    // Parametry gazociągu wymagane tylko, jeśli wybrano gaz
    if (infra.includes('gaz') && !data.gazParams) {
      ctx.addIssue({
        path: ['gazParams'],
        code: z.ZodIssueCode.custom,
        message: 'Wybierz parametry techniczne gazociągu',
      })
    }

    // Status i KW wymagane, gdy wybrano jakąkolwiek infrastrukturę
    if (infra.length > 0 && !data.status) {
      ctx.addIssue({
        path: ['status'],
        code: z.ZodIssueCode.custom,
        message: 'Wybierz status urządzenia',
      })
    }

    if (infra.length > 0 && !data.hasKW) {
      ctx.addIssue({
        path: ['hasKW'],
        code: z.ZodIssueCode.custom,
        message: 'Wybierz odpowiedź dotyczącą księgi wieczystej',
      })
    }

    // Kod pocztowy wymagany przy submit (walidacja warunkowa)
    if (data.postalCode === '') {
      ctx.addIssue({
        path: ['postalCode'],
        code: z.ZodIssueCode.custom,
        message: 'Podaj kod pocztowy',
      })
    }
  })

export type ContactFormData = z.infer<typeof contactFormSchemaRefined>
