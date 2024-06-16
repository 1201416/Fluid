import { User } from "../../model/User/User";

export default interface IUserRepo {
	save(user: User): Promise<User>;
	findByEmail (email: string): Promise<User | null>;
	findById (id: string): Promise<User | null>;
}
  