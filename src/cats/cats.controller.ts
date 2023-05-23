import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp() {
    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
