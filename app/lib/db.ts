import bcrypt from "bcryptjs";
import mysql, { Pool } from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var lemarDbPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var lemarSchemaReady: Promise<void> | undefined;
}

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function getPool() {
  if (!global.lemarDbPool) {
    global.lemarDbPool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: required("DB_USER"),
      password: required("DB_PASSWORD"),
      database: required("DB_NAME"),
      waitForConnections: true,
      connectionLimit: 8,
      queueLimit: 0,
      charset: "utf8mb4",
      timezone: "Z",
    });
  }
  return global.lemarDbPool;
}

async function createSchema() {
  const pool = getPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      email VARCHAR(190) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(120) NOT NULL DEFAULT 'Lemar Administrator',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_admin_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      enquiry_type ENUM('callback','contact') NOT NULL DEFAULT 'contact',
      full_name VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(190) NOT NULL,
      service VARCHAR(190) NOT NULL DEFAULT 'General enquiry',
      source_page VARCHAR(190) NOT NULL DEFAULT 'Website',
      message TEXT NULL,
      status ENUM('new','in_progress','completed') NOT NULL DEFAULT 'new',
      admin_email_status VARCHAR(32) NOT NULL DEFAULT 'not_configured',
      customer_email_status VARCHAR(32) NOT NULL DEFAULT 'not_configured',
      email_error TEXT NULL,
      ip_address VARCHAR(64) NULL,
      user_agent VARCHAR(500) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_enquiries_status (status),
      KEY idx_enquiries_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [sourceColumns] = await pool.query<mysql.RowDataPacket[]>("SHOW COLUMNS FROM enquiries LIKE 'source_page'");
  if (!sourceColumns.length) {
    await pool.execute("ALTER TABLE enquiries ADD COLUMN source_page VARCHAR(190) NOT NULL DEFAULT 'Website' AFTER service");
  }
  const [adminEmailColumns] = await pool.query<mysql.RowDataPacket[]>("SHOW COLUMNS FROM enquiries LIKE 'admin_email_status'");
  if (!adminEmailColumns.length) {
    await pool.execute("ALTER TABLE enquiries ADD COLUMN admin_email_status VARCHAR(32) NOT NULL DEFAULT 'not_configured' AFTER status");
  }
  const [customerEmailColumns] = await pool.query<mysql.RowDataPacket[]>("SHOW COLUMNS FROM enquiries LIKE 'customer_email_status'");
  if (!customerEmailColumns.length) {
    await pool.execute("ALTER TABLE enquiries ADD COLUMN customer_email_status VARCHAR(32) NOT NULL DEFAULT 'not_configured' AFTER admin_email_status");
  }
  const [emailErrorColumns] = await pool.query<mysql.RowDataPacket[]>("SHOW COLUMNS FROM enquiries LIKE 'email_error'");
  if (!emailErrorColumns.length) {
    await pool.execute("ALTER TABLE enquiries ADD COLUMN email_error TEXT NULL AFTER customer_email_status");
  }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS email_settings (
      id TINYINT UNSIGNED NOT NULL DEFAULT 1,
      enabled TINYINT(1) NOT NULL DEFAULT 0,
      smtp_host VARCHAR(190) NOT NULL DEFAULT 'smtp.hostinger.com',
      smtp_port INT UNSIGNED NOT NULL DEFAULT 465,
      smtp_secure TINYINT(1) NOT NULL DEFAULT 1,
      smtp_user VARCHAR(190) NOT NULL DEFAULT 'ML@lemaraccountants.co.uk',
      smtp_password_encrypted TEXT NULL,
      notification_email VARCHAR(190) NOT NULL DEFAULT 'ML@lemaraccountants.co.uk',
      reply_to_email VARCHAR(190) NOT NULL DEFAULT 'ML@lemaraccountants.co.uk',
      sender_name VARCHAR(120) NOT NULL DEFAULT 'Lemar Accountants',
      customer_subject VARCHAR(190) NOT NULL DEFAULT 'We have received your Lemar enquiry',
      customer_message TEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(
    "INSERT IGNORE INTO email_settings (id, customer_message) VALUES (1, ?)",
    ["Thank you for contacting Lemar Accountants. We have received your enquiry and a member of our team will get back to you shortly."],
  );

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  if (email && password) {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>("SELECT id FROM admin_users WHERE email = ? LIMIT 1", [email]);
    if (!rows.length) {
      const passwordHash = await bcrypt.hash(password, 12);
      await pool.execute("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)", [email, passwordHash]);
    }
  }
}

export function ensureSchema() {
  if (!global.lemarSchemaReady) {
    global.lemarSchemaReady = createSchema().catch(error => {
      global.lemarSchemaReady = undefined;
      throw error;
    });
  }
  return global.lemarSchemaReady;
}
