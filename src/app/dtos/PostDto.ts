import { Status } from '@prisma/client'

export class CreatePostDto {
  title: String
  content: String
  status: Status
  authorId: string | number
}
