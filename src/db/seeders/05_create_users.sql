INSERT INTO users (username, password, role_id)
VALUES 
    ('user1', '$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghij', (SELECT id FROM roles WHERE name = 'user')),
    ('user2', '$2b$10$mnopqrstuvmnopqrstuvmnopqrstuvmnopqrstuvmnopqrstuv', (SELECT id FROM roles WHERE name = 'user')),
    ('den47k', '$2b$10$94vaHhbhX7nmTQ3k3Vb9TuoflCbweRXRTs74Y7.RUscEnpmZzSPfi', (SELECT id FROM roles WHERE name = 'admin'))
ON DUPLICATE KEY UPDATE 
    password = VALUES(password),
    role_id = VALUES(role_id);