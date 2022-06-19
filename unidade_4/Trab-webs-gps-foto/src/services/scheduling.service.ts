import { Database } from "@libs/database";
import { Scheduling, SchedulingFactory } from "@models/scheduling.model";
import { LobbyService } from "./lobby.service";
import { PersonService } from "./person.service";
import { VisitTypeService } from "./visit-type.service";

export class SchedulingService {

  public async create(scheduling: Scheduling) {
    await SchedulingFactory().create(scheduling);
  }

  public async getAll() {
    let schedulings = await SchedulingFactory().findAll();
    if (schedulings?.length) {
      schedulings = schedulings.map((schedulings: any) => schedulings.dataValues);
      for (let scheduling of schedulings) {
        if (scheduling.visitType) {
          scheduling.visitTypeObj = (await new VisitTypeService().getById(scheduling.visitType) as any).dataValues;
        }
        if (scheduling.lobby) {
          scheduling.lobbyObj = (await new LobbyService().getById(scheduling.lobby) as any).dataValues;
        }
        if (scheduling.visited) {
          scheduling.visitedObj = (await new PersonService().getById(scheduling.visited) as any).dataValues;
        }
        if (scheduling.visit) {
          scheduling.visitObj = (await new PersonService().getById(scheduling.visit) as any).dataValues;
        }
      }
    }
    return schedulings;

  }

  public async getById(id: string) {
    const schedulings = await SchedulingFactory().findByPk(id)
    if (schedulings.visitType) {
      (schedulings as any).dataValues.visitType = (await new VisitTypeService().getById(schedulings.visitType) as any).dataValues;
    }
    if (schedulings.lobby) {
      (schedulings as any).dataValues.lobby = (await new LobbyService().getById(schedulings.lobby) as any).dataValues;
    }
    if (schedulings.visited) {
      (schedulings as any).dataValues.visited = (await new PersonService().getById(schedulings.visited) as any).dataValues;
    }
    if (schedulings.visit) {
      (schedulings as any).dataValues.visit = (await new PersonService().getById(schedulings.visit) as any).dataValues;
    }
    return schedulings;
  }

  public async deleteScheduling(id: string) {
    return SchedulingFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public getSchedulingTotal() {
    return Database.get().query(`select count(s.id) as total from schedulings s`);
  }

  public getSchedulingTotalDay() {
    return Database.get().query(`select count(s.id) as total from schedulings s 
    where s."startDate" >= cast(now() as date)
    and s."startDate" <= cast((now() + interval '1' day) as date)`);
  }

  public getSchedulingTotalWeek() {
    return Database.get().query(`select count(s.id) as total from schedulings s
    where s."startDate" <= cast(now() as date)
    and s."startDate" > cast((now() - interval '7' day) as date)`);
  }

  public getSchedulingTotalLastMonth() {
    return Database.get().query(`select count(s.id) as total from schedulings s
    where s."startDate" <= cast(now() as date)
    and s."startDate" > cast((now() - interval '30' day) as date)`);
  }

  public async getSchedulingTotalToday() {
    let schedulings = await Database.get().query(`select * from schedulings s 
    where s."startDate" >= cast(now() as date)
    and s."startDate" <= cast((now() + interval '1' day) as date)`) as any[];
    if (schedulings?.length) {
      schedulings = schedulings[0] as any[];
      for (let scheduling of schedulings) {
        if (scheduling.visit) {
          scheduling.visitObj = (await new PersonService().getById(scheduling.visit) as any).dataValues;
        }
      }
    }
    return schedulings;
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