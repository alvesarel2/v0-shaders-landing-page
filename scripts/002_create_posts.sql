create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  specialty text not null,
  topic text not null,
  caption text not null,
  hashtags text[] not null,
  image_description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table posts enable row level security;

create policy "Users can view their own posts"
  on posts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own posts"
  on posts for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own posts"
  on posts for delete
  using (auth.uid() = user_id);
