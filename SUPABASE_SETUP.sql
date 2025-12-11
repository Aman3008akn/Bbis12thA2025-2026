-- Supabase SQL Queries for 12th A Website
-- Run these queries in your Supabase SQL Editor

-- 1. Gallery Table
CREATE TABLE gallery (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  uploaded_by TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Highlights Table
CREATE TABLE highlights (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Teachers Table
CREATE TABLE teachers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT,
  image_url TEXT,
  bio TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Memories/Submissions Table
CREATE TABLE memories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  memory TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Settings Table
CREATE TABLE settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Admin Users Table
CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read for gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Allow public read for highlights"
  ON highlights FOR SELECT
  USING (true);

CREATE POLICY "Allow public read for teachers"
  ON teachers FOR SELECT
  USING (true);

CREATE POLICY "Allow public read for approved memories"
  ON memories FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Allow public insert for memories"
  ON memories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read for settings"
  ON settings FOR SELECT
  USING (true);

-- Insert initial data
-- Gallery
INSERT INTO gallery (image_url, alt_text, caption, uploaded_by) VALUES
('https://i.ibb.co/6JN2L8PM/Whats-App-Image-2025-12-11-at-11-39-17-PM.jpg', 'Class 12th A ❤️', 'Class 12th A ❤️', 'admin');

-- Highlights
INSERT INTO highlights (title, description, icon, display_order) VALUES
('Farewell Moments', 'Celebrating our journey with unforgettable memories and heartfelt goodbyes that will last a lifetime.', 'fas fa-camera-retro', 1),
('Teachers & Mentors', 'Invaluable guidance and support from educators who shaped our futures with wisdom and care.', 'fas fa-chalkboard-teacher', 2);

-- Teachers
INSERT INTO teachers (name, department, display_order) VALUES
('Rajesh', '', 1);

-- Settings
INSERT INTO settings (key, value) VALUES
('site_title', '12th A — 2025–26'),
('hero_subtitle', 'A year remembered forever.'),
('instagram_link', 'https://www.instagram.com/12_a_202526/'),
('whatsapp_number', '918826817677'),
('gallery_caption', 'More precious moments coming soon. Stay tuned! ✨');

-- Create indexes for better performance
CREATE INDEX idx_gallery_created_at ON gallery(created_at DESC);
CREATE INDEX idx_memories_created_at ON memories(created_at DESC);
CREATE INDEX idx_memories_is_approved ON memories(is_approved);
CREATE INDEX idx_highlights_display_order ON highlights(display_order);
CREATE INDEX idx_teachers_display_order ON teachers(display_order);
