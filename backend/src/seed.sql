-- Seed data for JOSHEM Cleaning Services Database
-- Updated for the redesigned schema

-- Insert service categories
INSERT INTO service_categories (name, description) VALUES
('Residential Cleaning', 'Home and residential property cleaning services'),
('Commercial Cleaning', 'Office and commercial space cleaning services'),
('Specialized Cleaning', 'Specialized cleaning services for specific items or situations'),
('Laundry Services', 'Washing, drying, and laundry services');

-- Insert service areas
INSERT INTO service_areas (name, description) VALUES
('Nairobi CBD', 'Central Business District and surrounding areas'),
('Westlands', 'Westlands and Kilimani areas'),
('Karen', 'Karen and Langata areas'),
('Kilimani', 'Kilimani and Hurligham areas'),
('Parklands', 'Parklands and Westlands adjacent areas');

-- Insert services with pricing
INSERT INTO services (category_id, name, description, base_price, price_per_hour, estimated_duration_hours) VALUES
(1, 'Residential Cleaning + Washroom', 'Full home cleaning including washrooms, kitchen, and living areas', 2500.00, 500.00, 3.0),
(2, 'Office Cleaning + Washroom', 'Office cleaning for professional workspaces including common areas', 3500.00, 600.00, 4.0),
(4, 'Laundry Services', 'Washing, drying, folding, and ironing services', 800.00, 200.00, 2.0),
(3, 'Sofa & Upholstery Cleaning', 'Deep cleaning for fabric furniture and upholstery', 1500.00, 400.00, 2.5),
(3, 'Carpet & Rug Cleaning', 'Dust, allergen, and stain removal from carpets and rugs', 2000.00, 450.00, 3.0),
(1, 'Washroom & Toilet Cleaning Only', 'Dedicated washroom and toilet sanitation services', 1200.00, 300.00, 1.5),
(3, 'Upholstery & Fabric Cleaning', 'Specialized fabric care and cleaning', 1800.00, 400.00, 2.5),
(1, 'Move-In / Move-Out Cleaning', 'Deep cleaning for moving transitions and property handovers', 4000.00, 700.00, 5.0),
(1, 'Outdoor & Compound Cleaning', 'Yards, pavements, and compound cleaning services', 2200.00, 500.00, 3.5);

-- Insert admin user
INSERT INTO users (name, email, phone, password_hash, role)
VALUES ('Admin User', 'admin@joshem.local', '0700000000', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'admin');

-- Insert sample cleaners
INSERT INTO users (name, email, phone, password_hash, role) VALUES
('John Cleaner', 'john@joshem.local', '0712345678', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'cleaner'),
('Mary Professional', 'mary@joshem.local', '0723456789', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'cleaner'),
('David Expert', 'david@joshem.local', '0734567890', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'cleaner');

-- Insert staff schedules (Monday to Friday, 8 AM to 5 PM)
INSERT INTO staff_schedules (cleaner_id, day_of_week, start_time, end_time) VALUES
(2, 1, '08:00', '17:00'), -- John: Monday
(2, 2, '08:00', '17:00'), -- John: Tuesday
(2, 3, '08:00', '17:00'), -- John: Wednesday
(2, 4, '08:00', '17:00'), -- John: Thursday
(2, 5, '08:00', '17:00'), -- John: Friday
(3, 1, '09:00', '18:00'), -- Mary: Monday
(3, 2, '09:00', '18:00'), -- Mary: Tuesday
(3, 3, '09:00', '18:00'), -- Mary: Wednesday
(3, 4, '09:00', '18:00'), -- Mary: Thursday
(3, 5, '09:00', '18:00'), -- Mary: Friday
(4, 2, '08:00', '17:00'), -- David: Tuesday
(4, 3, '08:00', '17:00'), -- David: Wednesday
(4, 4, '08:00', '17:00'), -- David: Thursday
(4, 5, '08:00', '17:00'), -- David: Friday
(4, 6, '08:00', '17:00'); -- David: Saturday

-- Insert equipment inventory
INSERT INTO equipment (name, description, quantity_available) VALUES
('Vacuum Cleaner', 'Professional vacuum cleaner for carpets and floors', 5),
('Mop and Bucket Set', 'Cleaning mop and bucket for floor cleaning', 10),
('Cleaning Chemicals', 'Various cleaning detergents and disinfectants', 50),
('Microfiber Cloths', 'Reusable microfiber cleaning cloths', 100),
('Gloves', 'Protective cleaning gloves', 200),
('Sponges', 'Cleaning sponges and scrubbers', 150),
('Broom and Dustpan', 'Broom and dustpan set for sweeping', 8),
('Steam Cleaner', 'Steam cleaning machine for deep cleaning', 3),
('Carpet Cleaner', 'Specialized carpet cleaning equipment', 2),
('Pressure Washer', 'High-pressure washer for outdoor cleaning', 2);

-- Insert sample customers
INSERT INTO users (name, email, phone, password_hash, role) VALUES
('Alice Johnson', 'alice@example.com', '0745678901', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'customer'),
('Bob Smith', 'bob@example.com', '0756789012', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'customer'),
('Carol Davis', 'carol@example.com', '0767890123', '$2a$10$wHj9x4q5bCw4dCVMm9yO0uF8HFuI0xZMyuS0NipTGtQ9XK0g0vYpG', 'customer');

-- Insert sample orders
INSERT INTO orders (user_id, service_id, area_id, scheduled_at, address, notes, status, assigned_cleaner_id, total_price) VALUES
(5, 1, 1, NOW() + INTERVAL '2 days', '123 Main St, Nairobi CBD', 'Please focus on kitchen and bathrooms', 'confirmed', 2, 2500.00),
(6, 3, 2, NOW() + INTERVAL '3 days', '456 Oak Ave, Westlands', 'Delicate fabrics included', 'pending', NULL, 800.00),
(7, 2, 3, NOW() + INTERVAL '1 day', '789 Pine Rd, Karen', 'Office space needs deep cleaning', 'assigned', 3, 3500.00);

-- Insert order status history
INSERT INTO order_status_history (order_id, old_status, new_status, changed_by) VALUES
(1, NULL, 'pending', 1),
(1, 'pending', 'confirmed', 1),
(2, NULL, 'pending', 1),
(3, NULL, 'pending', 1),
(3, 'pending', 'assigned', 1);

-- Insert sample payments
INSERT INTO payments (order_id, amount, payment_method, status, payment_date) VALUES
(1, 2500.00, 'mpesa', 'completed', NOW() - INTERVAL '1 day'),
(3, 3500.00, 'cash', 'completed', NOW() - INTERVAL '2 hours');

-- Insert sample reviews
INSERT INTO reviews (order_id, user_id, rating, comment, is_verified) VALUES
(1, 5, 5, 'Excellent service! Very thorough and professional.', true),
(3, 7, 4, 'Good job overall, but could be more detailed in some areas.', true);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, related_order_id) VALUES
(5, 'Order Confirmed', 'Your residential cleaning order has been confirmed for tomorrow.', 'success', 1),
(7, 'Cleaner Assigned', 'David has been assigned to your office cleaning order.', 'info', 3),
(6, 'Payment Reminder', 'Your laundry service order is pending payment.', 'warning', 2);
