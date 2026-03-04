-- Seed baseline services and an admin user
INSERT INTO services (name, description) VALUES
('Residential Cleaning + Washroom', 'Full home cleaning including washrooms.'),
('Office Cleaning + Washroom', 'Office cleaning for professional workspaces.'),
('Laundry Services', 'Washing, drying, and folding.'),
('Sofa & Upholstery Cleaning', 'Deep cleaning for fabric furniture.'),
('Carpet & Rug Cleaning', 'Dust, allergen, and stain removal.'),
('Washroom & Toilet Cleaning Only', 'Dedicated washroom sanitation.'),
('Upholstery & Fabric Cleaning', 'Specialized fabric care.'),
('Move-In / Move-Out Cleaning', 'Deep cleaning for moving transitions.'),
('Outdoor & Compound Cleaning', 'Yards, pavements, and compound cleaning.');

INSERT INTO users (name, email, phone, password_hash, role)
VALUES ('Admin User', 'admin@joshem.local', '0700000000', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'admin');
-- Password hash above corresponds to "Admin123" (change after setup).
