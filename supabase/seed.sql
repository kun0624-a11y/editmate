insert into public.categories (slug, name_ko, name_en) values
('productivity', '생산성', 'Productivity'),
('video', '비디오', 'Video'),
('coding', '개발', 'Coding')
on conflict (slug) do nothing;

-- Replace UUIDs with real auth users in your project
insert into public.profiles (id, username, display_name, bio, is_admin) values
('00000000-0000-0000-0000-000000000001', 'vibecoderkim', 'VibeCoder Kim', 'AI 빌더', true)
on conflict (username) do nothing;
