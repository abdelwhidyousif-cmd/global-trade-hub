
// @ts-check

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://mmssphnjslhmoejqhkef.supabase.co'

const SUPABASE_KEY = 'sb_publishable_usDlhGn2WqOsV5O385NZxg_TEF_3Ag8'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

// Sign Up
/**
 * @param {string} email
 * @param {string} password
 * @param {string} fullName
 * @param {string} country
 */
export async function signUpUser(email, password, fullName, country) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        country: country
      }
    }
  })

  return { data, error }
}

// Login
/**
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  return { data, error }
}

// Get User Profile
export async function getUserProfile() {
  const { data: { user }, error: userError } =
    await supabase.auth.getUser()

  if (userError) {
    return { user: null, profile: null, error: userError }
  }

  if (!user) {
    return { user: null, profile: null, error: null }
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile, error }
}

// Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  return { error }
      }

/**
 * Update current user's profile
 * @param {string} fullName
 * @param {string} country
 * @param {string} phone
 * @param {'Buyer' | 'Supplier'} userType
 */
export async function updateUserProfile(
  fullName,
  country,
  phone,
  userType
) {
  const { data, error } = await supabase.rpc(
    'update_my_profile',
    {
      p_full_name: fullName,
      p_country: country,
      p_phone: phone,
      p_user_type: userType
    }
  )

  return { data, error }
}
  
