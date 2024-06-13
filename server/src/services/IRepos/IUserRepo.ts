import { Repo } from "../../core/infra/Repo";
import { User } from "../../model/User/User";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: string): Promise<User | null>;
	findById (id: string): Promise<User | null>;
}
  