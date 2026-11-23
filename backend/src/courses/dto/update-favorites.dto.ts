import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsString,
  Min,
} from "class-validator";

export class UpdateFavoritesDto {
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  courseIds: number[];
}
