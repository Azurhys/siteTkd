class CreateAdherent {
    constructor(adherentRepository) {
      this.adherentRepository = adherentRepository;
    }
  
    async execute(adherentData) {
      const adherent = new this.adherentRepository.model(adherentData);
      return await this.adherentRepository.add(adherent);
    }
}
  
module.exports = CreateAdherent;
  