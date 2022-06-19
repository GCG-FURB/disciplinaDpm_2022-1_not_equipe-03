import { LobbyHandler } from '@handlers/lobby/lobby.handler';
import { PersonHandler } from '@handlers/people/person.handler';
import { SchedulingHandler } from '@handlers/scheduling/scheduling.handler';
import { UserHandler } from '@handlers/users/user.handler';
import { VisitTypeHandler } from '@handlers/visit-type/visit-type.handler';

export class Handlers {

    public static autoload() {
        new UserHandler();
        new PersonHandler();
        new VisitTypeHandler();
        new LobbyHandler();
        new SchedulingHandler();
    }

}
