import { S3Service } from "@libs/s3";
import { Person, PersonFactory } from "@models/person.model";
import { v4 } from "uuid";

export class PersonService {

  public async create(person: Person) {
    await PersonFactory().create(person);
  }

  public async getAll() {

    const people = await PersonFactory().findAll();
    for(let person of people){
      if (person.photo){
        person.photo = await new S3Service().getUrl(`imagens/${person.photo}`);
      } else {
        person.photo = "assets/image/user.png"
      }
    }
    return people;
  }

  public async generateLink() {
    const uuid = v4();
    return {
      uuid: uuid,
      url: await new S3Service().uploadUrl(`imagens/${uuid}`)
    };
  }
  
  public async getById(id: string) {
    return PersonFactory().findByPk(id);
  }

  public async deletePerson(id: string) {
    return PersonFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public async editPerson(id: string, person: Person) {
    const personFinded = await this.getById(id); 
    Object.keys((personFinded as any).dataValues).forEach(key => {
      if (!person[key]) {
        person[key] = personFinded[key];
      }
    });
    delete person.id;
    
    await PersonFactory().update(person, {
      where: {
        id: id
      }
    });
    return person;
  }
} 