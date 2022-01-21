import { Request, Response } from 'express'
import { isString, isUndefined } from '../../util/isType'
import { logger } from '../../util/logger'
import { PaginationDto } from '../dtos/PaginationsDto'
import { PostService } from '../services/PostService'

export class PostController {
  async createPost(request: Request, response: Response) {
    const { method, url, user } = request
    const { title, content, status } = request.body
    const postService = new PostService()
    const post = await postService.createPost({
      title,
      content,
      status,
      authorId: user?.id,
    })
    const statusCode = 201
    logger({
      type: 'RESPONSE',
      level: 'info',
      status: statusCode,
      method,
      url,
      userId: user?.id,
      body: JSON.stringify(post),
    })
    return response.status(statusCode).json(post)
  }

  async getPosts(request: Request, response: Response) {
    const { method, url, user } = request
    const { page, perPage } = request.query
    const postService = new PostService()
    const posts = await postService.getPosts({
      page: page ? Number(page) : undefined,
      perPage: perPage ? Number(perPage) : undefined,
    })
    const statusCode = 200
    logger({
      type: 'RESPONSE',
      level: 'info',
      status: statusCode,
      method,
      url,
      userId: user?.id,
      body: JSON.stringify(posts),
    })
    return response.status(statusCode).json(posts)
  }

  async getPostById(request: Request, response: Response) {
    const { method, url, user } = request
    const { id } = request.params
    const postService = new PostService()
    const post = await postService.getPostById(Number(id))
    const statusCode = 200
    logger({
      type: 'RESPONSE',
      level: 'info',
      status: statusCode,
      method,
      url,
      userId: user?.id,
      body: JSON.stringify(post),
    })
    return response.status(statusCode).json(post)
  }
}
