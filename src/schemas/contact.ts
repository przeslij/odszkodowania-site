import { z } from 'zod'

// ============================================================
// ENTERPRISE-GRADE CONTACT FORM SCHEMA
// Ultra-Enterprise Polish UX with professional error messages
// ============================================================

// Phone regex - allows digits, spaces, dashes, plus, parentheses
const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/

// Postal code regex - Polish format XX-XXX
const postalCodeRegex = /^\d{2}-\d{3}$/

// Custom error map for enums to avoid "Invalid input" messages
const enumErrorMap = (fieldName: string) => ({
  errorMap: () => ({ message: fieldName }),
})

export const contactFormSchema = z.object({
  firstName: z
    .string({
      required_error: 'Imię jest wymagane',
      invalid_type_error: 'Imię musi być tekstem',
    })
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .max(50, 'Imię nie może przekraczać 50 znaków')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/, 'Imię może zawierać tylko litery'),

  lastName: z
    .string({
      required_error: 'Nazwisko jest wymagane',
      invalid_type_error: 'Nazwisko musi być tekstem',
    })
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .max(50, 'Nazwisko nie może przekraczać 50 znaków')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/, 'Nazwisko może zawierać tylko litery'),

  phone: z
    .string({
      required_error: 'Numer telefonu jest wymagany',
      invalid_type_error: 'Numer telefonu musi być tekstem',
    })
    .min(9, 'Numer telefonu musi mieć co najmniej 9 cyfr')
    .max(20, 'Numer telefonu jest za długi')
    .regex(phoneRegex, 'Wprowadź prawidłowy numer telefonu'),

  email: z
    .string({
      required_error: 'Adres e-mail jest wymagany',
      invalid_type_error: 'Adres e-mail musi być tekstem',
    })
    .min(1, 'Adres e-mail jest wymagany')
    .email('Wprowadź prawidłowy adres e-mail'),

  postalCode: z
    .string({
      required_error: 'Kod pocztowy jest wymagany',
      invalid_type_error: 'Kod pocztowy musi być tekstem',
    })
    .regex(postalCodeRegex, 'Wprowadź kod pocztowy w formacie 00-000'),

  city: z
    .string({
      required_error: 'Miejscowość jest wymagana',
      invalid_type_error: 'Miejscowość musi być tekstem',
    })
    .min(2, 'Nazwa miejscowości musi mieć co najmniej 2 znaki')
    .max(100, 'Nazwa miejscowości jest za długa'),

  infrastructure: z
    .array(z.string(), {
      required_error: 'Wybierz co najmniej jeden rodzaj infrastruktury',
      invalid_type_error: 'Nieprawidłowy format danych infrastruktury',
    })
    .min(1, 'Wybierz co najmniej jeden rodzaj infrastruktury'),

  slupParams: z.string().optional(),
  gazParams: z.string().optional(),

  status: z.enum(
    ['existing', 'planned', 'modernization'],
    enumErrorMap('Wybierz aktualny stan infrastruktury na działce.')
  ),

  hasKW: z.enum(
    ['yes', 'no'],
    enumErrorMap('Informacja o Księdze Wieczystej jest niezbędna do analizy.')
  ),

  marketingConsent: z.boolean({
    required_error: 'Wymagana jest zgoda na kontakt w celu przedstawienia analizy.',
    invalid_type_error: 'Nieprawidłowy format zgody',
  }).refine(
    (val) => val === true,
    { message: 'Wymagana jest zgoda na kontakt w celu przedstawienia analizy.' }
  ),

  captchaToken: z.string({
    required_error: 'Weryfikacja CAPTCHA jest wymagana',
    invalid_type_error: 'Nieprawidłowy token CAPTCHA',
  }).min(1, 'Weryfikacja CAPTCHA jest wymagana'),
})

// ============================================================
// CONDITIONAL VALIDATION with superRefine
// Ensures slupParams and gazParams are only validated when relevant
// ============================================================

export const contactFormSchemaRefined = contactFormSchema.superRefine((data, ctx) => {
  // Validate slupParams only when 'slup' is selected
  if (data.infrastructure.includes('slup')) {
    if (!data.slupParams || data.slupParams.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Prosimy o wybranie parametrów technicznych urządzenia.',
        path: ['slupParams'],
      })
    }
  }

  // Validate gazParams only when 'gaz' is selected
  if (data.infrastructure.includes('gaz')) {
    if (!data.gazParams || data.gazParams.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Prosimy o wybranie parametrów technicznych urządzenia.',
        path: ['gazParams'],
      })
    }
  }
})

export type ContactFormData = z.infer<typeof contactFormSchemaRefined>
