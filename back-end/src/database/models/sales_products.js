'use strict';

module.exports = (sequelize, DataTypes) => {
  const sales_products = sequelize.define('sales_products', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  sales_products.removeAttribute('id');

  sales_products.associate = function(models) {
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      through: 'sales_products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });

    models.Products.belongsToMany(models.Sales, {
      as: 'products',
      through: 'sales_products',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return sales_products;
};