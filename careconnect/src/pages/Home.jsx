import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion as motionFramer } from 'framer-motion';
import { Users, HeartHandshake, ShieldAlert, Award, FileText, Sparkles, Star } from 'lucide-react';
import StatsCard from '../components/StatsCard';

export default function Home() {
  const stats = [
    { icon: Users, count: '5,000+', label: 'Patients Helped' },
    { icon: HeartHandshake, count: '1,200+', label: 'Active Volunteers' },
    { icon: Award, count: '4,800+', label: 'Requests Resolved' }
  ];

  const features = [
    {
      title: 'Free Guidance',
      desc: 'Access expert medical navigational advice at no cost. Our professionals help you understand your options clearly.',
      icon: ShieldAlert,
      bg: 'bg-blue-600 text-white dark:bg-blue-700',
      span: 'md:col-span-2'
    },
    {
      title: 'NGO Support',
      desc: 'As a registered non-profit, we leverage international partnerships to bring medical supplies and expertise where they are needed most.',
      icon: FileText,
      bg: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100',
      span: 'md:col-span-2',
      hasAvatars: true
    },
    {
      title: 'Community Volunteers',
      desc: 'Join a network of over 1,200 dedicated individuals offering their time, skills, and empathy to local patients.',
      icon: HeartHandshake,
      bg: 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-800 shadow-sm',
      span: 'md:col-span-2'
    },
    {
      title: 'Fast Response',
      desc: 'Average response time of under 120 minutes for critical healthcare support requests.',
      icon: Sparkles,
      bg: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-950',
      span: 'md:col-span-2',
      hasProgress: true
    }
  ];

  const testimonials = [
    {
      name: 'David Chen',
      role: 'Patient Recipient',
      text: '"CareConnect wasn\'t just a service; they were a lifeline when our family was overwhelmed. Their volunteers treated us with such profound dignity."',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArwjcRSCeX4BsZEpFupnR8fJfDBPEb4p8ae_Mfv1U2avxqBr4O26AiTx_mCGWv2wBejz9lltQ4AITWoxbLQbXjRewoEeLxWwaVn7s5OInmv_yvf73XP-l1OKBgaISSc1CugPex5NomIe-JgALE1MQ_wsGt1YaWVhKk7fMlagGRCkMWrVcerTZhvZgdxXlmC648eUy6RuEUNMyHzub26yLHvX6qzpulLOkU-Vzzy8FM395v-b3XSNJ0hpf7rwk7fAi0UvDoHvX9dWY'
    },
    {
      name: 'Sarah Miller',
      role: 'Active Volunteer',
      text: '"Volunteering here has given me a new perspective on healthcare. The system is so organized, allowing us to focus entirely on the human side of care."',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2tZRseSEaZLgbUEZ9OjlkJbiMYSnyFlo0LYKJHn0hsQdRWU5VqiV1U9td1RJ1VkmFxbQ6WqFCggBsAkk0_HrMPxh2CtGLqPGp-UC_0KrF0CXNM38MPDk4ncmxEaz_gKWh03SqpCAGfL5x5AAHuovH5g0D3OQvSo0k1OgTyXJE2kB_JUBYHBF9KSvN4OGeu7hTin9D6fBRHOeNTdNnZqmNfribmw3XEGzCIwXOuRinaD6xe9kC8Uf4JmghSv1g7q3q30yV8Kft1uI'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-b from-blue-50/40 to-transparent dark:from-slate-950/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-16">
          <motionFramer.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4 mr-1.5" /> Professional Medical NGO
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
              Empowering Health, <span className="text-blue-600 dark:text-blue-400">Enriching Lives</span>.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-350 max-w-lg">
              Providing professional medical reliability and empathetic care. We bridge the gap between those in need and life-saving healthcare resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <NavLink
                to="/support"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg shadow-blue-500/20 active:scale-98"
              >
                Get Support
              </NavLink>
              <NavLink
                to="/volunteer"
                className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-98"
              >
                Become Volunteer
              </NavLink>
            </div>
          </motionFramer.div>
          
          <motionFramer.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full aspect-square max-w-[480px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white/85 dark:border-slate-800/85">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiLtRiwC-9WvID9D3wOtIEVYIMv46EtKEchb6JdhoIrQYESxJIh4BFvl5u5lD2nYyJoctu4qtZF5A1_Ff5pEt53RdGTTqHZHcReOFrZzSAyTComZ2tJoDK2_gRHE0EiDT6qc7KjGZ4Y_2J5gMbAwFjdhxEybJxOflTm2n6g5ftO--OriZ5fEbx1fP4gilfchsC_Dxt-uKMCIt5mvfhRhkfi55NrSHR5CO_YY_wHld4pBHWUGKWWlAua6Y2ZeEi1vWrI28st8cCcIo"
                alt="Medical professional providing empathetic care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <HeartHandshake className="h-5 w-5 text-red-500 fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">Emergency Care</span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Available 24/7 for urgent consultations.</p>
            </div>
          </motionFramer.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, idx) => (
              <StatsCard key={idx} icon={s.icon} count={s.count} label={s.label} delay={idx * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Integrated Care System</h2>
            <p className="text-slate-500 dark:text-slate-450 max-w-xl mx-auto text-sm md:text-base">
              Modern healthcare requires a systematic approach to empathy. We provide the tools and human support needed to ensure nobody walks alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motionFramer.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`${f.span} ${f.bg} p-8 rounded-[2rem] flex flex-col justify-between group overflow-hidden relative min-h-[220px] transition-all duration-350 hover:-translate-y-1`}
                >
                  <div className="relative z-10 space-y-4">
                    <div className="p-3 bg-white/10 dark:bg-slate-800/40 w-fit rounded-xl">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{f.title}</h3>
                    <p className="text-sm opacity-90 max-w-sm leading-relaxed">{f.desc}</p>
                  </div>

                  {f.hasAvatars && (
                    <div className="relative z-10 flex -space-x-2 pt-6 mt-4">
                      <img
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4sdsBB_fE4_t0OTupWjhtpq9DZ2VJlgE0cRTX8IV2rfnhBgSc0XH2-z25gylC6vxWx98skra_7y9PpkyBW78eReYHBDlFqxGNezQh3IEpHHBbL8GYgefL_QDv5mQAXoT97OOIw4YMU9j2wNiOVWX-RUxKYXwGPU_3vm97Kt-XemyneYcfmzzEJX2Gf-kVfgfl3aIWUdRGA0WxugukKH-1ohvRrRT1AEtYnPNnK-ckacYwLQkKyZtN7EHvEmol66JJ25ZnBEbK80w"
                        alt="User Avatar"
                      />
                      <img
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwYgWPuIDctrv9iC0_qgPafwIco0KBHUZWDvmaEq0DepZGop6G6BavLmFzCkV_lln2TeDuWs9kPZHdQrdNvgrKGzgBhpGns5Cs6xZUC_BUUjizLhJbgxrmnB861AhNBdA10Zi3AB6jl-htwSuDDt__8-KSOUMshOio-QehZMSPiAyQJnCvDFXUA9beTfN_c7ITeHFNj5TlQHKPQxp5JFHGKHHEF_KxS0JIq4uWdeQ9dZPl_mi-ypqArSOifVswku0k-zcAdLq67KU"
                        alt="User Avatar"
                      />
                      <img
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBYuW_9Loo_TqG4U9uCoMVcJBU6QFVfDf5l_-dQa0aE58XHiKsmSaEyQJhDcqq3Ie42prTOXvQHrso5pDdpA5p2QHXoXJzMWhUdK8sk2m-U1uvxGpVQkBLa607odrbumF9yZ2-2NRuH6QivSaQDJ2E10mW-TAjFwMVsW47gXpRMFvMq7FCexjSywvHhiIjWveBTkwMRSpedKscVLLep-ouVokzr8B2hYAjKZWqjqb-nlasmlihy_2OpqpyjerGBN6rq5-i45UeHyM"
                        alt="User Avatar"
                      />
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        +12
                      </div>
                    </div>
                  )}

                  {f.hasProgress && (
                    <div className="relative z-10 w-full bg-slate-200/50 dark:bg-slate-800/80 rounded-full h-2 mt-6">
                      <div className="bg-blue-600 dark:bg-blue-400 w-[85%] h-full rounded-full" />
                    </div>
                  )}

                  <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                    <Icon className="h-40 w-40" />
                  </div>
                </motionFramer.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white text-center">Voices of Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <motionFramer.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-slate-50 dark:bg-slate-900/65 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-350 italic">
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-200/40 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motionFramer.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motionFramer.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ready to make a difference?</h2>
              <p className="text-slate-400 text-base md:text-lg">
                Whether you need professional medical guidance or want to lend a helping hand, CareConnect is your partner in compassionate care.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <NavLink
                  to="/support"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-all shadow-md active:scale-98"
                >
                  Start Support Application
                </NavLink>
                <NavLink
                  to="/volunteer"
                  className="border border-slate-700 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all active:scale-98"
                >
                  Join as Volunteer
                </NavLink>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          </motionFramer.div>
        </div>
      </section>
    </div>
  );
}
