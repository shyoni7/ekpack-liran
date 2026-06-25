-- ============================================================
-- E.K.PACK — הרשאות Storage ל-bucket "media"
-- מאפשר למשתמש מחובר (המנהל) להעלות/לעדכן/למחוק קבצים.
-- קריאה ציבורית כבר מאופשרת כי ה-bucket מסומן Public.
-- הרצה: Supabase Dashboard → SQL Editor → הדבק והרץ
-- ============================================================

create policy "authenticated upload to media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "authenticated update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "authenticated delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
