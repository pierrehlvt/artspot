import { LocationModel } from "./location.model";
import { RateModel } from "./rate.model";

export class OeuvreModel {
  public id: number;

  constructor(
    public name: string,
    public picture: string,
    public location: LocationModel,
    public rate: number,
    public createdAt: Date
  ) {
  }
}
