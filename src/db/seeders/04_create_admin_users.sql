INSERT INTO users (username, password, role_id)
VALUES 
    ('admin', '$2b$10$KXEzU9G5yEo9JY06f/VY9uKT.eNl/yf5Y3LKumUDjFA72If5h84Pa', (SELECT id FROM roles WHERE name = 'admin'))
ON DUPLICATE KEY UPDATE username = username;
