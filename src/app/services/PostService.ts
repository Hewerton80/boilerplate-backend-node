import { Post } from '@prisma/client'
import { BadRequestException, NotFoundException } from '../../config/errors'
import { prisma } from '../../database/client'
import { getPaginedDocs } from '../../util/getPaginadDocs'
import { PaginationDto } from '../dtos/PaginationsDto'
import { CreatePostDto } from '../dtos/PostDto'

export class PostService {
  async createPost({ title, content, status, authorId }: CreatePostDto) {
    try {
      const post = await prisma.post.create({
        data: {
          title: title.trim(),
          content: content.trim(),
          status,
          authorId: Number(authorId),
        },
      })
      return post
    } catch (err) {
      throw new BadRequestException(JSON.stringify(err))
    }
  }

  async getPosts({ page = 1, perPage = 25 }: PaginationDto = {}) {
    const take = perPage
    const skip = (page - 1) * perPage

    const posts = await prisma.post.findMany({ skip, take })
    const postCount = await prisma.post.count()
    return getPaginedDocs<Post>({
      docs: posts,
      currentPage: page,
      perPage: perPage,
      totalDocs: postCount,
    })
  }

  async getPostById(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException('id inválido')
    }
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, email: true, name: true, role: true, createdAt: true },
        },
      },
    })
    if (!post) {
      throw new NotFoundException('post não enconrado com id passado')
    }
    return post
  }
}
