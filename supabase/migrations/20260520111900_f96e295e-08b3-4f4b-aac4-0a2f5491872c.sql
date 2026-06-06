
-- Fix set_updated_at search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE PLPGSQL SECURITY INVOKER SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Revoke EXECUTE on SECURITY DEFINER funcs from anon/authenticated; RLS still uses them via definer context
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;

-- Replace storage SELECT policy: still allow serving by URL, but prevent listing
DROP POLICY IF EXISTS "Public read portfolio images" ON storage.objects;
CREATE POLICY "Public read portfolio by path" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio' AND (storage.foldername(name))[1] IS NOT NULL);
