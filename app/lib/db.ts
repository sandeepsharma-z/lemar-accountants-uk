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
