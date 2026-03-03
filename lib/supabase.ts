import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jnofjnkowjazpfgblebp.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_EVjK_oBIe1pnZojbgaRIyQ_e6GGg9j2"

export const supabase = createClient(supabaseUrl, supabaseKey)
