const pool = require('../db/pool');
const items = {
  findItems: async() => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM `items`'
      );
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },

  findItemById: async (id) => {
    const selectQuery = 'SELECT * FROM `items` WHERE id=?;';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        selectQuery, [id]
      );
      connection.release();
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }, 

  createNewItem: async (item) => {
    const insertQuery = 'INSERT INTO `items` SET ?';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [item]);
      connection.release();
      console.log(results);
      return results
    } catch (error) {
      throw new Error(error);
    }
  },


  updateItemById: async (item) => {
    const updateQuery = 'UPDATE `items` SET `title` = ?, `price` = ?, `description` = ?, `image` = ?, `owner` = ? WHERE `id` = ?';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(updateQuery, [item.title, item.price, item.description, item.image, item.owner, item.id]);
      connection.release();
      console.log(results);
      return results
    } catch (error) {
      throw new Error(error);
    }
  },


  findByItem: async(item) => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM `items` WHERE title=? AND owner=?', [item.title, item.owner]
      );
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteItemById: async (id) => {
    const deleteQuery = 'DELETE FROM `items` WHERE `id` = ?';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        deleteQuery, [id]
      );
      connection.release();
      console.log(results);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = items;