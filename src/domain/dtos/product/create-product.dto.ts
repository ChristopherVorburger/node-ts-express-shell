import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: string,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    console.log(props);
    const { name, available, price, description, user, category } = props;

    if (!name) return ["Missing name"];

    if (!Validators.isMongoId(user)) return ["Invalid User ID"];
    if (!user) return ["Missing user"];

    if (!category) return ["Missing category"];
    if (!Validators.isMongoId(category)) return ["Invalid Category ID"];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
