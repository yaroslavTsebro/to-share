import { Inject, Injectable } from '@nestjs/common';
import { IStaticService } from './static-service.interface';
import { CreateArticleFileDto } from '../entity/dto/create-file.dto';
import { FileRepository } from '../repository/file.repository';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { File, FileType } from '../entity/file.entity';
import * as fs from 'fs/promises';
import { CreateAvatarFileDto } from '../entity/dto/create-avatar-file.dto';
import { In } from 'typeorm';

@Injectable()
export class StaticService implements IStaticService {
  constructor(
    @Inject(FileRepository) private readonly fileRepository: FileRepository,
  ) {}

  async createArticleFiles(dto: CreateArticleFileDto): Promise<File[]> {
    const fileNames: string[] = [];

    for (const file of dto.files) {
      const filename = uuid();
      fileNames.push(filename);

      const uploadDir = path.join(__dirname, '..', 'static');
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, file.buffer);
    }

    return await this.fileRepository.createBatch(fileNames, dto.articleId);
  }

  async createAvatarFile(dto: CreateAvatarFileDto): Promise<File> {
    const filename = uuid();

    const uploadDir = path.join(__dirname, '..', 'static');
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, dto.file.buffer);

    return await this.fileRepository.create(
      new File({
        articleId: dto.articleId,
        name: filename,
        type: FileType.IMAGE,
      }),
    );
  }

  async getAvatarFile(id: number): Promise<File> {
    return await this.fileRepository.findOne({ userId: id });
  }
  async getArticleFiles(id: string): Promise<File[]> {
    return await this.fileRepository.find({ articleId: id });
  }

  groupFiles(files: File[], ids: string[]): File[][] {
    const orderedFiles: File[][] = [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      orderedFiles[i] = files.filter((file) => file.articleId === id);
    }
    return orderedFiles;
  }

  async getArticlesFiles(ids: string[]): Promise<File[][]> {
    const files = await this.fileRepository.find({ articleId: In(ids) });
    return this.groupFiles(files, ids);
  }
}
