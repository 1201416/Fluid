import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { UserPassword } from '@/model/User/Password';
import { v4 as uuidv4 } from 'uuid';

export default async (mongoConnection) => {
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash("123", { salt });
  const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();

  try {
    await mongoConnection.collection("users").insertOne({
      "domainId": uuidv4(),
      "name": "Joao Feijao",
      "email": "feijao@gmail.com",
      "password": password.props.value,
      "__v": 0});
      
    await mongoConnection.collection("users").insertOne({
      "domainId": uuidv4(),
      "name": "Pedro Alves",
      "email": "pedro@gmail.com",
      "password": password.props.value,
      "__v": 0});

    console.log("[+] Success bootstrap Users")
  } catch (error) {
    console.error("[-] Duplicate entry on Users");
  }
};
