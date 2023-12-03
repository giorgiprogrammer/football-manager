import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vedjtorcktrczmundyno.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZGp0b3Jja3RyY3ptdW5keW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MTc3MzUsImV4cCI6MjAxNzA5MzczNX0.9FIazOx0QA6MYMaNhYeRn6rrE4X-3VuUc8ascueMogk"
);
