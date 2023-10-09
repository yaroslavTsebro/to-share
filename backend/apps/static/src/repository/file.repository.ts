import { TypeOrmAbstractRepository } from '@app/common';
import { File, FileType } from '../entity/file.entity';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class FileRepository extends TypeOrmAbstractRepository<File> {
  protected logger: Logger = new Logger(FileRepository.name);

  constructor(
    @InjectRepository(File)
    fileRepository: Repository<File>,
    entityManager: EntityManager,
  ) {
    super(fileRepository, entityManager);
  }

  async createBatch(names: string[], articleId: string): Promise<File[]> {
    const batchFiles = names.map((name) => {
      return new File({
        articleId: articleId,
        name: name,
        type: FileType.IMAGE,
      });
    });
    return this.entityManager.save(batchFiles);
  }
}
