import Link from "next/link";

export const metadata = {
  title: "سياسة الخصوصية | SND",
  description: "سياسة الخصوصية الخاصة بمنصة SND",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            سياسة الخصوصية
          </div>

          <h1 className="text-3xl font-bold md:text-5xl">سياسة الخصوصية</h1>

          <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
            توضح هذه الصفحة كيفية جمع واستخدام وحماية البيانات داخل منصة SND.
          </p>
        </div>

        <section className="rounded-[32px] border border-white/10 bg-[#151515] p-6 shadow-2xl">
          <div className="space-y-8 text-right">
            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">1) مقدمة</h2>
              <p className="mt-3 leading-8 text-white/80">
                تلتزم منصة SND بحماية خصوصية المستخدمين، سواء كانوا عمالًا مسجلين
                في المنصة أو أشخاصًا يطلبون خدمات وعمالًا عبرها. باستخدامك
                للمنصة، فإنك توافق على جمع واستخدام البيانات وفقًا لهذه السياسة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">2) البيانات التي نجمعها</h2>
              <p className="mt-3 leading-8 text-white/80">
                قد تجمع المنصة بعض البيانات التي يقدمها المستخدم بشكل مباشر، مثل:
                الاسم، رقم الهاتف، المدينة، المنطقة، نوع العمل، التخصصات،
                تفاصيل الطلب، أوقات التوفر، وأي معلومات إضافية يضيفها المستخدم
                داخل المنصة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">3) طريقة استخدام البيانات</h2>
              <p className="mt-3 leading-8 text-white/80">
                تستخدم منصة SND البيانات لتشغيل المنصة وتحسينها، ومطابقة العمال
                مع الطلبات، وعرض المعلومات الأساسية داخل بطاقات العامل، وتسهيل
                التواصل بين طرفي الخدمة، وتحليل استخدام المنصة وتطوير الأداء
                وتجربة المستخدم.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">4) مشاركة البيانات</h2>
              <p className="mt-3 leading-8 text-white/80">
                لا تبيع منصة SND بيانات المستخدمين. ومع ذلك، قد يتم إظهار بعض
                المعلومات الأساسية داخل التطبيق عند الحاجة لتقديم الخدمة، مثل
                اسم العامل، تخصصه، المدينة، المنطقة، وحالة التوفر. كما قد تتم
                مشاركة المعلومات الضرورية بين العامل وصاحب الطلب لأغراض تنفيذ
                الخدمة فقط.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">5) حماية البيانات</h2>
              <p className="mt-3 leading-8 text-white/80">
                تسعى منصة SND لاتخاذ إجراءات تقنية وتنظيمية مناسبة لحماية
                البيانات من الوصول غير المصرح به أو الاستخدام الخاطئ أو الفقدان،
                إلا أنه لا يمكن ضمان الحماية المطلقة لأي نظام إلكتروني بشكل كامل.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">6) مسؤولية المستخدم عن البيانات</h2>
              <p className="mt-3 leading-8 text-white/80">
                المستخدم مسؤول عن صحة البيانات التي يقدمها داخل المنصة. وأي
                معلومات غير صحيحة أو مضللة أو ناقصة قد تؤدي إلى تعطيل الخدمة أو
                إيقاف الحساب أو حذف البيانات عند الحاجة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">7) ملفات الارتباط والتقنيات المشابهة</h2>
              <p className="mt-3 leading-8 text-white/80">
                قد تستخدم المنصة تقنيات أساسية لتحسين الأداء وتجربة الاستخدام،
                مثل حفظ بعض التفضيلات أو الجلسات أو البيانات التقنية اللازمة
                لعمل المنصة بشكل صحيح.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">8) الاحتفاظ بالبيانات</h2>
              <p className="mt-3 leading-8 text-white/80">
                تحتفظ منصة SND بالبيانات لمدة لازمة لتشغيل الخدمة وإدارة الطلبات
                وتحسين النظام، أو وفقًا لما تقتضيه المتطلبات التشغيلية أو
                القانونية، ثم قد يتم حذفها أو إخفاؤها أو تقليلها عند عدم الحاجة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">9) التعديلات على السياسة</h2>
              <p className="mt-3 leading-8 text-white/80">
                يحق لمنصة SND تعديل سياسة الخصوصية في أي وقت. ويعد استمرار
                المستخدم في استخدام المنصة بعد نشر التعديلات موافقة ضمنية عليها.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">10) التواصل</h2>
              <p className="mt-3 leading-8 text-white/80">
                في حال وجود استفسار يتعلق بالخصوصية أو البيانات أو طلب تعديل أو
                حذف المعلومات، يمكن التواصل مع إدارة المنصة عبر وسائل التواصل
                أو البريد الإلكتروني المعتمد للمنصة.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <Link href="/terms" className="app-btn-secondary">
              قراءة الشروط والأحكام
            </Link>

            <Link href="/" className="app-btn-primary">
              الرجوع للرئيسية
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}