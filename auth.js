// @ts-check
import { createClient } from 'https://esm.sh'

// ضع هنا رابط API URL ومفتاح Publishable key الخاصين بمشروعك
const SUPABASE_URL = 'https://mmssphnjslhmoejqhkef.supabase.co/rest/v1/'
const SUPABASE_KEY = 'sb_publishable_usDlhGn2WqOsV5O385NZxg_TEF_3Ag8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/**
 * 1. دالة إنشاء حساب جديد
 * @param {string} email
 * @param {string} password
 * @param {string} fullName
 * @param {string} country
 */
export async function signUpUser(email, password, fullName, country) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        country: country
      }
    }
  })
  return { data, error }
}

/**
 * 2. دالة تسجيل الدخول
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  return { data, error }
}

// 3. دالة جلب بيانات الملف الشخصي للمستخدم المسجل حالياً (محمية بـ RLS)
export async function getUserProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile, error }
}

// 4. دالة تسجيل الخروج
export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
