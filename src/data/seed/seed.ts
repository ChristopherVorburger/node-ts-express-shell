import { envs } from "../../config";
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModel,
} from "../mongo";
import { seedData } from "./data";

(async () => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  const users = await UserModel.insertMany(seedData.users);
  console.log(users);

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0AndX(users.length - 1)]._id,
    }))
  );

  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0AndX(users.length - 1)]._id,
      category: categories[randomBetween0AndX(categories.length - 1)]._id,
    }))
  );
}
