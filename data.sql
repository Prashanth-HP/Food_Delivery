USE food_delivery;

CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    items JSON NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    delivery_address TEXT NOT NULL,
    status ENUM('Pending', 'Preparing', 'Out for Delivery', 'Delivered') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);


INSERT INTO restaurants (name, location, cuisine_type) VALUES
('Indian Accent', 'New Delhi', 'Modern Indian'),
('Bukhara', 'New Delhi', 'North Indian'),
('The Bombay Canteen', 'Mumbai', 'Indian Fusion'),
('Wasabi by Morimoto', 'Mumbai', 'Japanese'),
('Karavalli', 'Bangalore', 'South Indian'),
('Peshawri', 'Mumbai', 'North West Frontier'),
('Dum Pukht', 'New Delhi', 'Awadhi'),
('Villa Maya', 'Thiruvananthapuram', 'Kerala, Mediterranean'),
('The Table', 'Mumbai', 'Global Contemporary'),
('Masque', 'Mumbai', 'Modern Indian');


alter table restaurants add column imageUrl VARCHAR(255);
alter table restaurants add column rating DECIMAL(3,1);
