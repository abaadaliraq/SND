import Link from "next/link";
import { groupCategories, getAvailabilityLabel } from "@/lib/data";
import { getTopRequestedWorkerThisMonth, getWorkers } from "@/lib/db/workers";

const groups = groupCategories();

const heroSlides = [
  {
    id: 1,
    title: "اطلب العامل المناسب بسرعة",
    subtitle: "واجهة أوضح، خطوات أقل، ونتيجة أسرع من أول مرة.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero_mbugkk",
  },
  {
    id: 2,
    title: "كل الخدمات بترتيب أفضل",
    subtitle: "عرض أنظف على الهاتف حتى توصل مباشرة للي تحتاجه.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero-3_whqjwp",
  },
  {
    id: 3,
    title: "منصة عملية وليست مزدحمة",
    subtitle: "تقليل الفوضى، إبراز المهم، وتجربة مناسبة كتطبيق.",
    image:
      "https://res.cloudinary.com/dyqdfbaln/image/upload/f_auto,q_auto,w_1600/v1/snd-hero-2_ndwuy2",
  },
  {
    id: 4,
    title: "اختيار أسرع وتجربة أقوى",
    subtitle: "تصميم موبايل واضح يركز على الطلب والتصفح بدون تشتيت.",
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

      <section className="snd-container home-header-wrap">
        <header className="mobile-header-one-row fade-up">
          <details className="mobile-menu">
            <summary className="mobile-menu-button" aria-label="فتح القائمة">
              <span />
              <span />
              <span />
            </summary>

            <div className="mobile-menu-dropdown">
              <Link href="/workers">العمال</Link>
              <Link href="/request-worker">الطلبات</Link>
              <Link href="/register-worker">التسجيل</Link>
              <Link href="/admin/requests">الإدارة</Link>
            </div>
          </details>

          <Link href="/" className="mobile-header-brand" aria-label="SND Home">
            <div className="mobile-header-brand-copy">
              <strong>SND</strong>
              <span>خدمات وعمال عند الطلب</span>
            </div>

            <div className="mobile-header-logo-wrap">
              <img src="/logo.png" alt="SND" className="mobile-header-logo" />
            </div>
          </Link>
        </header>
      </section>

      <section className="hero-cover-section fade-up delay-1">
        <div className="snd-container">
          <div className="hero-cover-shell">
            <div className="hero-cover-slider">
              {heroSlides.map((slide, index) => (
                <article
                  key={slide.id}
                  className="hero-cover-slide"
                  style={{ animationDelay: `${index * 4}s` }}
                >
                  <div
                    className="hero-cover-image"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.72)), url("${slide.image}")`,
                    }}
                  >
                    <div className="hero-cover-overlay">
                      <div className="hero-cover-content">
                        <span className="hero-cover-badge">واجهة محسّنة للهاتف</span>
                        <h1 className="hero-cover-title">{slide.title}</h1>
                        <p className="hero-cover-text">{slide.subtitle}</p>

                        <div className="hero-cover-actions">
                          <Link href="/request-worker" className="app-btn-primary">
                            اطلب عامل
                          </Link>
                          <Link href="/workers" className="app-btn-secondary">
                            تصفح العمال
                          </Link>
                        </div>
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

      <section className="snd-container quick-strip-section fade-up delay-2">
        <div className="section-head clean-section-head">
          <div>
            <span className="eyebrow">وصول سريع</span>
            <h2>ابدأ من هنا</h2>
          </div>
        </div>

        <div className="quick-strip-grid colorful-quick-grid">
          <Link href="/request-worker" className="quick-strip-card quick-strip-card-1">
            <span className="quick-strip-icon">📦</span>
            <strong>طلب جديد</strong>
            <small>ابدأ الطلب فورًا</small>
          </Link>

          <Link href="/workers" className="quick-strip-card quick-strip-card-2">
            <span className="quick-strip-icon">👷</span>
            <strong>تصفح العمال</strong>
            <small>عرض التخصصات</small>
          </Link>

          <Link href="/register-worker" className="quick-strip-card quick-strip-card-3">
            <span className="quick-strip-icon">🪪</span>
            <strong>سجل كعامل</strong>
            <small>أنشئ ملفك</small>
          </Link>

          <Link href="/admin/requests" className="quick-strip-card quick-strip-card-4">
            <span className="quick-strip-icon">📋</span>
            <strong>إدارة الطلبات</strong>
            <small>متابعة أسرع</small>
          </Link>
        </div>
      </section>

      <section className="snd-container categories-clean-section">
        <div className="section-head clean-section-head fade-up">
          <div>
            <span className="eyebrow">التخصصات</span>
            <h2>أقسام الخدمة</h2>
          </div>
          <p>
            عرض مضغوط ومنظّم حتى تقل المساحة الفارغة ويصير التصفح أسرع على الهاتف.
          </p>
        </div>

        <div className="category-clean-grid category-tight-grid">
          {compactGroups.map((group, index) => (
            <article
              key={group.group}
              className={`category-clean-card category-tight-card fade-up delay-${(index % 3) + 1}`}
            >
              <div className="category-clean-head">
                <h3>{group.group}</h3>
                <span>{group.items.length} تخصص</span>
              </div>

              <div className="category-tight-tags">
                {group.items.slice(0, 8).map((item) => (
                  <div key={item.slug} className="category-tight-tag">
                    <span>{item.icon}</span>
                    <strong>{item.name}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="snd-container spotlight-wrap">
        <div className="section-head clean-section-head fade-up">
          <div>
            <span className="eyebrow">الأكثر طلبًا</span>
            <h2>العمال</h2>
          </div>
        </div>

        <div className="spotlight-grid spotlight-grid-clean">
          <div className="spotlight-main fade-up">
            {topWorker ? (
              <div className="top-worker-card clean-worker-card">
                <div className="top-worker-head">
                  <div className="top-worker-logo">TOP</div>

                  <div className="top-worker-text">
                    <span>العامل الأبرز هذا الشهر</span>
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
              <div className="empty-state">لا يوجد عامل متصدر هذا الشهر بعد.</div>
            )}
          </div>

          <div className="spotlight-side fade-up delay-1">
            <div className="workers-grid-compact clean-workers-grid two-col-workers">
              {featuredWorkers.map((worker) => (
                <article key={worker.id} className="worker-compact-card clean-worker-compact-card">
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