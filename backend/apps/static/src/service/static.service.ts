import { Inject, Injectable } from '@nestjs/common';
import { IStaticService } from './static-service.interface';
import { CreateArticleFileDto } from '../entity/dto/create-file.dto';
import { FileRepository } from '../repository/file.repository';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { File } from '../entity/file.entity';
import * as fs from 'fs/promises';
import { CreateAvatarFileDto } from '../entity/dto/create-avatar-file.dto';

@Injectable()
export class StaticService implements IStaticService {
  constructor(
    @Inject(FileRepository) private readonly fileRepository: FileRepository,
  ) {}

  async createArticleFiles(dto: CreateArticleFileDto): Promise<string[]> {
    const fileNames: string[] = [];

    for (const file of dto.files) {
      const filename = uuid();
      fileNames.push(filename);

      const uploadDir = path.join(__dirname, '..', 'static');
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, file.buffer);
    }

    await this.fileRepository.createBatch(fileNames, dto.articleId);
    return fileNames;
  }

  async createAvatarFile(dto: CreateAvatarFileDto): Promise<string> {
    const filename = uuid();

    const uploadDir = path.join(__dirname, '..', 'static');
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, dto.file.buffer);

    await this.fileRepository.create(
      new File({ articleId: dto.articleId, name: filename }),
    );
    return filename;
  }

  async getAvatarFile(id: number): Promise<File> {
    return this.fileRepository.findOne({ userId: id });
  }
  async getArticleFiles(id: string): Promise<File[]> {
    return this.fileRepository.find({ articleId: id });
  }
}
