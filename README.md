# Digital Village — Frontend

React + Vite + Tailwind CSS ফ্রন্টএন্ড। ব্যাকেন্ড: `Village_Project` (FastAPI)।

## সেটআপ

```bash
npm install
npm run dev        # http://localhost:5173
```

ডেভেলপমেন্টে `/api` প্রক্সি হয়ে `http://127.0.0.1:8000` এ যায় (`vite.config.js`)।
প্রোডাকশনে `.env` এ `VITE_API_URL=https://your-api.example.com` দিন। ব্যাকেন্ডের `CORS_ORIGINS` এও এই ঠিকানা যোগ করতে হবে।

## অ্যাডমিন প্যানেল

`/admin` — শুধু অ্যাডমিন ও মডারেটর।

- ড্যাশবোর্ড, ইউজার (শুধু অ্যাডমিন), গ্রামের মানুষ, পরিবার, রক্তদাতা, যাকাত ও সাহায্য, সাহায্যের আবেদন, শিক্ষা, মসজিদ, প্রতিষ্ঠান, স্থান ও ম্যাপ, সংবাদ, ঘোষণা, জরুরি সেবা।
- নতুন মডিউল যোগ করতে `src/utils/adminConfig.js` এ একটা এন্ট্রি, `src/locales/*.admin.js` এ লেখা, আর `src/pages/admin/` এ ছোট একটা পেজ লাগে।

## কাঠামো বিষয়ক দ্রষ্টব্য

- `src/places/` ও `src/page/` পুরনো ডুপ্লিকেট ফোল্ডার। কোথাও ব্যবহার হয় না, মুছে ফেলা নিরাপদ।
- অনুবাদ: `src/locales/{bn,en}.js` + `*.pages.js` + `*.members.js` + `*.admin.js` একসাথে মেশে (`LanguageContext`)।

## বড় ডেটা ও পেজিনেশন

- মানুষ, পরিবার, রক্তদাতা ও বয়ানের তালিকা পাতা ধরে আসে (২০-২৪টি প্রতি পাতায়)। খোঁজও সার্ভারে হয়।
- অ্যাডমিন প্যানেলে সম্পর্কের ঘর (যেমন "পরিবার") টাইপ করে খুঁজে বাছাই করা যায়, পুরো তালিকা আনা হয় না।
- হুক: `src/hooks/usePagedList.js` (পাতা), `src/hooks/useDebouncedValue.js` (খোঁজের বিলম্ব)।
- কমপোনেন্ট: `Pagination`, `RelationPicker` (`src/components/common`)।
