const pool = require('../db/pool');
const menuitems = {
  findMenuItems: async() => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM `menu`'
      );
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },

  findMenuItemById: async (id) => {
    const selectQuery = 'SELECT * FROM `menu` WHERE id=?;';
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

  createNewMenuItem: async (menuitem) => {
    const insertQuery = 'INSERT INTO `menu` SET ?';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [menuitem]);
      connection.release();
      console.log(results);
      return results
    } catch (error) {
      throw new Error(error);
    }
  },


  updateMenuItemById: async (menuitem) => {
    const updateQuery = 'UPDATE `menu` SET `name` = ?, `price` = ?, `description` = ?, `image` = ? WHERE `id` = ?';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(updateQuery, [menuitem.name, menuitem.price, menuitem.description, menuitem.image, menuitem.id]);
      connection.release();
      console.log(results);
      return results
    } catch (error) {
      throw new Error(error);
    }
  },


  findByMenuItem: async(menuitem) => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM `menu` WHERE name=? AND price=?', [menuitem.name, menuitem.price]
      );
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteMenuItemById: async (id) => {
    const deleteQuery = 'DELETE FROM `menu` WHERE `id` = ?';
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

module.exports = menuitems;