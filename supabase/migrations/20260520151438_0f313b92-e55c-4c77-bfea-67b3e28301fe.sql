-- Explicit INSERT policy: only admins can insert into user_roles.
-- The existing "Admins manage all roles" ALL policy already covers this,
-- but adding an explicit INSERT policy makes the intent unambiguous and
-- defends against future permissive policies.
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));