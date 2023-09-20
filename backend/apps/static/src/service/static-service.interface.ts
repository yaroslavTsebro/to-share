import { CreateAvatarFileDto } from '../entity/dto/create-avatar-file.dto';
import { CreateArticleFileDto } from '../entity/dto/create-file.dto';
import { File } from '../entity/file.entity';

export const STATIC_SERVICE = Symbol('StaticService');

export interface IStaticService {
  getAvatarFile(id: number): Promise<File>;
  getArticleFiles(id: string): Promise<File[]>;
  createArticleFiles(dto: CreateArticleFileDto): Promise<string[]>;
  createAvatarFile(dto: CreateAvatarFileDto): Promise<string>;
}