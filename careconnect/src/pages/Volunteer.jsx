import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, Award, Calendar } from 'lucide-react';
import { saveVolunteer } from '../utils/localStorage';
import LoadingSpinner from '../components/LoadingSpinner';

const PREDEFINED_SKILLS = [
  'Nursing',
  'Logistics',
  'Counseling',
  'General Admin',
  'First Aid',
  'Physiotherapy',
  'Elderly Care',
  'Social Work'
];

export default function Volunteer() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const toggleSkill = (skill) => {
    let updated;
    if (selectedSkills.includes(skill)) {
      updated = selectedSkills.filter(s => s !== skill);
    } else {
      updated = [...selectedSkills, skill];
    }
    setSelectedSkills(updated);
    setValue('skills', updated.join(', '));
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Include custom skills text if any
    const finalData = {
      ...data,
      skills: selectedSkills.length > 0 ? selectedSkills.join(', ') : data.customSkills || 'General Support'
    };

    setTimeout(() => {
      saveVolunteer(finalData);
      setIsSubmitting(false);
      setShowSuccess(true);
      reset();
      setSelectedSkills([]);
    }, 1800);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors">
      <main className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
                    Join Our Community
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    Turn your <span className="text-blue-600 dark:text-blue-400">empathy</span> into <span className="text-blue-600 dark:text-blue-400">action</span>.
                  </h1>
                  <p className="text-lg text-slate-500 dark:text-slate-300">
                    Become a cornerstone of care. CareConnect brings together medical professionals and passionate individuals to provide reliable healthcare support to those in need.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="#application-form"
                      className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 active:scale-98 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>

                <div className="hidden lg:block relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 border-4 border-white dark:border-slate-800 relative z-10 max-h-[460px]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYjLlcMhyQ6OgvVqCui48YI-G2qaYVp5ntY7Iaa4taS6u91c7gMI-uN5xLYFIprlLEIMqFvtvblmDV7VAwbw5yflyNzqSLRBjrZDshpNoE0MZusO2MlagrIi7Rq0TlHh5IhbHBT0E_FG0IhcQdz4svXjJIiyFeJSTjn2DKCwy6TQxWRTJP1qlrwvNpUHAxzPW8YJXtVJJbnEkL1fyNpeldqh4d3Tf9NgCJUx03fOiJtUoSyvDy_8Gm6mD4esLwpv44n8QkcWsbvrE"
                      alt="Volunteers collaborating"
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl z-20 max-w-[240px]">
                    <p className="text-2xl font-extrabold mb-1">5,000+</p>
                    <p className="text-xs text-blue-100">Lives touched by our volunteer network this year alone.</p>
                  </div>
                </div>
              </div>

              {/* Bento grid impact cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit rounded-xl">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Professional Growth</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Work alongside medical experts, gain clinical hours, and request certified training courses.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden group">
                  <div className="space-y-4 z-10 relative">
                    <div className="p-3 bg-white/10 w-fit rounded-xl">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Direct Clinical Impact</h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      Every hour you offer directly improves patient health outcomes, ensuring nobody goes without care.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 w-fit rounded-xl">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Flexible Schedules</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      From weekends to weekdays or remote consults, schedule volunteer hours that fit your lifestyle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div id="application-form" className="max-w-3xl mx-auto scroll-mt-20">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200/60 dark:border-slate-800">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Volunteer Application</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Tell us a little about yourself and how you'd like to help.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Full Name</label>
                        <input
                          type="text"
                          placeholder="Dr. Sarah Chen"
                          {...register('fullName', { required: 'Full Name is required' })}
                          className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                            errors.fullName ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Email Address</label>
                        <input
                          type="email"
                          placeholder="sarah.chen@example.com"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'Please enter a valid email address'
                            }
                          })}
                          className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                            errors.email ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...register('phone', {
                            required: 'Phone Number is required',
                            pattern: {
                              value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                              message: 'Please enter a valid phone number'
                            }
                          })}
                          className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                            errors.phone ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">City</label>
                        <input
                          type="text"
                          placeholder="San Francisco"
                          {...register('city', { required: 'City is required' })}
                          className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                            errors.city ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                        />
                        {errors.city && <p className="text-xs text-red-500 font-medium">{errors.city.message}</p>}
                      </div>
                    </div>

                    {/* Predefined Skills Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Select Your Skills</label>
                      <div className="flex flex-wrap gap-2.5">
                        {PREDEFINED_SKILLS.map((skill) => {
                          const isSelected = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom skills text */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Additional / Custom Skills & Experience</label>
                      <textarea
                        rows="3"
                        placeholder="List other relevant healthcare credentials, nursing certifications, languages spoken, etc..."
                        {...register('customSkills')}
                        className="w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring"
                      />
                    </div>

                    {/* Availability */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Availability</label>
                      <select
                        {...register('availability', { required: 'Please specify availability' })}
                        className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring cursor-pointer appearance-none ${
                          errors.availability ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                      >
                        <option value="">Select typical availability</option>
                        <option value="weekdays">Weekdays (Monday - Friday)</option>
                        <option value="weekends">Weekends (Saturday - Sunday)</option>
                        <option value="evenings">Evenings only</option>
                        <option value="flexible">Flexible / Remote</option>
                      </select>
                      {errors.availability && <p className="text-xs text-red-500 font-medium">{errors.availability.message}</p>}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span>Submitting Application</span>
                            <LoadingSpinner size="sm" color="white" />
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto text-center py-20 space-y-6"
            >
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/5">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">You're Awesome!</h2>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                Your application has been received. Our NGO volunteer coordination team will review your profile and reach out within 48 hours for a brief introductory call.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-blue-600 hover:bg-blue-750 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer mt-4"
              >
                Apply Another Profile
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
