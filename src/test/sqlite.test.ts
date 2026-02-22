import { describe, it, expect } from 'vitest';
import initSqlJs from 'sql.js';

describe('sql.js basic', () => {
  it('executes SELECT 42', async () => {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    const results = db.exec('SELECT 42 as answer');
    console.log('results:', JSON.stringify(results));
    expect(results.length).toBe(1);
    expect(results[0].columns).toEqual(['answer']);
    expect(results[0].values).toEqual([[42]]);
    db.close();
  });

  it('creates table, inserts, selects', async () => {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    db.exec('CREATE TABLE t(id INT, name TEXT)');
    db.exec("INSERT INTO t VALUES(1, 'hello')");
    const results = db.exec('SELECT * FROM t');
    console.log('results:', JSON.stringify(results));
    expect(results.length).toBe(1);
    expect(results[0].columns).toEqual(['id', 'name']);
    expect(results[0].values).toEqual([[1, 'hello']]);
    db.close();
  });
});
