-- Add new columns to the profiles table for customization
alter table public.profiles
add column if not exists specialty text,
add column if not exists subspecialty text,
add column if not exists target_audience text,
add column if not exists audience_age text,
add column if not exists target_location text,
add column if not exists brand_colors text,
add column if not exists tone text,
add column if not exists other_info text;
