import Link from "next/link";

export const metadata = {
  title: "الشروط والأحكام | SND",
  description: "الشروط والأحكام الخاصة بمنصة SND",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            الشروط والأحكام
          </div>

          <h1 className="text-3xl font-bold md:text-5xl">الشروط والأحكام</h1>

          <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
            باستخدامك منصة SND فإنك تقر بقراءة هذه الشروط والأحكام والموافقة عليها.
          </p>
        </div>

        <section className="rounded-[32px] border border-white/10 bg-[#151515] p-6 shadow-2xl">
          <div className="space-y-8 text-right">
            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">1) تعريف الخدمة</h2>
              <p className="mt-3 leading-8 text-white/80">
                منصة SND هي منصة رقمية تهدف إلى تسهيل الربط بين أصحاب الطلبات
                والعمال أو مقدمي الخدمات في مجالات متعددة، مثل الخدمات الميدانية
                والنقل والمطاعم والخدمات العامة وغيرها.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">2) قبول الشروط</h2>
              <p className="mt-3 leading-8 text-white/80">
                بمجرد استخدام المنصة أو التسجيل فيها أو إرسال طلب أو إدخال بيانات
                عامل، فإن المستخدم يوافق على الالتزام بهذه الشروط. وإذا لم يوافق
                المستخدم، فعليه التوقف عن استخدام المنصة فورًا.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">3) صحة البيانات</h2>
              <p className="mt-3 leading-8 text-white/80">
                يلتزم المستخدم بإدخال معلومات صحيحة ودقيقة ومحدثة. وتحتفظ المنصة
                بحق تعديل أو تعليق أو حذف أي حساب أو طلب يحتوي على بيانات غير
                صحيحة أو مضللة أو مسيئة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">4) مسؤولية العامل</h2>
              <p className="mt-3 leading-8 text-white/80">
                العامل المسجل في المنصة مسؤول عن صحة مؤهلاته ومهنه وتوفره
                ومعلوماته الشخصية ومواعيده والتزامه بتنفيذ العمل وفق ما تم
                الاتفاق عليه مع صاحب الطلب.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">5) مسؤولية صاحب الطلب</h2>
              <p className="mt-3 leading-8 text-white/80">
                صاحب الطلب مسؤول عن تقديم وصف واضح ودقيق للخدمة المطلوبة وعدد
                العمال والموقع والوقت وطبيعة العمل، ويتحمل مسؤولية أي معلومات
                ناقصة أو غير صحيحة تؤثر على تنفيذ الخدمة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">6) دور المنصة</h2>
              <p className="mt-3 leading-8 text-white/80">
                دور منصة SND هو التسهيل والتنظيم والربط بين الأطراف. والمنصة لا
                تعد طرفًا مباشرًا في العلاقة التعاقدية النهائية بين العامل وصاحب
                الطلب، ما لم يذكر خلاف ذلك بشكل صريح داخل المنصة لاحقًا.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">7) حدود المسؤولية</h2>
              <p className="mt-3 leading-8 text-white/80">
                لا تتحمل منصة SND مسؤولية أي نزاع أو ضرر أو خسارة أو تأخير أو
                سوء تنفيذ ناتج عن التعامل المباشر بين العامل وصاحب الطلب، وتبقى
                المسؤولية الأساسية على الأطراف المعنية بالخدمة نفسها.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">8) الاستخدام المحظور</h2>
              <p className="mt-3 leading-8 text-white/80">
                يمنع استخدام المنصة لأي غرض غير مشروع أو مسيء أو احتيالي أو
                للتضليل أو انتحال الهوية أو نشر معلومات كاذبة أو محاولة الإضرار
                بالنظام أو بالمستخدمين الآخرين.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">9) تعديل أو إيقاف الحسابات والطلبات</h2>
              <p className="mt-3 leading-8 text-white/80">
                يحق لمنصة SND تعليق أو حذف أي حساب أو طلب أو بيانات إذا رأت أن
                هناك مخالفة لهذه الشروط أو إساءة استخدام أو خطرًا على المنصة أو
                المستخدمين أو سمعة الخدمة.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">10) التعديلات على الخدمة</h2>
              <p className="mt-3 leading-8 text-white/80">
                يحق للمنصة تعديل أو إيقاف أو تطوير أي جزء من الخدمة أو المزايا أو
                طرق العرض أو السياسات أو الشروط في أي وقت دون إشعار مسبق.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">11) الملكية والهوية</h2>
              <p className="mt-3 leading-8 text-white/80">
                جميع الحقوق المتعلقة باسم المنصة وهويتها وعناصرها البصرية
                وتصميمها ومحتواها تعود إلى منصة SND أو الجهات المالكة لها، ولا
                يجوز نسخها أو استخدامها بطريقة مضللة أو غير مصرح بها.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#ff9d4d]">12) التواصل والشكاوى</h2>
              <p className="mt-3 leading-8 text-white/80">
                في حال وجود شكوى أو بلاغ أو استفسار، يمكن التواصل مع إدارة
                المنصة عبر القنوات المعتمدة. وتحتفظ المنصة بحق مراجعة الشكاوى
                واتخاذ ما تراه مناسبًا وفقًا للسياسات الداخلية.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <Link href="/privacy" className="app-btn-secondary">
              قراءة سياسة الخصوصية
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