import { Post } from "../../entities/Post";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
import { CreatePostDto } from "./CreatePostDto";
import * as sanitizeHtml from "sanitize-html";

export class CreatePost {
  constructor(private postsRepository: IPostsRepository) {}

  public async execute({ committeId, htmlContent, journalistId, imgRef, title, subtitle }: CreatePostDto) {
    const sanitizedHtmlContent = this.sanitizeHtmlContent(htmlContent);

    const newPost = new Post(
      sanitizedHtmlContent,
      journalistId,
      committeId,
      imgRef,
      title,
      subtitle
    );

    const createdPost = await this.postsRepository.createPost(newPost);
    
    return createdPost;
  }

  private sanitizeHtmlContent(htmlContent: string) {
    const sanitizedHtmlContent = sanitizeHtml.default(htmlContent, {
      allowedTags: [
        "img",
        "p",
        "b",
        "i",
        "br",
        "h1",
        "h2",
        "h3",
        "h4",
        "div",
        "section",
        "article",
        "ul",
        "ol",
        "li",
        "table",
        "tr",
        "td",
        "thead",
        "tbody",
        "strong",
        "blockquote",
        "sub"
      ],
    });

    return sanitizedHtmlContent;
  }
}
