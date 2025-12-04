import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Post with ID ${id} was not found`);
  }
}
