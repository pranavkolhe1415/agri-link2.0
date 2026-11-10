import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { api } from '../../services/api'

export function OTPVerification({ userId, email, mobile, onSuccess, onBack }) {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const [digits, setDigits] = useState(['','','',''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const refs = useRef([])
  const otp = digits.join('')

 const setDigit = (index, value) => {
  const clean = value.replace(/\D/g, '');

  // Handle pasting all four OTP digits
  if (clean.length > 1) {
    const pasted = clean.slice(0, 4).split('');

    setDigits(
      Array.from({ length: 4 }, (_, i) => pasted[i] || '')
    );

    refs.current[Math.min(pasted.length, 3)]?.focus();
    return;
  }

  setDigits(prev =>
    prev.map((digit, i) => i === index ? clean : digit)
  );

  if (clean && index < 3) {
    refs.current[index + 1]?.focus();
  }
};
  const handleKeyDown = (index,e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) refs.current[index-1]?.focus()
    if (e.key === 'ArrowLeft' && index > 0) refs.current[index-1]?.focus()
    if (e.key === 'ArrowRight' && index < 3) refs.current[index+1]?.focus()
  }
  const handleVerify = async (e) => {
    e.preventDefault()
    if (otp.length !== 4) { setError('Enter the 4-digit OTP'); return }
    setError(''); setLoading(true)
    try { await api('/auth/verify-otp',{method:'POST',body:{userId,otp}}); onSuccess() }
    catch(err) { setError(err.message) }
    finally { setLoading(false) }
  }
  const resend = async () => {
  setError('');
  setLoading(true);

  try {
    await api('/auth/resend-otp', {
      method: 'POST',
      body: { email }
    });

    setDigits(['', '', '', '']);
    refs.current[0]?.focus();
  } catch (err) {
    setError(err.message || 'Unable to resend OTP');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center px-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {availableLanguages.map(lang => (
          <button key={lang.code} onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors duration-200 text-black ${language === lang.code ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'}`}>{lang.native}</button>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl">📱</span></div>
        <h1 className="text-2xl font-bold text-foreground mb-2">OTP Verification</h1>
        <p className="text-muted-foreground mb-2">We sent a 4-digit OTP to</p>
        <p className="text-foreground font-medium mb-6">{email || mobile}</p>
        {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex justify-center gap-3">
            {digits.map((digit,index)=><input key={index} ref={el=>refs.current[index]=el}
              type="text" inputMode="numeric" autoComplete={index===0?'one-time-code':'off'}
              value={digit} onChange={e=>setDigit(index,e.target.value)} onKeyDown={e=>handleKeyDown(index,e)}
              className="w-14 h-14 border border-border rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              aria-label={`OTP digit ${index+1}`} maxLength={4} />)}
          </div>
          <button type="submit" disabled={loading || otp.length!==4}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <button type="button" onClick={resend} className="mt-4 text-sm text-primary hover:underline">Resend OTP</button>
        <div className="mt-4"><button onClick={onBack} className="text-sm text-muted-foreground hover:text-primary">← Back</button></div>
      </motion.div>
    </div>
  )
}
