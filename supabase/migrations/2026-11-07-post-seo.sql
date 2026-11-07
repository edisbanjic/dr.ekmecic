-- SEO fields for blog posts (admin → Objave → SEO). Additive and safe to re-run.
-- Empty values fall back: seo_title → title, seo_description → summary,
-- og_image → image_url → site share card, image_alt → title.
alter table posts add column if not exists updated_at timestamptz not null default now();
alter table posts add column if not exists seo_title text;
alter table posts add column if not exists seo_description text;
alter table posts add column if not exists focus_keyword text;
alter table posts add column if not exists og_image text;
alter table posts add column if not exists image_alt text;
alter table posts add column if not exists no_index boolean not null default false;

-- existing posts: "last modified" starts at the publish date, not at migration time
update posts set updated_at = date::timestamptz where updated_at > now() - interval '1 minute';
