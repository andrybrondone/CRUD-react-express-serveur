module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    nom_loc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    design_voiture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nb_jours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taux_journalier: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  })

  return Location
}