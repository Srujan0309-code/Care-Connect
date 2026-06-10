import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { savePatient } from '../utils/localStorage';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PatientSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const selectedUrgency = watch('urgency');

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      savePatient(data);
      setIsSubmitting(false);
      setShowToast(true);
      reset();
      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1800);
  };

  // Border coloring for urgency dropdown
  const getUrgencyRing = () => {
    if (selectedUrgency === 'high') return 'ring-2 ring-red-500 border-red-500';
    if (selectedUrgency === 'medium') return 'ring-2 ring-amber-500 border-amber-500';
    if (selectedUrgency === 'low') return 'ring-2 ring-emerald-500 border-emerald-500';
    return '';
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors">
      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Patient Support</h1>
          <p className="text-lg text-slate-500 dark:text-slate-300">
            We're here to provide professional medical reliability and empathetic care whenever you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200/60 dark:border-slate-800"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Request Help</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    {...register('fullName', { required: 'Full Name is required' })}
                    className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                      errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>}
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Age</label>
                  <input
                    type="number"
                    placeholder="32"
                    {...register('age', {
                      required: 'Age is required',
                      min: { value: 1, message: 'Age must be greater than 0' }
                    })}
                    className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                      errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                  />
                  {errors.age && <p className="text-xs text-red-500 font-medium">{errors.age.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register('phoneNumber', {
                      required: 'Phone Number is required',
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                      errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-500 font-medium">{errors.phoneNumber.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                </div>
              </div>

              {/* Health Concern */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Health Concern</label>
                <textarea
                  rows="4"
                  placeholder="Briefly describe your symptoms or what you need assistance with..."
                  {...register('healthConcern', { required: 'Please specify your health concern' })}
                  className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring ${
                    errors.healthConcern ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                  }`}
                />
                {errors.healthConcern && <p className="text-xs text-red-500 font-medium">{errors.healthConcern.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Location (City, State)</label>
                  <div className="relative">
                    <MapPin className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Seattle, WA"
                      {...register('location', { required: 'Location is required' })}
                      className={`w-full p-3.5 pl-11 rounded-xl text-sm transition-all input-focus-ring ${
                        errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                    />
                  </div>
                  {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location.message}</p>}
                </div>

                {/* Urgency */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Urgency Level</label>
                  <select
                    {...register('urgency', { required: 'Please select urgency level' })}
                    className={`w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring appearance-none cursor-pointer ${getUrgencyRing()} ${
                      errors.urgency ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                  >
                    <option value="">Select priority level</option>
                    <option value="low">Low - Routine check-in</option>
                    <option value="medium">Medium - Support within 24 hours</option>
                    <option value="high">High - Immediate attention needed</option>
                  </select>
                  {errors.urgency && <p className="text-xs text-red-500 font-medium">{errors.urgency.message}</p>}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 px-1 block">Additional Notes</label>
                <textarea
                  rows="2"
                  placeholder="Any extra info, preferred contact time, etc..."
                  {...register('additionalNotes')}
                  className="w-full p-3.5 rounded-xl text-sm transition-all input-focus-ring"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span>Processing Request</span>
                      <LoadingSpinner size="sm" color="white" />
                    </>
                  ) : (
                    <span>Submit Support Request</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* How it works */}
            <div className="bg-slate-100/40 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" /> How It Works
              </h3>
              
              <div className="space-y-6 relative">
                <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800" />
                
                <div className="flex gap-4 relative">
                  <div className="z-10 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Submit Request</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fill out the empathetic support form with your details and health concerns.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="z-10 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Medical Review</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Our clinical team reviews your concern based on the urgency level provided.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="z-10 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Volunteer Matching</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">We match you with a nearby healthcare volunteer or medical professional.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="z-10 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Care Coordination</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Receive personalized care, either remotely or through a home visit.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Trusted Care</span>
              </div>
              <h4 className="text-xl font-bold mb-1">98.2% Support Rating</h4>
              <p className="text-sm text-blue-100">
                Join over 5,000 patients who have found relief and guidance through our NGO support networks.
              </p>
            </div>

            {/* Emergency warning */}
            <div className="bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 p-6 rounded-2xl border border-red-200/40 dark:border-red-900/40 flex gap-4">
              <AlertOctagon className="h-10 w-10 text-red-600 dark:text-red-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Life-Threatening Emergency?</h4>
                <p className="text-xs text-red-700/90 dark:text-red-400/90 mt-1 leading-relaxed">
                  Please call emergency services (like 911) immediately. Our system is designed strictly for routine coordination and non-critical care support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 p-5 rounded-2xl shadow-2xl flex items-center gap-4 z-50 max-w-sm"
          >
            <div className="bg-green-500 text-white p-2 rounded-full flex-shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Request Submitted Successfully</p>
              <p className="text-xs text-slate-400 mt-0.5">A CareConnect coordinator will contact you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
