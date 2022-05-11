import { Lobby, LobbyFactory } from "@models/lobby.model";

export class LobbyService {

  public async create(lobby: Lobby) {
    await LobbyFactory().create(lobby);
  }

  public async getAll() {
    return LobbyFactory().findAll();
  }

  public async getById(id: string) {
    return LobbyFactory().findByPk(id);
  }

  public async deleteLobby(id: string) {
    return LobbyFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public async editLobby(id: string, lobby: Lobby) {
    const lobbyFinded = await this.getById(id); 
    
    Object.keys((lobbyFinded as any).dataValues).forEach(key => {
      if (lobby[key] === null && lobby[key] === undefined) {
        lobby[key] = lobbyFinded[key];
      }
    });
    delete lobby.id;
    
    await LobbyFactory().update(lobby, {
      where: {
        id: id
      }
    });
    return lobby;
  }
} 