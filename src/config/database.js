module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'burger',
  database: 'apicoderburger',
  define: {
    timestamps: true, // rastreabilidade
    underscored: true,
    underscoreAll: true

  }
}
