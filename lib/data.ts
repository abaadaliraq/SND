export type Category = {
  slug: string;
  name: string;
  icon: string;
  group: string;
};

export const categories: Category[] = [
  { slug: "builder", name: "عامل بناء", icon: "🧱", group: "إنشائية وميدانية" },
  { slug: "electrician", name: "كهربائي", icon: "💡", group: "إنشائية وميدانية" },
  { slug: "plumber", name: "سباك", icon: "🚰", group: "إنشائية وميدانية" },
  { slug: "carpenter", name: "نجار", icon: "🪚", group: "إنشائية وميدانية" },
  { slug: "painter", name: "صباغ", icon: "🎨", group: "إنشائية وميدانية" },
  { slug: "blacksmith", name: "حداد", icon: "🔩", group: "إنشائية وميدانية" },

  { slug: "loader", name: "حمال", icon: "📦", group: "نقل وتحميل" },
  { slug: "moving-helper", name: "كية حمل", icon: "🚚", group: "نقل وتحميل" },
  { slug: "furniture-mover", name: "نقل أثاث", icon: "🛋️", group: "نقل وتحميل" },
  { slug: "pickup-driver", name: "سائق بيك أب", icon: "🛻", group: "نقل وتحميل" },
  { slug: "tuk-tuk", name: "توك توك", icon: "🛺", group: "نقل وتحميل" },
  { slug: "crane", name: "كرين", icon: "🏗️", group: "نقل وتحميل" },

  { slug: "barista", name: "باريستا", icon: "☕", group: "مطاعم وخدمة" },
  { slug: "restaurant-captain", name: "كابتن مطعم", icon: "🍽️", group: "مطاعم وخدمة" },
  { slug: "waiter", name: "نادل", icon: "🧾", group: "مطاعم وخدمة" },
  { slug: "kitchen-worker", name: "عامل مطبخ", icon: "👨‍🍳", group: "مطاعم وخدمة" },
  { slug: "assistant-chef", name: "مساعد شيف", icon: "🥘", group: "مطاعم وخدمة" },

  { slug: "cleaner", name: "منظف", icon: "🧼", group: "خدمات عامة" },
  { slug: "security-guard", name: "حارس", icon: "🛡️", group: "خدمات عامة" },
  { slug: "warehouse-worker", name: "عامل مخزن", icon: "🏬", group: "خدمات عامة" },
  { slug: "delivery-rep", name: "مندوب توصيل", icon: "📍", group: "خدمات عامة" },
  { slug: "daily-helper", name: "مساعد يومي", icon: "🤝", group: "خدمات عامة" },
];

export const requestTypes = [
  "طلب فوري - الآن",
  "طلب خلال اليوم",
  "طلب ليوم غد",
  "عامل ثابت - أجر يومي",
  "عامل ثابت - أجر أسبوعي",
  "عامل ثابت - أجر شهري",
] as const;

export const availabilityModes = [
  { value: "now", label: "متاح الآن" },
  { value: "today", label: "متاح اليوم" },
  { value: "24h", label: "متاح 24 ساعة" },
  { value: "hours_range", label: "من ساعة إلى ساعة" },
  { value: "date_range", label: "من تاريخ إلى تاريخ" },
  { value: "custom_days", label: "أيام محددة" },
] as const;

export const weekDays = [
  "السبت",
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
] as const;

export const iraqCities = [
  "بغداد",
  "البصرة",
  "الموصل",
  "كربلاء",
  "النجف",
  "ديالى",
  "الأنبار",
  "بابل",
  "واسط",
  "الناصرية",
  "ميسان",
  "أربيل",
  "السليمانية",
  "دهوك",
  "كركوك",
] as const;

export const areaSuggestions = [
  "الكرادة",
  "المنصور",
  "الجادرية",
  "الزعفرانية",
  "الدورة",
  "الأعظمية",
  "مدينة الصدر",
  "شارع فلسطين",
  "العامرية",
  "أبو نؤاس",
];

export const primaryJobSuggestions = [
  "نجار أبواب وغرف نوم",
  "كهربائي منازل",
  "سباك صحي",
  "حمال ونقل أثاث",
  "سائق توك توك مشاوير",
  "كابتن مطعم",
  "باريستا",
  "منظف منازل",
  "حارس بناية",
  "عامل مطبخ",
];

export function getCategoryBySlug(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function getCategoryName(slug: string) {
  return getCategoryBySlug(slug)?.name || slug;
}

export function getCategoryNames(slugs: string[]) {
  return slugs.map(getCategoryName);
}

export function groupCategories() {
  const map = new Map<string, Category[]>();

  for (const category of categories) {
    if (!map.has(category.group)) {
      map.set(category.group, []);
    }
    map.get(category.group)!.push(category);
  }

  return Array.from(map.entries()).map(([group, items]) => ({
    group,
    items,
  }));
}

export function getAvailabilityLabel(worker: {
  is_available?: boolean | null;
  availability_mode?: string | null;
  available_from_date?: string | null;
  available_to_date?: string | null;
  available_from_time?: string | null;
  available_to_time?: string | null;
  available_days?: string[] | null;
  busy_until?: string | null;
}) {
  if (!worker.is_available) {
    if (worker.busy_until) {
      return "مشغول حالياً";
    }
    return "غير متاح";
  }

  switch (worker.availability_mode) {
    case "now":
      return "متاح الآن";
    case "today":
      return "متاح اليوم";
    case "24h":
      return "متاح 24 ساعة";
    case "hours_range":
      return worker.available_from_time && worker.available_to_time
        ? `من ${worker.available_from_time} إلى ${worker.available_to_time}`
        : "متاح بساعات محددة";
    case "date_range":
      return worker.available_from_date && worker.available_to_date
        ? `من ${worker.available_from_date} إلى ${worker.available_to_date}`
        : "متاح بفترة محددة";
    case "custom_days":
      return worker.available_days?.length
        ? `الأيام: ${worker.available_days.join(" - ")}`
        : "أيام محددة";
    default:
      return "متاح";
  }
}