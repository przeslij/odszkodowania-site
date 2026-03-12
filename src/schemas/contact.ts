// src/schemas/contact.ts
import { z } from 'zod'

export const INFRA_TYPES = ['slup', 'gaz', 'ropa', 'inne'] as const
export type InfraType = (typeof INFRA_TYPES)[number]

// Regex: polskie znaki + spacje + myślniki + apostrof (O'Connor, Nowak-Kowalska)
const NAME_REGEX = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/

// Centralized required messages — ułatwia i18n i spójność
const REQUIRED = {
  firstName: 'Podaj imię',
  lastName: 'Podaj nazwisko',
  phone: 'Podaj numer telefonu',
  email: 'Podaj adres e-mail',
  city: 'Podaj miejscowość',
} as const

export const contactFormSchemaRefined = z
  .object({
    firstName: z
      .string({
        required_error: REQUIRED.firstName,
        invalid_type_error: REQUIRED.firstName,
      })
      .trim()
      .min(2, 'Imię musi mieć co najmniej 2 znaki')
      .max(50, 'Imię jest zbyt długie')
      .regex(NAME_REGEX, 'Imię może zawierać tylko litery, spacje i myślniki'),

    lastName: z
      .string({
        required_error: REQUIRED.lastName,
        invalid_type_error: REQUIRED.lastName,
      })
      .trim()
      .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
      .max(50, 'Nazwisko jest zbyt długie')
      .regex(NAME_REGEX, 'Nazwisko może zawierać tylko litery, spacje i myślniki'),

    phone: z
      .string({
        required_error: REQUIRED.phone,
        invalid_type_error: REQUIRED.phone,
      })
      .trim()
      .min(9, 'Numer telefonu jest zbyt krótki')
      .max(15, 'Numer telefonu jest zbyt długi')
      .regex(/^[\d\s\-\+\(\)]+$/, 'Numer zawiera niedozwolone znaki'),

    email: z
      .string({
        required_error: REQUIRED.email,
        invalid_type_error: REQUIRED.email,
      })
      .trim()
      .email('Podaj poprawny adres e-mail')
      .max(100, 'Adres e-mail jest zbyt długi'),

    postalCode: z.union(
      [
        z
          .string()
          .trim()
          .regex(/^\d{2}-\d{3}$/, 'Wprowadź kod pocztowy w formacie 00-000'),
        z.literal(''),
      ],
      {
        errorMap: () => ({ message: 'Wprowadź kod pocztowy w formacie 00-000' }),
      },
    ),

    city: z
      .string({
        required_error: REQUIRED.city,
        invalid_type_error: REQUIRED.city,
      })
      .trim()
      .min(2, 'Podaj miejscowość')
      .max(100, 'Nazwa miejscowości jest zbyt długa')
      .regex(NAME_REGEX, 'Nazwa miejscowości może zawierać tylko litery'),

    infrastructure: z
      .array(z.enum(INFRA_TYPES), {
        required_error: 'Wybierz rodzaj infrastruktury',
        invalid_type_error: 'Wybierz rodzaj infrastruktury',
      })
      .min(1, 'Wybierz co najmniej jeden rodzaj infrastruktury'),

    slupParams: z
      .string({ invalid_type_error: 'Wybierz parametry techniczne słupa' })
      .trim()
      .max(200, 'Wartość jest zbyt długa')
      .optional()
      .nullable(),

    gazParams: z
      .string({ invalid_type_error: 'Wybierz parametry techniczne gazociągu' })
      .trim()
      .max(200, 'Wartość jest zbyt długa')
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

    marketingConsent: z
      .boolean({
        required_error: 'Zaznacz zgodę na kontakt marketingowy',
        invalid_type_error: 'Zaznacz zgodę na kontakt marketingowy',
      })
      .refine((val) => val === true, {
        message: 'Zaznacz zgodę na kontakt marketingowy',
      }),

    captchaToken: z
      .string({
        required_error: 'Potwierdź, że nie jesteś robotem',
        invalid_type_error: 'Potwierdź, że nie jesteś robotem',
      })
      .trim()
      .min(1, 'Potwierdź, że nie jesteś robotem'),
  })
  .superRefine((data, ctx) => {
    const infra = data.infrastructure ?? []

    if (infra.includes('slup') && !data.slupParams) {
      ctx.addIssue({
        path: ['slupParams'],
        code: z.ZodIssueCode.custom,
        message: 'Wybierz parametry techniczne słupa',
      })
    }

    if (infra.includes('gaz') && !data.gazParams) {
      ctx.addIssue({
        path: ['gazParams'],
        code: z.ZodIssueCode.custom,
        message: 'Wybierz parametry techniczne gazociągu',
      })
    }

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

    if (data.postalCode === '') {
      ctx.addIssue({
        path: ['postalCode'],
        code: z.ZodIssueCode.custom,
        message: 'Podaj kod pocztowy',
      })
    }
  })

export type ContactFormData = z.infer<typeof contactFormSchemaRefined>