import { Scheduling, SchedulingFactory } from "@models/scheduling.model";

export class SchedulingService {

  public async create(scheduling: Scheduling) {
    await SchedulingFactory().create(scheduling);
  }

  public async getAll() {
    return SchedulingFactory().findAll();
  }

  public async getById(id: string) {
    return SchedulingFactory().findByPk(id);
  }

  public async deleteScheduling(id: string) {
    return SchedulingFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public async editScheduling(id: string, scheduling: Scheduling) {
    const schedulingFinded = await this.getById(id); 
    Object.keys((schedulingFinded as any).dataValues).forEach(key => {
      if (!scheduling[key]) {
        scheduling[key] = schedulingFinded[key];
      }
    });
    delete scheduling.id;
    
    await SchedulingFactory().update(scheduling, {
      where: {
        id: id
      }
    });
    return scheduling;
  }
} 