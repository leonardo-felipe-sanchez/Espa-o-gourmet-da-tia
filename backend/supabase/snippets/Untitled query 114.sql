CREATE policy "todo mundo pode ver"
on "public"."produtos"
for select
to public
using (
  true
);