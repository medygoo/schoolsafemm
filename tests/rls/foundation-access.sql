BEGIN;

DO $$
DECLARE
  required_table text;
BEGIN
  FOREACH required_table IN ARRAY ARRAY[
    'school',
    'school_settings',
    'profiles',
    'devices',
    'roles',
    'permissions',
    'profile_roles',
    'role_permission_grants',
    'scope_assignments',
    'audit_events'
  ]
  LOOP
    IF to_regclass('public.' || required_table) IS NULL THEN
      RAISE EXCEPTION 'F1 RED: required table public.% is missing', required_table;
    END IF;
  END LOOP;
END
$$;

-- Once the schema exists, unauthenticated access must not expose foundation data.
SET LOCAL ROLE anon;
DO $$
BEGIN
  BEGIN
    PERFORM 1 FROM public.school LIMIT 1;
    RAISE EXCEPTION 'F1 access failure: anon unexpectedly read public.school';
  EXCEPTION
    WHEN insufficient_privilege THEN
      NULL;
  END;
END
$$;
RESET ROLE;

ROLLBACK;
