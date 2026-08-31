import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
export const DEFAULT_LANG: Lang = "ar";
const STORAGE_KEY = "sodfa.lang";

export type Localized = { ar: string; en: string };

const dict = {
  brand: { ar: "صدفة", en: "SODFA" },
  tagline: { ar: "إكسسوارات مميزة لموبايلك", en: "Premium Accessories for Your Everyday Life" },

  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.products": { ar: "كل المنتجات", en: "All Products" },
  "nav.categories": { ar: "الفئات", en: "Categories" },
  "nav.offers": { ar: "العروض", en: "Offers" },
  "nav.track": { ar: "تتبع طلبك", en: "Track Order" },
  "nav.about": { ar: "عن صدفة", en: "About" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact" },
  "nav.menu": { ar: "القائمة", en: "Menu" },
  "nav.cart": { ar: "السلة", en: "Cart" },
  "nav.search": { ar: "بحث", en: "Search" },
  "nav.whatsapp": { ar: "واتساب", en: "WhatsApp" },

  "home.categories.title": { ar: "تسوق حسب الفئة", en: "Shop by Category" },
  "home.categories.subtitle": { ar: "اختار الفئة المناسبة لك", en: "Pick the category that fits you" },
  "home.featured": { ar: "منتجات مختارة", en: "Featured Products" },
  "home.bestsellers": { ar: "الأكثر مبيعًا", en: "Best Sellers" },
  "home.new": { ar: "وصل حديثًا", en: "New Arrivals" },
  "home.trending": { ar: "الأكثر رواجًا", en: "Trending" },
  "home.offers": { ar: "عروض خاصة", en: "Special Offers" },
  "home.viewAll": { ar: "عرض الكل", en: "View all" },

  "finder.title": { ar: "اختار موبايلك", en: "Find the Perfect Accessory for Your Phone" },
  "finder.subtitle": {
    ar: "اختار الماركة ثم الموديل وهنعرضلك المنتجات المتوافقة فقط.",
    en: "Pick your brand and model — we'll show only compatible products.",
  },
  "finder.brand": { ar: "الماركة", en: "Brand" },
  "finder.model": { ar: "الموديل", en: "Model" },
  "finder.show": { ar: "اعرض المنتجات المتوافقة", en: "Show compatible products" },
  "finder.pickBrand": { ar: "اختار الماركة أولًا", en: "Select a brand first" },

  "product.addToCart": { ar: "أضف إلى السلة", en: "Add to Cart" },
  "product.buyNow": { ar: "اشترِ الآن", en: "Buy Now" },
  "product.quickView": { ar: "نظرة سريعة", en: "Quick View" },
  "product.model": { ar: "الموديل", en: "Model" },
  "product.color": { ar: "اللون", en: "Color" },
  "product.quantity": { ar: "الكمية", en: "Quantity" },
  "product.description": { ar: "الوصف", en: "Description" },
  "product.specs": { ar: "المواصفات", en: "Specifications" },
  "product.compatibility": { ar: "التوافق", en: "Compatibility" },
  "product.selectModel": { ar: "اختار الموديل", en: "Select model" },
  "product.selectColor": { ar: "اختار اللون", en: "Select color" },
  "product.added": { ar: "تمت الإضافة إلى السلة", en: "Added to cart" },
  "product.related": { ar: "منتجات مشابهة", en: "You may also like" },
  "product.save": { ar: "وفر", en: "Save" },

  "stock.in": { ar: "متوفر", en: "In Stock" },
  "stock.limited": { ar: "كمية محدودة", en: "Limited Stock" },
  "stock.out": { ar: "غير متوفر", en: "Out of Stock" },

  "filters.title": { ar: "الفلاتر", en: "Filters" },
  "filters.category": { ar: "الفئة", en: "Category" },
  "filters.brand": { ar: "ماركة الموبايل", en: "Phone Brand" },
  "filters.model": { ar: "موديل الموبايل", en: "Phone Model" },
  "filters.color": { ar: "اللون", en: "Color" },
  "filters.price": { ar: "السعر", en: "Price" },
  "filters.availability": { ar: "التوفر", en: "Availability" },
  "filters.offers": { ar: "العروض فقط", en: "Offers only" },
  "filters.new": { ar: "وصل حديثًا", en: "New arrivals" },
  "filters.inStockOnly": { ar: "المتوفر فقط", en: "In stock only" },
  "filters.clear": { ar: "مسح الفلاتر", en: "Clear filters" },
  "filters.apply": { ar: "عرض النتائج", en: "Show results" },
  "filters.all": { ar: "الكل", en: "All" },
  "filters.sort": { ar: "الترتيب", en: "Sort" },
  "sort.recommended": { ar: "المقترح", en: "Recommended" },
  "sort.priceAsc": { ar: "السعر: من الأقل", en: "Price: low to high" },
  "sort.priceDesc": { ar: "السعر: من الأعلى", en: "Price: high to low" },
  "sort.newest": { ar: "الأحدث", en: "Newest" },

  "search.placeholder": { ar: "ابحث عن منتج، فئة أو موديل موبايل…", en: "Search products, categories or phone models…" },
  "search.results": { ar: "نتائج البحث", en: "Search results" },
  "search.resultsFor": { ar: "نتائج البحث عن", en: "Results for" },
  "search.count": { ar: "منتج", en: "products" },

  "cart.title": { ar: "سلة التسوق", en: "Shopping Cart" },
  "cart.empty": { ar: "سلتك فارغة", en: "Your cart is empty" },
  "cart.emptyHint": { ar: "ابدأ التسوق واختار إكسسوارك المفضل.", en: "Start shopping and pick your favourite accessory." },
  "cart.remove": { ar: "حذف", en: "Remove" },
  "cart.subtotal": { ar: "الإجمالي الفرعي", en: "Subtotal" },
  "cart.shipping": { ar: "الشحن", en: "Shipping" },
  "cart.total": { ar: "الإجمالي", en: "Total" },
  "cart.checkout": { ar: "إتمام الطلب", en: "Proceed to Checkout" },
  "cart.continue": { ar: "متابعة التسوق", en: "Continue Shopping" },
  "cart.unitPrice": { ar: "سعر القطعة", en: "Unit price" },

  "checkout.title": { ar: "إتمام الطلب", en: "Checkout" },
  "checkout.info": { ar: "بيانات التوصيل", en: "Delivery Information" },
  "checkout.name": { ar: "الاسم بالكامل", en: "Full name" },
  "checkout.phone": { ar: "رقم الموبايل", en: "Mobile phone" },
  "checkout.governorate": { ar: "المحافظة", en: "Governorate" },
  "checkout.area": { ar: "المنطقة", en: "Area" },
  "checkout.address": { ar: "العنوان بالتفصيل", en: "Full address" },
  "checkout.building": { ar: "رقم العمارة", en: "Building" },
  "checkout.floor": { ar: "الدور", en: "Floor" },
  "checkout.apartment": { ar: "الشقة", en: "Apartment" },
  "checkout.notes": { ar: "ملاحظات التوصيل", en: "Delivery notes" },
  "checkout.optional": { ar: "اختياري", en: "optional" },
  "checkout.payment": { ar: "طريقة الدفع", en: "Payment Method" },
  "checkout.instapayFull": { ar: "الدفع بالكامل عبر InstaPay", en: "Pay Full Amount via InstaPay" },
  "checkout.cod": { ar: "الدفع عند الاستلام (بمقدم)", en: "Cash on Delivery (with deposit)" },
  "checkout.instapayNumber": { ar: "رقم InstaPay", en: "InstaPay number" },
  "checkout.copy": { ar: "نسخ", en: "Copy" },
  "checkout.copied": { ar: "تم النسخ", en: "Copied" },
  "checkout.deposit": { ar: "المقدم المطلوب", en: "Required deposit" },
  "checkout.remaining": { ar: "المتبقي عند الاستلام", en: "Remaining on delivery" },
  "checkout.payFull": { ar: "المبلغ المطلوب تحويله", en: "Amount to transfer" },
  "checkout.proof": { ar: "إثبات الدفع", en: "Payment proof" },
  "checkout.proofHint": {
    ar: "ارفع صورة إيصال التحويل (JPG أو PNG حتى 5 ميجا).",
    en: "Upload a screenshot of the transfer (JPG or PNG up to 5MB).",
  },
  "checkout.upload": { ar: "رفع صورة", en: "Upload image" },
  "checkout.replace": { ar: "استبدال", en: "Replace" },
  "checkout.removeProof": { ar: "إزالة", en: "Remove" },
  "checkout.submit": { ar: "تأكيد الطلب", en: "Place Order" },
  "checkout.summary": { ar: "ملخص الطلب", en: "Order Summary" },
  "checkout.savedInfo": { ar: "تم استرجاع بياناتك المحفوظة، يمكنك تعديلها.", en: "We restored your saved details — feel free to edit them." },
  "checkout.instapayHint": {
    ar: "حوّل المبلغ على رقم InstaPay التالي ثم ارفع إثبات الدفع.",
    en: "Transfer the amount to the InstaPay number below, then upload the proof.",
  },

  "validation.required": { ar: "هذا الحقل مطلوب", en: "This field is required" },
  "validation.phone": { ar: "رقم موبايل غير صحيح (11 رقم)", en: "Invalid mobile number (11 digits)" },
  "validation.proof": { ar: "من فضلك ارفع إثبات الدفع", en: "Please upload the payment proof" },
  "validation.fileType": { ar: "نوع الملف غير مدعوم", en: "Unsupported file type" },
  "validation.fileSize": { ar: "حجم الملف كبير جدًا", en: "File is too large" },
  "validation.fixErrors": { ar: "من فضلك راجع البيانات المطلوبة", en: "Please review the required fields" },

  "success.title": { ar: "تم استلام طلبك بنجاح", en: "Order Received Successfully" },
  "success.subtitle": {
    ar: "هنراجع الدفع ونتواصل معك لتأكيد الطلب.",
    en: "We'll verify your payment and contact you to confirm.",
  },
  "success.orderNumber": { ar: "رقم الطلب", en: "Order number" },
  "success.whatsapp": { ar: "تأكيد الطلب عبر واتساب", en: "Confirm Order via WhatsApp" },
  "success.customerInfo": { ar: "بيانات العميل", en: "Customer information" },

  "payment.method": { ar: "طريقة الدفع", en: "Payment method" },
  "payment.status": { ar: "حالة الدفع", en: "Payment status" },
  "payment.awaiting": { ar: "في انتظار مراجعة الدفع", en: "Awaiting Payment Verification" },
  "payment.verified": { ar: "تم تأكيد الدفع", en: "Payment verified" },

  "status.pending": { ar: "قيد الانتظار", en: "Pending" },
  "status.payment_verification": { ar: "مراجعة الدفع", en: "Payment Verification" },
  "status.confirmed": { ar: "تم التأكيد", en: "Confirmed" },
  "status.preparing": { ar: "جاري التجهيز", en: "Preparing" },
  "status.ready": { ar: "جاهز للتسليم", en: "Ready for Delivery" },
  "status.out_for_delivery": { ar: "خرج للتوصيل", en: "Out for Delivery" },
  "status.delivered": { ar: "تم التسليم", en: "Delivered" },
  "status.cancelled": { ar: "ملغي", en: "Cancelled" },

  "track.title": { ar: "تتبع طلبك", en: "Track Your Order" },
  "track.subtitle": { ar: "اكتب رقم الطلب لمتابعة حالته.", en: "Enter your order number to see its status." },
  "track.orderNumber": { ar: "رقم الطلب", en: "Order number" },
  "track.phone": { ar: "رقم الموبايل (اختياري)", en: "Mobile number (optional)" },
  "track.submit": { ar: "تتبع", en: "Track" },
  "track.notFound": { ar: "لم نجد طلبًا بهذا الرقم", en: "No order found with this number" },
  "track.notFoundHint": { ar: "راجع رقم الطلب أو تواصل معنا على واتساب.", en: "Check the number or contact us on WhatsApp." },
  "track.delivery": { ar: "بيانات التوصيل", en: "Delivery information" },

  "empty.products": { ar: "لا توجد منتجات", en: "No products found" },
  "empty.productsHint": { ar: "جرب تغيير الفلاتر أو البحث عن شيء آخر.", en: "Try changing the filters or searching for something else." },
  "empty.search": { ar: "لا توجد نتائج", en: "No results" },
  "empty.offers": { ar: "لا توجد عروض حاليًا", en: "No offers right now" },

  "error.title": { ar: "حصلت مشكلة", en: "Something went wrong" },
  "error.hint": { ar: "حاول مرة أخرى أو تواصل معنا.", en: "Please try again or contact us." },
  "error.retry": { ar: "إعادة المحاولة", en: "Try again" },
  "error.notFound": { ar: "الصفحة غير موجودة", en: "Page not found" },

  "common.currency": { ar: "ج.م", en: "EGP" },
  "common.free": { ar: "مجاني", en: "Free" },
  "common.close": { ar: "إغلاق", en: "Close" },
  "common.back": { ar: "رجوع", en: "Back" },
  "common.home": { ar: "الرئيسية", en: "Home" },
  "common.loading": { ar: "جاري التحميل…", en: "Loading…" },
  "common.new": { ar: "جديد", en: "New" },
  "common.bestseller": { ar: "الأكثر مبيعًا", en: "Best seller" },

  "footer.shop": { ar: "التسوق", en: "Shop" },
  "footer.help": { ar: "المساعدة", en: "Help" },
  "footer.company": { ar: "صدفة", en: "Company" },
  "footer.privacy": { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  "footer.terms": { ar: "الشروط والأحكام", en: "Terms & Conditions" },
  "footer.shipping": { ar: "الشحن والاسترجاع", en: "Shipping & Returns" },
  "footer.rights": { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  "footer.contactUs": { ar: "تواصل معنا", en: "Contact us" },
} satisfies Record<string, Localized>;

export type TKey = keyof typeof dict;

type I18nValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  isRTL: boolean;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
  tl: (value: Localized | undefined) => string;
  formatPrice: (value: number) => string;
  formatNumber: (value: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const t = (key: TKey) => dict[key][lang];
    const tl = (v: Localized | undefined) => (v ? v[lang] : "");
    const nf = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { maximumFractionDigits: 0 });
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isRTL: lang === "ar",
      setLang,
      t,
      tl,
      formatNumber: (v: number) => nf.format(v),
      formatPrice: (v: number) => `${nf.format(v)} ${dict["common.currency"][lang]}`,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
