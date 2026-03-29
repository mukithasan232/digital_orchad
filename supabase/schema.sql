-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES TABLE
-- Automagically synced from Supabase auth.users or manually managed profile properties
CREATE TYPE user_role AS ENUM ('customer', 'farmer', 'admin');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'customer'::user_role,
  avatar_url TEXT,
  phone text,
  is_verified boolean DEFAULT false, -- Useful for farmers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. FARMERS (Specific details for farmers linking to their profile)
CREATE TABLE farmers (
  id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  farm_name TEXT NOT NULL,
  location_district TEXT NOT NULL, -- e.g., Rajshahi, Chapainawabganj
  bio TEXT,
  total_sales_kg INTEGER DEFAULT 0,
  joined_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. PRODUCTS (Mango Varieties)
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_per_kg NUMERIC(10,2) NOT NULL,
  stock_kg INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('Langra', 'Himsagar', 'Fazli', 'Amrupali', 'Other')),
  location TEXT NOT NULL,
  rating NUMERIC(3,2) DEFAULT 0.00,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. ORDERS
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status order_status DEFAULT 'pending'::order_status,
  shipping_address TEXT NOT NULL,
  payment_method TEXT, -- e.g., 'bkash', 'sslcommerz', 'cod'
  payment_status TEXT DEFAULT 'unpaid',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. ORDER ITEMS
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity_kg INTEGER NOT NULL,
  price_at_purchase NUMERIC(10,2) NOT NULL
);

-- RLS (ROW LEVEL SECURITY) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read everyone (for public profiles/farmers), but update only themselves
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Farmers: Publicly viewable
CREATE POLICY "Farmers are viewable by everyone." ON farmers FOR SELECT USING (true);

-- Products: Everyone can view, but only the farmer who owns it or an admin can insert/update
CREATE POLICY "Products are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Farmers can insert their own products" ON products FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update their own products" ON products FOR UPDATE USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can delete their own products" ON products FOR DELETE USING (auth.uid() = farmer_id);

-- Orders: Users can read their own orders. Farmers can read orders where their product is involved (requires complex view or security definer). Admins can read all.
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Setup an initial trigger to automatically create a profile when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url', COALESCE((new.raw_user_meta_data->>'role')::user_role, 'customer'::user_role));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. BLOGS
CREATE TABLE blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  image_url TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blogs are viewable by everyone." ON blogs FOR SELECT USING (true);
CREATE POLICY "Admins can manage blogs" ON blogs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
