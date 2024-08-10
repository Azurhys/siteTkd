const Adherent = require('../entities/Adherent');

class AdherentRepository {
  constructor(db) {
    this.db = db;
    this.model = Adherent;
  }

  async add(adherent) {
    return await this.db.Adherent.create(adherent);
  }

  async findById(id) {
    return await this.db.Adherent.findByPk(id);
  }

  async findAll() {
    return await this.db.Adherent.findAll();
  }

  // Ajoutez d'autres méthodes si nécessaire
}

module.exports = AdherentRepository;
