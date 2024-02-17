import { SupabaseClientOptions, createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://agrukoyrrygusmweaqfm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncnVrb3lycnlndXNtd2VhcWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwOTEyODMsImV4cCI6MjAyMzY2NzI4M30.o9H-DltPzqM08wLmoqQJRVQcXZoCkwEe0I-ByOdxje0",
  {
    autoRefresh: true, // Disable client-side caching
  } as unknown as SupabaseClientOptions<"public">
);
