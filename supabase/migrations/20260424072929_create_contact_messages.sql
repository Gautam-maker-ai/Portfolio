/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, sender's name)
      - `email` (text, sender's email)
      - `subject` (text, message subject)
      - `message` (text, message body)
      - `created_at` (timestamptz, auto-set on insert)
      - `read` (boolean, default false - for inbox management)

  2. Security
    - Enable RLS on `contact_messages`
    - Public INSERT policy so anyone can submit a contact form
    - No public SELECT/UPDATE/DELETE — only authenticated owners (admin) can read
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) > 0 AND
    email ~* '^[^@]+@[^@]+\.[^@]+$' AND
    length(message) >= 20
  );

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update read status"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
