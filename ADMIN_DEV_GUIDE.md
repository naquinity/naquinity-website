# Admin Dashboard Development Guide

This guide outlines how to implement the Admin Dashboard in the future.

## 1. Setup Admin Route
Create `src/app/admin/layout.tsx`:
- Check user role (must be 'admin')
- Different sidebar/layout than User Dashboard

## 2. Admin Middleware
Update `middleware.ts` to strictly check for `admin` role in session.

## 3. CRUD Pages Structure
Create folders:
- `src/app/admin/program/create/page.tsx` (Form)
- `src/app/admin/program/[id]/edit/page.tsx` (Form)
- `src/app/admin/program/actions.ts` (Server Actions)

## 4. Server Actions (for Mutations)
Use Next.js Server Actions for secure database mutations.

Example `actions.ts`:
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProgram(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title')
  // ... validate and insert ...
  
  revalidatePath('/program')
  redirect('/admin/program')
}
```

## 5. Rich Text Editor
Integration recommendation: `tiptap` or `quill` for editing article content.
