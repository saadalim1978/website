# موقع شركة الحلول التنافسية

الموقع التعريفي لشركة **الحلول التنافسية — Competitive Solutions Co.**
الرابط: <https://solutions.competitive.sa>

- **التقنية:** Next.js (App Router) و TypeScript و Tailwind CSS، ويُصدَّر موقعاً ثابتاً (`output: 'export'`) إلى مجلد `out`
- **اللغات:** العربية (افتراضية، RTL) على `/ar/`، والإنجليزية (LTR) على `/en/`
- **الاستضافة:** Render (Static Site) مع نشر تلقائي من فرع `main`

---

## 1) التشغيل المحلي

المتطلبات: Node.js 22 أو أحدث (الإصدار محدد في ملف `.nvmrc`).

```bash
npm ci
npm run dev
```

بعدها افتح <http://localhost:3000/ar/>.

لبناء النسخة النهائية ومعاينتها:

```bash
npm run build
npx serve out
```

النسخة النهائية تُبنى في مجلد `out/`.

## 2) هيكل المشروع

| المسار | المحتوى |
|---|---|
| `config/site.ts` | **ملف الإعدادات الرئيسي:** بيانات الشركة، الهاتف، البريد، العنوان الوطني، روابط الخريطة، شارة لينوفو، الدومين |
| `content/ar.ts` | جميع النصوص العربية |
| `content/en.ts` | جميع النصوص الإنجليزية |
| `app/[locale]/...` | الصفحات: الرئيسية، من نحن، الخدمات، المنتجات، تواصل معنا |
| `app/not-found.tsx` | صفحة 404 ثنائية اللغة |
| `app/sitemap.ts` و `app/robots.ts` | ملفا `sitemap.xml` و `robots.txt` |
| `lib/seo.ts` | عناوين الصفحات ووصفها، Open Graph، وبيانات Schema.org (LocalBusiness) |
| `components/` | الهيدر والفوتر ونموذج التواصل وشارة الشريك |
| `public/` | الشعار (`logo.jpg`)، صورة المشاركة (`og.jpg`)، ومجلد `partners/` |
| `render.yaml` | إعدادات النشر على Render (Blueprint) |

## 3) تعديل النصوص والبيانات

- **النصوص:** عدّل `content/ar.ts` للعربي و `content/en.ts` للإنجليزي. يجب أن تبقى بنية الملفين متطابقة، وإلا سيظهر خطأ TypeScript وقت البناء، وهذا مقصود حتى لا تنسى ترجمة نص.
- **بيانات الشركة** (الهاتف، البريد، السجل التجاري، العنوان): من `config/site.ts`.
- **عناوين الصفحات ووصفها لمحركات البحث:** موجودة في `meta.pages` داخل ملفات المحتوى.
- **ألوان الهوية:** في أعلى `app/globals.css`، وهي مستخرجة من الشعار:

| اللون | القيمة | الاستخدام |
|---|---|---|
| الأسود | `#0A0A0A` | النصوص |
| الأخضر الداكن | `#1F6F4F` | اللون الأساسي (الأزرار والروابط) |
| الأخضر الزيتوني | `#587840` | لون ثانوي |
| الأصفر الذهبي | `#F8D858` | لمسات ولونيات |

- **الخريطة:** في `config/site.ts` غيّر `mapEmbedUrl` و `mapOpenUrl`. للحصول على رابط موقعك الدقيق:
  1. افتح موقعك في خرائط Google.
  2. اختر **مشاركة ← تضمين خريطة**.
  3. انسخ قيمة `src` فقط وضعها في `mapEmbedUrl`.
  4. ضع رابط المشاركة العادي في `mapOpenUrl`.

## 4) إضافة شارة شريك لينوفو الرسمية

الموقع لا يستخدم شعار Lenovo ولا صور منتجاتها. حالياً تظهر شارة نصية مؤقتة ("موزّع معتمد — Lenovo 360 Engage").

لإضافة الشارة الرسمية:

1. ضع ملف الشارة كما استلمته من بوابة Lenovo 360 في المجلد `public/partners/`، مثلاً: `public/partners/lenovo-360-badge.png`
2. افتح `config/site.ts` وعدّل السطر:
   ```ts
   lenovoBadge: "/partners/lenovo-360-badge.png",
   ```
3. ارفع التعديل إلى `main`، وسيُنشر تلقائياً.

ستظهر الشارة في شريط الشراكات بالصفحة الرئيسية وفي صفحة المنتجات والشراكات.

## 5) ربط نموذج التواصل بـ Formspree

النموذج يعمل بدون سيرفر، ويُرسل الرسائل إلى بريدك عبر [Formspree](https://formspree.io).

1. أنشئ حساباً في Formspree، ثم أنشئ نموذجاً جديداً (New Form) واختر البريد الذي تصله الرسائل.
2. انسخ معرّف النموذج. إذا كان الرابط `https://formspree.io/f/abcdwxyz` فالمعرّف هو `abcdwxyz`.
3. **محلياً:** انسخ `.env.example` إلى `.env.local` وضع المعرّف فيه:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz
   ```
4. **على Render:** افتح **Environment** في الخدمة، وأضف قيمة `NEXT_PUBLIC_FORMSPREE_ID`، ثم نفّذ **Manual Deploy ← Deploy latest commit**. يلزم إعادة النشر لأن القيمة تُدمج وقت البناء.
5. (اختياري) في إعدادات النموذج على Formspree، أضف `solutions.competitive.sa` إلى قائمة الدومينات المسموحة.

ما دام المعرّف غير مضاف، يعرض النموذج رسالة تطلب من الزائر التواصل بالبريد أو الهاتف.

> ملف `.env.local` مستثنى من Git، فلا ترفع أي مفاتيح للمستودع.

## 6) النشر على Render

### أ) إنشاء الخدمة من الـ Blueprint (مرة واحدة)

1. ادخل إلى <https://dashboard.render.com>.
2. اختر **New ← Blueprint**.
3. اربط حساب GitHub إن لم يكن مربوطاً، ثم اختر المستودع `saadalim1978/website`.
4. سيقرأ Render ملف `render.yaml` ويعرض خدمة واحدة: `competitive-solutions-website` من نوع Static Site.
5. سيطلب قيمة `NEXT_PUBLIC_FORMSPREE_ID`. ضع معرّف Formspree، أو اتركه فارغاً وأضفه لاحقاً.
6. اضغط **Apply** أو **Deploy Blueprint**، وانتظر انتهاء البناء.
7. سيعطيك Render عنواناً مثل `https://competitive-solutions-website.onrender.com`. افتحه وتأكد أن الموقع يعمل.

بعدها، كل `push` على فرع `main` يُنشر تلقائياً.

### ب) إضافة الدومين المخصص

ملف `render.yaml` يضيف الدومين `solutions.competitive.sa` تلقائياً. للتأكد:

1. افتح الخدمة في Render، ثم **Settings ← Custom Domains**.
2. إذا لم يظهر الدومين، اضغط **Add Custom Domain** واكتب `solutions.competitive.sa`.
3. سيعرض Render سجل DNS المطلوب، وعنوان الخدمة بصيغة `xxxx.onrender.com`.

### ج) سجل DNS

من لوحة التحكم في DNS لنطاق `competitive.sa` (عند مزوّد النطاق أو Cloudflare)، أضف هذا السجل:

| النوع | الاسم (Host) | القيمة (Target) | TTL |
|---|---|---|---|
| `CNAME` | `solutions` | `competitive-solutions-website.onrender.com` | Auto أو 3600 |

- استخدم عنوان `onrender.com` الخاص بخدمتك بالضبط كما يظهر في Render، فقد يختلف عن المثال.
- إذا كنت تستخدم **Cloudflare**، اجعل السجل **DNS only** (السحابة رمادية) حتى يكتمل التحقق وإصدار الشهادة.
- احذف أي سجل `A` أو `AAAA` أو `CNAME` قديم لنفس الاسم `solutions`.

### د) التحقق وتفعيل HTTPS

1. بعد إضافة السجل، ارجع إلى **Custom Domains** في Render واضغط **Verify**.
2. انتشار DNS يستغرق عادة من دقائق إلى ساعات قليلة. يمكنك التحقق بالأمر:
   ```bash
   nslookup solutions.competitive.sa
   ```
3. بعد نجاح التحقق، يصدر Render شهادة SSL مجانية (Let's Encrypt) تلقائياً، ويحوّل HTTP إلى HTTPS. لا يلزم أي إعداد إضافي.
4. افتح <https://solutions.competitive.sa> وتأكد من ظهور القفل في المتصفح.

## 7) محركات البحث (SEO)

- لكل صفحة عنوان ووصف باللغتين، مع روابط `hreflang` و `canonical`.
- `https://solutions.competitive.sa/sitemap.xml` و `/robots.txt` يُولَّدان تلقائياً.
- بيانات Schema.org من نوع `LocalBusiness` تتضمن العنوان الوطني والسجل التجاري.
- صورة المشاركة (Open Graph) هي `public/og.jpg`.
- بعد النشر، يُنصح بإضافة الموقع إلى [Google Search Console](https://search.google.com/search-console) وإرسال ملف الـ sitemap.

## 8) ملاحظات

- ملف الشعار الأصلي `logo.png.jpeg` بصيغة JPEG بخلفية بيضاء. إذا توفرت نسخة PNG شفافة أو SVG، استبدل `public/logo.jpg` و `public/logo-mark.png` بها لجودة أعلى.
- لا يحتوي الموقع على أرقام أو عملاء أو شهادات غير مؤكدة. أضف أي محتوى من هذا النوع فقط إذا كان موثّقاً.
