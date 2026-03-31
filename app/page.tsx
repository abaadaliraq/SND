import Link from "next/link";
import { groupCategories, getAvailabilityLabel } from "@/lib/data";
import { getTopRequestedWorkerThisMonth, getWorkers } from "@/lib/db/workers";
const groups = groupCategories();

const heroSlides = [
  {
    id: 1,
    title: "احصل على العامل المناسب بسرعة",
    subtitle: "اختيار واضح، تنفيذ أسرع، وتجربة بدون تعقيد.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero_mbugkk",
  },
  {
    id: 2,
    title: "اطلب خدمتك بدون فوضى",
    subtitle: "تصنيف واضح يساعدك توصل للي تحتاجه خلال ثواني.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero-3_whqjwp",
  },
  {
    id: 3,
    title: "كل شيء مرتب أمامك",
    subtitle: "عرض بسيط يختصر عليك الوقت ويخليك تقرر بسرعة.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero-2_ndwuy2",
  },
  {
    id: 4,
    title: "اختيار أسرع وتجربة أوضح",
    subtitle: "واجهة مصممة حتى توصلك للعامل المناسب بدون تضييع وقت.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero-5_xulx4i",
  },
];

export default async function SndLandingPage() {
  const [topWorker, workers] = await Promise.all([
    getTopRequestedWorkerThisMonth(),
    getWorkers(),
  ]);

  const featuredWorkers = workers.slice(0, 4);
  const compactGroups = groups.slice(0, 4);

  return (
    <main className="snd-shell">
      <div className="snd-bg-orb snd-bg-orb-1" />
      <div className="snd-bg-orb snd-bg-orb-2" />

      <section className="snd-container pt-4 md:pt-6">
        <header className="topbar fade-up">
          <Link href="/" className="brand-wrap" aria-label="SND Home">
            <div className="brand-logo">S</div>

            <div className="brand-copy">
              <strong>SND</strong>
              <span>خدمات وعمال عند الطلب</span>
            </div>
          </Link>

          <nav className="topbar-links">
            <Link href="/workers">العمال</Link>
            <Link href="/request-worker">الطلبات</Link>
            <Link href="/register-worker">التسجيل</Link>
          </nav>

          <div className="topbar-actions">
            <Link href="/register-worker" className="app-btn-secondary-sm">
              سجل كعامل
            </Link>
            <Link href="/request-worker" className="app-btn-primary-sm">
              اطلب الآن
            </Link>
          </div>
        </header>
      </section>

      <section className="snd-container hero-grid">
        <div className="hero-copy fade-up">
          <div className="hero-badge">خدمة أسرع وتنظيم أوضح</div>

          <h1 className="hero-title">
            اطلب العامل المناسب
            <span>بخطوات أسرع ونتيجة أوضح</span>
          </h1>

          <p className="hero-text">
            المنصة تساعدك على الوصول إلى العامل المناسب بدون تشتت، مع عرض أوضح
            للتخصصات وإجراءات مختصرة تسهّل عليك الطلب من أول مرة.
          </p>

          <div className="hero-actions">
            <Link href="/request-worker" className="app-btn-primary">
              اطلب عامل
            </Link>
            <Link href="/workers" className="app-btn-secondary">
              تصفح العمال
            </Link>
          </div>

          <div className="hero-mini-stats">
            <div className="mini-stat">
              <span>وصول أسرع</span>
              <strong>طلب واضح</strong>
            </div>
            <div className="mini-stat">
              <span>عرض مرتب</span>
              <strong>خيارات أقرب</strong>
            </div>
            <div className="mini-stat">
              <span>تجربة أفضل</span>
              <strong>على الهاتف</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual fade-up delay-1">
          <div className="hero-slider-shell">
            <div className="hero-slider-stack">
              {heroSlides.map((slide, index) => (
                <article
                  key={slide.id}
                  className="hero-slider-slide"
                  style={{ animationDelay: `${index * 4}s` }}
                >
                  <div
                    className="hero-slider-image"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.14), rgba(0,0,0,0.74)), url("${slide.image}")`,
                    }}
                  >
                    <div className="hero-slider-overlay">
                      <div className="hero-featured-chip">SND UI</div>

                      <div className="hero-slider-copy">
                        <p>{slide.title}</p>
                        <span>{slide.subtitle}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="hero-slider-dots" aria-hidden="true">
              {heroSlides.map((slide, index) => (
                <span
                  key={slide.id}
                  className="hero-slider-dot"
                  style={{ animationDelay: `${index * 4}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="snd-container quick-panel-wrap">
        <div className="quick-panel fade-up delay-2">
          <div className="section-head compact">
            <div>
              <span className="eyebrow">لمحة سريعة</span>
              <h2>أهم الإجراءات أولًا</h2>
            </div>

            <Link href="/request-worker" className="section-link">
              فتح الطلب →
            </Link>
          </div>

          <div className="quick-grid">
            <Link href="/request-worker" className="quick-card">
              <div className="quick-icon">📦</div>
              <div>
                <h3>طلب جديد</h3>
                <p>ابدأ الطلب بخطوات قصيرة وواضحة.</p>
              </div>
            </Link>

            <Link href="/workers" className="quick-card">
              <div className="quick-icon">👷</div>
              <div>
                <h3>البحث عن عامل</h3>
                <p>عرض مباشر للتخصصات والجاهزية.</p>
              </div>
            </Link>

            <Link href="/register-worker" className="quick-card">
              <div className="quick-icon">🪪</div>
              <div>
                <h3>تسجيل عامل</h3>
                <p>إنشاء ملف واضح بدل إدخال عشوائي.</p>
              </div>
            </Link>

            <Link href="/admin/requests" className="quick-card">
              <div className="quick-icon">📋</div>
              <div>
                <h3>إدارة الطلبات</h3>
                <p>متابعة أسرع للحالات والحركة.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="snd-container compact-sections">
        <div className="section-head fade-up">
          <div>
            <span className="eyebrow">التصنيفات</span>
            <h2>أقسام الخدمة</h2>
          </div>
          <p>
            بدل القوائم الطويلة، صار العرض مضغوطًا وواضحًا. وعلى الهاتف تصير
            الكارتات اثنين جنب بعض حتى الصفحة ما تصير مملة.
          </p>
        </div>

        <div className="category-grid">
          {compactGroups.map((group, index) => (
            <article
              key={group.group}
              className={`category-panel fade-up delay-${(index % 3) + 1}`}
            >
              <div className="category-head">
                <h3>{group.group}</h3>
                <span>{group.items.length} تخصص</span>
              </div>

              <div className="category-mini-grid">
                {group.items.slice(0, 4).map((item) => (
                  <div key={item.slug} className="category-mini-card">
                    <div className="category-mini-icon">{item.icon}</div>
                    <strong>{item.name}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="snd-container spotlight-wrap">
        <div className="spotlight-grid">
          <div className="spotlight-main fade-up">
            <div className="section-head compact">
              <div>
                <span className="eyebrow">الأكثر طلبًا</span>
                <h2>عامل الشهر</h2>
              </div>
            </div>

            {topWorker ? (
              <div className="top-worker-card">
                <div className="top-worker-head">
                  <div className="top-worker-logo">SND</div>

                  <div className="top-worker-text">
                    <span>TOP REQUESTED</span>
                    <strong>{topWorker.worker_code}</strong>
                  </div>
                </div>

                <div className="top-worker-body">
                  <h3>{topWorker.name}</h3>
                  <p>{topWorker.primary_job_title}</p>
                </div>

                <div className="top-worker-stats">
                  <div className="top-stat-box">
                    <span>طلبات الشهر</span>
                    <strong>{topWorker.monthly_requests_count || 0}</strong>
                  </div>
                  <div className="top-stat-box">
                    <span>الحالة</span>
                    <strong>{getAvailabilityLabel(topWorker)}</strong>
                  </div>
                </div>

                <div className="top-worker-actions">
                  <Link
                    href={`/request-worker?workerId=${topWorker.id}`}
                    className="app-btn-primary-sm"
                  >
                    اطلبه الآن
                  </Link>
                  <Link
                    href={`/worker/${topWorker.id}`}
                    className="app-btn-secondary-sm"
                  >
                    التفاصيل
                  </Link>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                لا يوجد عامل متصدر هذا الشهر بعد.
              </div>
            )}
          </div>

          <div className="spotlight-side fade-up delay-1">
            <div className="section-head compact">
              <div>
                <span className="eyebrow">مميزون</span>
                <h2>عمال مختارون</h2>
              </div>
            </div>

            <div className="workers-grid-compact">
              {featuredWorkers.map((worker) => (
                <article key={worker.id} className="worker-compact-card">
                  <div className="worker-compact-top">
                    <div className="worker-compact-logo">S</div>
                    <span>{worker.worker_code}</span>
                  </div>

                  <div className="worker-compact-body">
                    <h3>{worker.name}</h3>
                    <p>{worker.primary_job_title}</p>
                  </div>

                  <div className="worker-compact-meta">
                    <div>
                      <small>المدينة</small>
                      <strong>{worker.city || "غير محددة"}</strong>
                    </div>
                    <div>
                      <small>التوفر</small>
                      <strong>{getAvailabilityLabel(worker)}</strong>
                    </div>
                  </div>

                  <div className="worker-compact-actions">
                    <Link
                      href={`/request-worker?workerId=${worker.id}`}
                      className="app-btn-primary-sm"
                    >
                      طلب
                    </Link>
                    <Link
                      href={`/worker/${worker.id}`}
                      className="app-btn-secondary-sm"
                    >
                      عرض
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}