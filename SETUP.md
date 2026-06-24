# הקמת E.K.PACK — הוראות

## 1. משתני סביבה

העתק את `.env.local.example` ל-`.env.local` ומלא את הערכים:

```bash
cp .env.local.example .env.local
```

| משתנה | מאיפה לקחת |
|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role (**סודי!**) |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | מספר WhatsApp בפורמט 972XXXXXXXXX |

## 2. הקמת מסד הנתונים

1. היכנס ל-Supabase Dashboard של הפרויקט
2. SQL Editor → New query
3. הדבק את כל התוכן של [`supabase/schema.sql`](supabase/schema.sql) והרץ
4. זה ייצור את כל הטבלאות, ה-RLS, ויזרע את 7 השירותים

## 3. Storage bucket למדיה

ב-Supabase → Storage:
1. צור bucket בשם `media`, סמן אותו **Public**
2. (אופציונלי) הגדר מדיניות גודל קובץ מקסימלי

## 4. משתמש אדמין יחיד

ב-Supabase → Authentication → Users → Add user:
- הזן אימייל וסיסמה למנהל
- זה המשתמש היחיד שיוכל להיכנס ל-`/admin`

## 5. הרצה מקומית

```bash
npm run dev
```

האתר יעלה ב-http://localhost:3000

## 6. פרסום ל-Vercel

1. חבר את ריפו ה-GitHub ב-vercel.com
2. הוסף את כל משתני הסביבה ב-Vercel → Settings → Environment Variables
3. Deploy
