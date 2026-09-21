const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

if (!fs.existsSync("./database")) {
  fs.mkdirSync("./database");
}

const db = new sqlite3.Database("./database/nzstore.db");


db.serialize(() => {

  // ID Member NZ001 - NZ100
  db.run(`
    CREATE TABLE IF NOT EXISTS member_ids (
      id TEXT PRIMARY KEY,
      status TEXT DEFAULT 'Available'
    )
  `);


  // Data reseller
  db.run(`
    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY,
      store TEXT,
      phone TEXT,
      tanggal_daftar TEXT,
      status TEXT DEFAULT 'Pending',
      total_penjualan INTEGER DEFAULT 0
    )
  `);


  // Customer
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      nama TEXT,
      phone TEXT,
      tanggal_daftar TEXT
    )
  `);


  // Produk
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      nama TEXT,
      kategori TEXT,
      harga_reseller INTEGER,
      harga_customer INTEGER,
      status TEXT
    )
  `);


  // Stock
  db.run(`
    CREATE TABLE IF NOT EXISTS stock (
      id TEXT PRIMARY KEY,
      produk TEXT,
      jumlah INTEGER
    )
  `);


  // Order
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      member TEXT,
      produk TEXT,
      status TEXT,
      pembayaran TEXT,
      tanggal TEXT
    )
  `);


  // Penjualan
  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      member TEXT,
      produk TEXT,
      nominal INTEGER,
      tanggal TEXT
    )
  `);


  // Expired
  db.run(`
    CREATE TABLE IF NOT EXISTS expired (
      id TEXT PRIMARY KEY,
      member TEXT,
      produk TEXT,
      expired_date TEXT,
      status TEXT
    )
  `);


  // Log aktivitas
  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tanggal TEXT,
      user TEXT,
      aktivitas TEXT
    )
  `);


  // Backup
  db.run(`
    CREATE TABLE IF NOT EXISTS backup (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tanggal TEXT,
      file TEXT
    )
  `);


});


module.exports = db;
