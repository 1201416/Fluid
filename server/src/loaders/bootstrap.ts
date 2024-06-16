import usersBootstrap from "@/bootstraps/users-bootstrap";

export default async (mongoConnection) => {
  usersBootstrap(mongoConnection);
};
