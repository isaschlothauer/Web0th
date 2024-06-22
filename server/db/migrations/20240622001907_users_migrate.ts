import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id');
      table.string('login', 255).notNullable;
      table.string('password_hash', 255).notNullable;
    })
}


export async function down(knex: Knex): Promise<void> {
}

