import { VisitType, VisitTypeFactory } from "@models/visit-type.model";

export class VisitTypeService {

  public async create(visitType: VisitType) {
    await VisitTypeFactory().create(visitType);
  }

  public async getAll() {
    return VisitTypeFactory().findAll();
  }

  public async getById(id: string) {
    return VisitTypeFactory().findByPk(id);
  }

  public async deleteVisitType(id: string) {
    return VisitTypeFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public async editVisitType(id: string, visitType: VisitType) {
    const visitTypeFinded = await this.getById(id); 
    Object.keys((visitTypeFinded as any).dataValues).forEach(key => {
      if (!visitType[key]) {
        visitType[key] = visitTypeFinded[key];
      }
    });
    delete visitType.id;
    
    await VisitTypeFactory().update(visitType, {
      where: {
        id: id
      }
    });
    return visitType;
  }
} 