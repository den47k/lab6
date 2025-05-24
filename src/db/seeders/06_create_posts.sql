INSERT INTO posts (title, content, user_id)
VALUES 
    ('First Post', 'This is the first post content.', 2),
    ('Admin Announcement', 'This is an announcement from the admin.', 1),
    ('Empty Content', '', 2),
    ('Special Characters', '¡¿@#$%^&*()_+=-[]{}|;:"<>,.?/~`', 3)
ON DUPLICATE KEY UPDATE content = VALUES(content), user_id = VALUES(user_id);
