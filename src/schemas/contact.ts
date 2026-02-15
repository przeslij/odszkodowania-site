// src/schemas/contact.ts
import { z } from 'zod'

export const contactFormSchemaRefined = z
  .object({
    firstName: z
      .string({
        required_error: 'Podaj imię',
        invalid_type_error: 'Podaj imię',
      })
      .min(2, 'Imię musi mieć co najmniej 2 znaki'),

    lastName: z
      .string({
        required_error: 'Podaj nazwisko',
        invalid_type_error: 'Podaj nazwisko',
      })
      .min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),

    phone: z
      .string({
        required_error: 'Podaj numer telefonu',
        invalid_type_error: 'Podaj numer telefonu',
      })
      .min(7, 'Podaj poprawny numer telefonu'),

    email: z
      .string({
        required_error: 'Podaj adres e-mail',
        invalid_type_error: 'Podaj adres e-mail',
      })
      .email('Podaj poprawny adres e-mail'),

    postalCode: z
      .string({
        required_error: 'Podaj kod pocztowy',
        invalid_type_error: 'Podaj kod pocztowy',
      })
      .regex(/^\d{2}-\d{3}$/, 'Wprowadź kod pocztowy w formacie 00-000'),

    city: z
      .string({
        required_error: 'Podaj miejscowość',
        invalid_type_error: 'Podaj miejscowość',
      })
      .min(2, 'Podaj miejscowość'),

    infrastructure: z
      .array(
        z.enum(['slup', 'gaz', 'ropa', 'inne'], {
          invalid_type_error: 'Wybierz rodzaj infrastruktury',
        }),
        {
          required_error: 'Wybierz rodzaj infrastruktury',
          invalid_type_error: 'Wybierz rodzaj infrastruktury',
        },
      )
      .min(1, 'Wybierz co najmniej jeden rodzaj infrastruktury'),

    // Te pola są wymagane warunkowo (w superRefine),
    // dlatego dopuszczamy undefined/null, żeby nie było
    // domyślnego "Expected string, received null".
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

    marketingConsent: z.boolean({
      required_error: 'Zaznacz zgodę na telefoniczny kontakt marketingowy',
      invalid_type_error: 'Zaznacz zgodę na telefoniczny kontakt marketingowy',
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

    // Wymuszamy zaznaczenie zgody marketingowej
    if (data.marketingConsent !== true) {
      ctx.addIssue({
        path: ['marketingConsent'],
        code: z.ZodIssueCode.custom,
        message: 'Zaznacz zgodę na telefoniczny kontakt marketingowy',
      })
    }
  })

export type ContactFormData = z.infer<typeof contactFormSchemaRefined>
