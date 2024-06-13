import { UserMap } from "../mappers/UserMapper";
import { UserId } from "../model/id/UserID";
import { User } from "../model/User/User";
import  IUserRepo  from "../services/IRepos/IUserRepo";
import {IUserPersistence} from "../dataschema/IUserPersistence";
import { Document, Model } from 'mongoose';
import { Service, Inject } from "typedi";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject("UserSchema")private userSchema : Model<IUserPersistence & Document>
  ) { }
  

  public async exists (user: User): Promise<boolean> {
    const userId = user.userId;

    const idX = userId instanceof UserId ? (<UserId>userId).toValue() : userId;

    const query = { domainId: idX}; 
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (user: User): Promise<User> {
    
    const query = { domainId: user.id.toString() };
    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);
        const userCreated = await this.userSchema.create(rawUser);
        const userMapped = UserMap.toDomain(userCreated)
        return userMapped;
      } else {
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: string): Promise<User | null> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );
    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User | null> {

    const idX = userId instanceof UserId ? (<UserId>userId).toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }
}