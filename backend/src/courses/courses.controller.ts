import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from "@nestjs/common";
import { UpdateFavoritesDto } from "./dto/update-favorites.dto";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  getCategories() {
    return this.coursesService.getCategories();
  }

  @Get("favorites/:userId")
  getFavorites(@Param("userId") userId: string) {
    return this.coursesService.getFavorites(userId);
  }

  @Put("favorites/:userId")
  updateFavorites(
    @Param("userId") userId: string,
    @Body() body: UpdateFavoritesDto,
  ) {
    return this.coursesService.updateFavorites(userId, body.courseIds);
  }

  @Get(":id")
  getCourse(@Param("id", ParseIntPipe) id: number) {
    return this.coursesService.getCourse(id);
  }
}
