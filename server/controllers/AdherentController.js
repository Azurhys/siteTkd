class AdherentController {
    constructor(createAdherentUseCase) {
      this.createAdherentUseCase = createAdherentUseCase;
    }
  
    async createAdherent(req, res) {
      try {
        const adherent = await this.createAdherentUseCase.execute(req.body);
        res.status(201).json(adherent);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getAllAdherents(req, res) {
      try {
        const adherents = await this.createAdherentUseCase.adherentRepository.findAll();
        res.status(200).json(adherents);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    // Ajoutez d'autres méthodes pour les opérations CRUD
  }
  
  module.exports = AdherentController;
  