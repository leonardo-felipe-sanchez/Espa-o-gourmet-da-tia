CREATE POLICY "user_SELECT_own_email_cpf"
ON public.user_roles
FOR select
TO authenticated
USING (auth.uid() = user_id AND NOT check_if_admin())