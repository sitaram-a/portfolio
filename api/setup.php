<?php
/**
 * Database Setup Script
 * Run ONCE at: https://yourdomain.epizy.com/api/setup.php
 * DELETE this file after setup!
 */

// Use same credentials as contact.php
define('DB_HOST', 'sql211.infinityfree.com');  // Your InfinityFree DB host (found in cpanel)
define('DB_USER', 'if0_41814819');             // Your DB username
define('DB_PASS', 'GSUJmyzeM5vmgL');          // Your DB password
define('DB_NAME', 'if0_41814819_db_sitaram');  

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(500) NOT NULL,
            message TEXT NOT NULL,
            ip_address VARCHAR(50),
            is_read TINYINT(1) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    echo '<h2 style="font-family:sans-serif;color:green;">✅ Database table created successfully!</h2>';
    echo '<p style="font-family:sans-serif;">Table <code>contact_messages</code> is ready.</p>';
    echo '<p style="font-family:sans-serif;color:red;"><strong>⚠️ DELETE this file (setup.php) now for security!</strong></p>';

} catch (PDOException $e) {
    echo '<h2 style="font-family:sans-serif;color:red;">❌ Error: ' . htmlspecialchars($e->getMessage()) . '</h2>';
}
?>
