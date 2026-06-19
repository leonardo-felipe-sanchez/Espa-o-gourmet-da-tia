CREATE POLICY "Usuários autenticados podem criar bolos"
ON public.bolos
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = dono_do_bolo);

-- 3️⃣ POLICY: Apenas o DONO pode EDITAR seu bolo
CREATE POLICY "Usuários podem editar apenas seus próprios bolos"
ON public.bolos
FOR UPDATE
TO authenticated
USING (auth.uid() = dono_do_bolo)
WITH CHECK (auth.uid() = dono_do_bolo);

-- 4️⃣ POLICY: Apenas o DONO pode DELETAR seu bolo
CREATE POLICY "Usuários podem deletar apenas seus próprios bolos"
ON public.bolos
FOR DELETE
TO authenticated
USING (auth.uid() = dono_do_bolo);